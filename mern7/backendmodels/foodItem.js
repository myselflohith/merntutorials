const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name:String,
    description: String,
    price: Number,
    photo: String,
})

const FoodItem = mongoose.model('FoodItem', foodItemSchema)

module.exports= FoodItem;