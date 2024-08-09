const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const User = new Schema(
    {
        username: {
            type: String,
            unique: true,
            minlength: 6,
            maxlength: 12,
            required: true,
        },
        name: { type: String },
        email: { type: String, required: true, unique: true, minlength: 10 },
        avatar: { type: String },
        password: { type: String, minlength: 8 },
        admin: { type: Boolean, default: false },
        provider: {
            type: String,
            default: 'local',
            enum: ['local', 'google', 'facebook'],
        },
        provider_Id: { type: String },
    },
    { timestamps: true },
);

// Tạo chỉ mục cho các trường 'username' và 'email'
User.index({ username: 1, email: 1 });

mongoose.plugin(mongooseDelete, { delete: true, deleteAt: true });

module.exports = mongoose.model('User', User);
