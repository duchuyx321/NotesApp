const mongoose = require('mongoose');
require('dotenv').config();

const connect = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL);

        console.log('connect  database successfully');
    } catch (err) {
        console.log(err + ' : chưa thể vào database');
    }
};

module.exports = connect;
