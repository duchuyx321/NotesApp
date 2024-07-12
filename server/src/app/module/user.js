const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const User = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 6,
            maxlength: 12,
        },
        email: { type: String, required: true, unique: true, minlength: 10 },
        password: { type: String, required: true, minlength: 8 },
        admin: { type: Boolean, default: false },
    },
    { timestamps: true },
);

mongoose.plugin(mongooseDelete, { delete: true, deleteAt: true });

module.exports = mongoose.model('User', User);
