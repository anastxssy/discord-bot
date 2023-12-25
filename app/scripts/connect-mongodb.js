const mongoose = require('mongoose');

const config = require('../../config');

module.exports = async () => {
    await mongoose.connect(config.mongodb.url, { dbName: config.mongodb.dbName });
    await console.log('[Mongo Database] Connected.');
    return;
};
