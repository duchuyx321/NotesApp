const { createClient } = require('redis');
const Notes = require('./notes');
const User = require('./user');
const { encrypt, decrypt } = require('../../service/EncodingService');
require('dotenv').config();

const client = createClient({ url: process.env.URL_SERVER });

const Redis = async () => {
    try {
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

        // // remove field password
        const users = await User.find({
            $and: [{ admin: false }, { deleted: false }],
        })
            .select('_id username email provider createdAt')
            .lean();

        // encoding database
        const NotesEncrypt = encrypt(JSON.stringify(notes));
        const UserEncrypt = encrypt(JSON.stringify(users));

        // save to redis database
        await client.set('Notes', NotesEncrypt);
        await client.set('User', UserEncrypt);
    } catch (err) {
        console.log(err);
    }
};

const setData = async (key, value) => {
    try {
        const valueEncrypt = encrypt(JSON.stringify(value));

        // save to redis database
        await client.set(key, valueEncrypt);
        console.log('save to redis database successfully');
    } catch (err) {
        console.log(err);
    }
};
const getData = async (key) => {
    try {
        const valueRedis = await client.get(key);
        const result = decrypt(valueRedis);
        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports = { Redis, setData, getData };
