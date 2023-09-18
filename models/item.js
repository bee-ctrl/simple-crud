const mongoose = require("mongoose")

const schemaItem = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
})

const modelItem = mongoose.model("Item", schemaItem, "bee_item")

module.exports = modelItem