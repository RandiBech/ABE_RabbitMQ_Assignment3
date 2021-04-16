const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: String,
    rooms: [
        {
            roomNo: Number,
            reservation: Boolean
        }
    ]
});

const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;