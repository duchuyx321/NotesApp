const crypto = require('crypto');
require('dotenv').config();

const key = Buffer.from(process.env.KEY_CRYPTO, process.env.MODULE_2);
const iv = Buffer.from(process.env.IV_CRYPTO, process.env.MODULE_2);

// Mã Hóa
const encrypt = (text) => {
    let cipher = crypto.createCipheriv(process.env.ALGORITHM_CRYPTO, key, iv);
    let encrypted = cipher.update(
        text,
        process.env.MODULE_1,
        process.env.MODULE_2,
    );
    encrypted += cipher.final(process.env.MODULE_2);
    return encrypted;
};

// Giải Mã
const decrypt = (text) => {
    let decipher = crypto.createDecipheriv(
        process.env.ALGORITHM_CRYPTO,
        key,
        iv,
    );
    let decrypted = decipher.update(
        text,
        process.env.MODULE_2,
        process.env.MODULE_1,
    );
    decrypted += decipher.final(process.env.MODULE_1);
    return decrypted;
};

module.exports = { encrypt, decrypt };
