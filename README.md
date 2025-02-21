# ChaCha20-Poly1305 Cryptographic Implementation

🔐 **Secure Encryption & Authentication using ChaCha20-Poly1305 and ECDH Key Exchange**

## 📌 Project Overview
This project implements **ChaCha20-Poly1305**, a modern **Authenticated Encryption with Associated Data (AEAD)** scheme, combined with **Elliptic Curve Diffie-Hellman (ECDH) key exchange** for secure communications.

- **Confidentiality**: Achieved through **ChaCha20**, a high-speed stream cipher.
- **Integrity & Authenticity**: Ensured by **Poly1305**, a secure cryptographic MAC.
- **Secure Key Exchange**: Implemented using **ECDH on the secp256k1 curve**.
- **Optimized for software**: Unlike AES-GCM, it runs efficiently on systems without hardware acceleration.

## 🚀 Features
✅ Implementation of **ChaCha20-Poly1305 AEAD** encryption.  
✅ Secure **ECDH key exchange** between two parties.  
✅ Protection against **side-channel attacks**.  
✅ Efficient **stream-based encryption** handling.  
✅ Comparison with **traditional cryptographic methods** (e.g., AES-GCM).  

## 🛠 Installation & Setup
Ensure you have **Node.js** installed, then clone the repository and install dependencies:

```bash
git clone https://github.com/yenkeljaoui/-Cryptographic-ChaCha20-Poly1305-.git
cd Cryptographic-ChaCha20-Poly1305
npm install
```

## ⚡ Usage
### Key Exchange Example (ECDH)
```javascript
const { generateKeyPair, deriveSharedSecret } = require('./test-security');

// Generate key pairs for Alice and Bob
const aliceKeys = generateKeyPair();
const bobKeys = generateKeyPair();

// Compute shared secret
const sharedSecretAlice = deriveSharedSecret(aliceKeys.privateKey, bobKeys.publicKey);
const sharedSecretBob = deriveSharedSecret(bobKeys.privateKey, aliceKeys.publicKey);

console.log("Shared Secret (Alice):", sharedSecretAlice.toString('hex'));
console.log("Shared Secret (Bob):", sharedSecretBob.toString('hex'));
```

### Encrypt & Decrypt with ChaCha20-Poly1305
```javascript
const { encrypt, decrypt } = require('./aead');
const crypto = require('crypto');

const key = crypto.randomBytes(32); // Generate a random 256-bit key
const nonce = crypto.randomBytes(12); // 96-bit nonce

const plaintext = "Secure Communication with ChaCha20!";
const { ciphertext, authTag } = encrypt(plaintext, key, nonce);
const decryptedText = decrypt(ciphertext, key, nonce, authTag);

console.log("Decrypted Text:", decryptedText);
```

## 🔬 Testing
Run the included test script to verify encryption, decryption, and key exchange functionality:

```bash
node test-security.js
```

## 📚 Project Structure
```
📂 Cryptographic-ChaCha20-Poly1305
 ├── 📜 README.md          # Project documentation
 ├── 📂 src                # Source code files
 │   ├── chacha20.js       # ChaCha20 stream cipher implementation
 │   ├── poly1305.js       # Poly1305 authentication
 │   ├── aead.js           # AEAD encryption wrapper
 │   ├── test-security.js  # Key exchange and encryption tests
 ├── package.json         # Dependencies and project metadata
 ├── .gitignore           # Git ignore rules
```



