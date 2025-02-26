const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }, 
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }, 
    mobile: {
        type: String,
    }, 
    age: {
        type: Number,
        min: 0
    }, 
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    }, 
    bod: {
        type: Date
    }
});

module.exports = mongoose.model('users', schema)