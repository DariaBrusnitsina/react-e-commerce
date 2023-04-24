const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String},
    surname: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    address: {type: String},
    phone: Number,
    orders: {type: Array},
    sale: Number,
    licence: {type: Boolean}
}, {
    timestamps: true
})

module.exports = model("User", schema)