const crypto = require('crypto');
const { createCipher, createDecipher } = require('./index'); // ייבוא המימוש של ChaCha20-Poly1305

// 🔹 1️⃣ יצירת מפתחות פרטיים וציבוריים לשני צדדים (Alice ו-Bob)
const alice = crypto.createECDH('secp256k1');
alice.generateKeys();

const bob = crypto.createECDH('secp256k1');
bob.generateKeys();

console.log("🔑 Alice Public Key:", alice.getPublicKey().toString('hex'));
console.log("🔑 Bob Public Key:", bob.getPublicKey().toString('hex'));

// 🔹 2️⃣ יצירת מפתח הצפנה משותף (Shared Secret)
const aliceSharedKey = alice.computeSecret(bob.getPublicKey());
const bobSharedKey = bob.computeSecret(alice.getPublicKey());

// ✅ **בדיקה אם ה-Key Exchange הצליח**
if (aliceSharedKey.equals(bobSharedKey)) {
    console.log("✅ Key Exchange Successful!");
} else {
    console.error("❌ Key Exchange Failed!");
    process.exit(1); // יציאה עם קוד שגיאה אם ה-Key Exchange נכשל
}

// 🔹 3️⃣ קביעת מפתח ההצפנה (נחתוך ל-32 בתים – 256 ביט)
const key = aliceSharedKey.slice(0, 32); // חיתוך ל-32 בתים (256 ביט)
const nonce = crypto.randomBytes(12); // יצירת Nonce אקראי (96 ביט)

console.log("🔑 Final Encryption Key (Hex):", key.toString('hex'));
console.log("🔄 Generated Nonce (Hex):", nonce.toString('hex'));

// 🔹 4️⃣ הצפנה עם ChaCha20-Poly1305
const encryptor = createCipher(key, nonce);
const plaintext = Buffer.from("Hello, Key Exchange with ECDH!", "utf-8");

const encrypted = encryptor.update(plaintext);
encryptor.final();
const authTag = encryptor.getAuthTag();

console.log("📜 Plaintext:", plaintext.toString());
console.log("🔐 Encrypted (Hex):", encrypted.toString('hex'));
console.log("✅ Auth Tag (Hex):", authTag.toString('hex'));

// 🔹 5️⃣ שלב הפענוח
const decryptor = createDecipher(key, nonce);
decryptor.setAuthTag(authTag);

const decrypted = decryptor.update(encrypted);
decryptor.final();

console.log("🔓 Decrypted:", decrypted.toString());

// ✅ **בדיקה אם ההצפנה והפענוח עובדים**
if (plaintext.equals(decrypted)) {
    console.log("✅ Encryption & Decryption Successful!");
} else {
    console.error("❌ Encryption & Decryption Failed!");
    process.exit(1); // יציאה עם קוד שגיאה אם ההצפנה/פענוח נכשלו
}

