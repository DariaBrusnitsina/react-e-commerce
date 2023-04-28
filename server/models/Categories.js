const {Schema, model} = require('mongoose')

const schema = new Schema({
    id: {type: String},
    name: {type: String},
    url: {type: String}
}, {
    timestamps: true
})

module.exports = model("Categories", schema)