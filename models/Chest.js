const mongoose  = require('mongoose');
const Schema = mongoose.Schema

const ChestSchema = new Schema({
    chestColor: {
        type: String,
        required: true
    },
    prizeName: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    value: {
        type: Number,
    },
    description: {
        type: String,
    },
    winner: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = Chest = mongoose.model('chest', ChestSchema)