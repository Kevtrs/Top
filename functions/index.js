const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getMessaging } = require("firebase-admin/messaging");

initializeApp();

const db = getFirestore();

function requireUid(request) {
  if (!request.auth?.uid) throw new HttpsError("unauthenticated", "Connexion requise");
  return request.auth.uid;
}

exports.sendRecommendation = onCall({ region: "europe-west1" }, async request => {
  const fromUid = requireUid(request);
  const { toUserId, movie, groupId, recoId } = request.data || {};
  if (!toUserId || !groupId || !recoId || !movie?.id || !movie?.title) {
    throw new HttpsError("invalid-argument", "Recommandation incomplète");
  }

  const [groupSnap, senderSnap, recipientSnap] = await Promise.all([
    db.doc(`groups/${groupId}`).get(),
    db.doc(`users/${fromUid}`).get(),
    db.doc(`users/${toUserId}`).get()
  ]);
  const members = groupSnap.data()?.memberIds || [];
  if (!groupSnap.exists || !members.includes(fromUid) || !members.includes(toUserId)) {
    throw new HttpsError("permission-denied", "Les profils ne partagent pas ce cercle");
  }
  if (!senderSnap.exists || !recipientSnap.exists) throw new HttpsError("not-found", "Profil introuvable");

  const createdAt = Date.now();
  await db.doc(`users/${toUserId}/inbox/${recoId}`).set({
    to: toUserId,
    from: fromUid,
    groupId,
    movie,
    seen: false,
    createdAt
  });

  const tokenSnap = await db.collection(`users/${toUserId}/pushTokens`).get();
  const tokenDocs = tokenSnap.docs.filter(item => item.data().token);
  if (!tokenDocs.length) return { recoId, tokenCount: 0, sentCount: 0 };

  const senderName = senderSnap.data().name || "Quelqu'un";
  const response = await getMessaging().sendEachForMulticast({
    tokens: tokenDocs.map(item => item.data().token),
    notification: {
      title: movie.title,
      body: `🍿 ${senderName} te recommande ça`
    },
    data: {
      type: "reco",
      movieTitle: movie.title,
      fromName: senderName,
      url: "https://kevtrs.github.io/Top/"
    },
    webpush: {
      fcmOptions: { link: "https://kevtrs.github.io/Top/" },
      notification: { icon: "https://kevtrs.github.io/Top/letop-icon-192.png" }
    }
  });

  const staleWrites = [];
  response.responses.forEach((result, index) => {
    const code = result.error?.code || "";
    if (code.includes("registration-token-not-registered") || code.includes("invalid-registration-token")) {
      staleWrites.push(tokenDocs[index].ref.delete());
    }
  });
  await Promise.all(staleWrites);
  return { recoId, tokenCount: tokenDocs.length, sentCount: response.successCount };
});

exports.deleteAccount = onCall({ region: "europe-west1" }, async request => {
  const uid = requireUid(request);
  const userRef = db.doc(`users/${uid}`);
  const userSnap = await userRef.get();
  if (!userSnap.exists) {
    await getAuth().deleteUser(uid).catch(() => {});
    return { deleted: true };
  }

  const user = userSnap.data();
  const [groupsSnap, invitesSnap, sentRecosSnap] = await Promise.all([
    db.collection("groups").where("memberIds", "array-contains", uid).get(),
    db.collection("invites").where("createdBy", "==", uid).get(),
    db.collectionGroup("inbox").where("from", "==", uid).get()
  ]);

  const batch = db.batch();
  groupsSnap.docs.forEach(groupDoc => {
    const group = groupDoc.data();
    const remaining = (group.memberIds || []).filter(memberId => memberId !== uid);
    if (!remaining.length) batch.delete(groupDoc.ref);
    else batch.update(groupDoc.ref, {
      memberIds: FieldValue.arrayRemove(uid),
      ownerUid: group.ownerUid === uid ? remaining[0] : group.ownerUid,
      updatedAt: Date.now()
    });
  });
  invitesSnap.docs.forEach(invite => batch.delete(invite.ref));
  sentRecosSnap.docs.forEach(reco => batch.delete(reco.ref));
  await batch.commit();

  const legacyId = user.legacyProfileId;
  if (legacyId) {
    await Promise.all(["profiles", "profileIndex", "rankings", "watched", "watchlist", "recoPrefs"]
      .map(name => db.doc(`${name}/${legacyId}`).delete().catch(() => {})));
    await db.recursiveDelete(db.doc(`pushTokens/${legacyId}`)).catch(() => {});
  }

  await db.recursiveDelete(userRef);
  await getAuth().deleteUser(uid);
  return { deleted: true };
});
