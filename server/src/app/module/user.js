const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const User = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        admin: { type: Boolean, default: false },
    },
    { timestamps: true },
);

mongoose.plugin(mongooseDelete, { delete: true, deleteAt: true });

module.exports = mongoose.model('User', User);
