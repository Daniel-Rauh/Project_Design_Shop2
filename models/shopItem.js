const mongoose = require('mongoose')

const Schema = mongoose.Schema
const shopItemSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    product_picture_link: {
        type: String,
        required: true
    },
    link_shop: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {collection: 'shopData'})
const ShopItem = mongoose.model('shopData', shopItemSchema)
module.exports = ShopItem