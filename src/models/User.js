// User schema
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    zipcode: String,
    interests: Array,
    refreshToken: String
})

module.exports = mongoose.model('User', UserSchema);