const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var randToken = require('rand-token');

let userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    referralCode: {
        type: String,
        required: true
    },
    referenceCode: {
        type: String,
        default: randToken.generate(8)
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatarURL: {
        type: String
    },
    avatarDefault: {
        type: String,
        default:"https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
    },
    isVerifiedEmail: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        select: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'user'
})

module.exports = mongoose.model('UserSchema', userSchema)
