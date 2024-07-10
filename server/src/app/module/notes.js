const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Notes = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        userId: { type: Object },
        hidden: { type: Boolean, default: false },
        slug: { type: String, slug: 'title', unique: true },
    },
    { timestamps: true },
);

mongoose.plugin(slug);
mongoose.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });

module.exports = mongoose.model('Notes', Notes);
