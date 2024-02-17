const dbConfig = require('../config/db.config')
const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;
db.connUrl = dbConfig.url;

// Import Models
db.Tasks = require('./tasks.model');
db.Users = require('./users.model');

module.exports = db;
