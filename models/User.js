const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    totalKeys: {
        type: Number,
        required: true,
        default: 0
    },
    currentKeys: {
        type: Number,
        required: true,
        default: 0
    },
    permission: {
        type: Number,
        required: true,
        default: 1
    }

})

module.exports = User = mongoose.model('user', UserSchema);