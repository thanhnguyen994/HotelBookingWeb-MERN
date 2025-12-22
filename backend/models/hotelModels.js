import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: {type: String, require: true},
    price: {type: Number, require: true},
    description: {type: String, require: true},
    image: {type: String, require: true},
    date: {type: Number, require: true},
})

const hotelModel = mongoose.models.hotel || mongoose.model('hotel', hotelSchema);

export default hotelModel