module.exports = {
    multiplyMongooseToObject: (mongooseArray) =>
        mongooseArray.map((item) => item.toObject()),
    mongooseToObject: (mongooseItem) =>
        mongooseItem ? mongooseItem.toObject() : mongooseItem,
};
