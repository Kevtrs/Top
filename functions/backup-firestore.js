// Sauvegarde complète et en lecture seule de Firestore (comptes legacy + comptes secure).
// Usage : node backup-firestore.js /chemin/vers/service-account.json
//
// N'écrit jamais dans Firestore. Ne fait que lire et dumper en JSON local.

const fs = require("fs");
const path = require("path");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const keyPath = process.argv[2];
if (!keyPath) {
  console.error("Usage: node backup-firestore.js /chemin/vers/service-account.json");
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(path.resolve(keyPath), "utf8"));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const outDir = path.join(__dirname, "..", "backups", stamp);

const LEGACY_COLLECTIONS = ["profiles", "profileIndex", "rankings", "watched", "watchlist", "recoPrefs"];
const TOP_LEVEL_COLLECTIONS = ["groups", "invites", "movieNights"];
const USER_SUBCOLLECTIONS = ["rankings", "watched", "watchlist", "inbox", "pushTokens", "private"];

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

async function dumpCollection(collectionRef) {
  const snap = await collectionRef.get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function main() {
  const summary = {};

  for (const name of LEGACY_COLLECTIONS) {
    const docs = await dumpCollection(db.collection(name));
    writeJson(path.join(outDir, "legacy", `${name}.json`), docs);
    summary[`legacy/${name}`] = docs.length;
  }

  for (const name of TOP_LEVEL_COLLECTIONS) {
    const docs = await dumpCollection(db.collection(name));
    writeJson(path.join(outDir, `${name}.json`), docs);
    summary[name] = docs.length;
  }

  const users = await dumpCollection(db.collection("users"));
  writeJson(path.join(outDir, "users.json"), users);
  summary["users"] = users.length;

  for (const user of users) {
    for (const sub of USER_SUBCOLLECTIONS) {
      const docs = await dumpCollection(db.collection("users").doc(user.id).collection(sub));
      if (docs.length) {
        writeJson(path.join(outDir, "users", user.id, `${sub}.json`), docs);
      }
      summary[`users/${user.id}/${sub}`] = docs.length;
    }
  }

  writeJson(path.join(outDir, "_summary.json"), summary);

  console.log(`Sauvegarde terminée dans : ${outDir}`);
  console.log(`Comptes secure (users) : ${users.length}`);
  console.log(`Documents legacy profiles : ${summary["legacy/profiles"]}`);
  console.log(`Groupes : ${summary["groups"]}`);
  console.log("Détail complet dans _summary.json");
}

main().catch(error => {
  console.error("Échec de la sauvegarde :", error);
  process.exit(1);
});
