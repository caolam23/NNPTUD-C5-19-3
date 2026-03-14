const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const privateKeyPath = path.join(__dirname, '../private.pem');
const publicKeyPath = path.join(__dirname, '../public.pem');

// Kiểm tra và tạo khóa nếu chưa tồn tại
function ensureKeys() {
  if (!fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
    console.log('Khóa RSA chưa tồn tại, đang tạo...');
    
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

    fs.writeFileSync(privateKeyPath, privateKey);
    fs.writeFileSync(publicKeyPath, publicKey);
    console.log('Khóa RSA đã được tạo thành công!');
  }
}

// Đảm bảo khóa tồn tại
ensureKeys();

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

module.exports = {
  privateKey,
  publicKey
};
