const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String},
    url: {type: String},
    category: {type: String},
    price: Number,
}, {
    timestamps: true
})

module.exports = model("Items", schema)