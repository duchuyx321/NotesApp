const { createClient } = require('redis');
const Notes = require('./notes');
const User = require('./user');
const { encrypt, decrypt } = require('../../service/EncodingService');
require('dotenv').config();

const Redis = async () => {
    try {
        const client = createClient({ url: process.env.URL_SERVER });
        client.on('error', (err) => {
            return console.log(err);
        });
        await client.connect();
        console.log('Connect redis successfully');
        await initializeData(client);
        return client;
    } catch (err) {
        console.log(err);
    }
};

const initializeData = async (client) => {
    try {
        const notes = await Notes.find().lean(); // đưa về kiểu dữ liệu thuần túy
        const users = await User.find().lean();

        // encoding database
        const NotesEncrypt = encrypt(JSON.stringify(notes));
        const UserEncrypt = encrypt(JSON.stringify(users));

        // save to database
        await client.set('Notes', NotesEncrypt);
        await client.set('User', UserEncrypt);
    } catch (err) {
        console.log(err);
    }
};
module.exports = Redis;
