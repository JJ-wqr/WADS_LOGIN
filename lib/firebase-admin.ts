import admin from "firebase-admin";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;
const privateKey = firebasePrivateKey
  ?.replace(/\\n/g, "\n")
  .replace(/^"|"$/g, "")
  .replace(/^'|'$/g, "");

if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    "Missing or invalid Firebase admin credentials. " +
      "Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY correctly."
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

export const adminAuth = admin.auth();