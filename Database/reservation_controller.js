require('./db');
var hotelCollection = require('./models/hotel');
var confirmationQueue = require('./sendConfirmation');

//metode til håndtering af request om reservation
//-- undersøg om værelse er ledigt
//-- hvis ja, send confirm til ConfirmReservation og ændre db med nu er værelse optaget
//-- hvis nej, send reservation not available til ConfirmReservation

module.exports.handleReservationRequest = async function (req, res) {
	console.log('Reservation controller is called');
	const hotelName = req.hotelName;
	const roomNumber = parseInt(req.roomNo);
	try {
		let hotel = await hotelCollection.findOne({ name: hotelName });
		let room = hotel.rooms.find(function (room) {
			return room.roomNo === roomNumber;
		});
		if (room.reservation) {
			console.log('The room is not available');
			//TODO: ved ikke om vi skal sende statuskoder?
			// res.status(201).json({
			//     "title": "Room not available"
			// })
		} else {
			console.log('The room is free to reserve');
			console.log('RoomID: ' + room._id)
			console.log('RoomNumber: ' + room.roomNo)
			try{
				room.reservation = true;
				hotel.save();	
			} catch {
				console.log('unknown server error');
			}
			//TODO: send confirmation til ConfirmReservation
			var message = '';
			confirmationQueue.sendConfirmation(message);
			return console.log('Succesfully booked room ' + room.roomNo);
		}
	} catch (error) {
		console.log(error);
		//TODO: ved ikke om vi skal sende statuskoder?

		// res.status(400).json({
		//     "title": "Unable to connect to database",
		//     "detail": error
		// })
	}
};
