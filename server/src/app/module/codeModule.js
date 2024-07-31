const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthenticationCode = new Schema(
    {
        email: { type: 'string', required: true, minlength: 10 }, //
        code: { type: String, required: true, maxlength: 6 },
    },
    { timestamps: true },
);

AuthenticationCode.index({ email: 1, code: 1 });

module.exports = mongoose.model('AuthenticationCode', AuthenticationCode);
