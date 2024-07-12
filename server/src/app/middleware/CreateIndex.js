const Notes = require('../module/notes');

const createIndex = async (req, res, next) => {
    try {
        if (req.headers['authorization']) {
            await Notes.collection.createIndex({
                title: 'text',
                content: 'text',
            });
        }
        console.log('Text index đã được tạo.');
        next();
    } catch (err) {
        console.error('Lỗi khi tạo text index:', err);
        next(err);
    }
};

module.exports = createIndex;
