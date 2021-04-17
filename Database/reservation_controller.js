const hotelCollection = require('../models/hotel');

//metode til håndtering af request om reservation
//-- undersøg om værelse er ledigt
//-- hvis ja, send confirm til ConfirmReservation og ændre db med nu er værelse optaget
//-- hvis nej, send reservation not available til ConfirmReservation

module.exports.handleReservationRequest = async function (req, res) {
    console.log('Reservation controller is called');
    // const hotelName = req.hotelName;
    // const rommNo = req.rommNo;
    // try {
    //     let hotel = await hotelCollection

    // } catch (error) {
        
    // }
}