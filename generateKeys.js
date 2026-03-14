const crypto = require('crypto');
const fs = require('fs');

// Tạo cặp khóa RSA
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

// Lưu khóa vào file
fs.writeFileSync('private.pem', privateKey);
fs.writeFileSync('public.pem', publicKey);

console.log('Keys generated successfully!');
console.log('Private key saved to: private.pem');
console.log('Public key saved to: public.pem');
