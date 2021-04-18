require('./db');
var hotelCollection = require('./models/hotel');
const { sendConfirmation } = require('./sendConfirmation');

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
		console.log('hotel', hotel);
		let room = hotel.rooms.find(function (room) {
			if (room.roomNo === roomNumber) return true;
		});
		var message = hotel.name + ' ' + room.roomNo;
		if (room.reservation) {
			console.log('The room is not available');
			var message = '';
			confirmationQueue.sendConfirmation(message);
			//TODO: ved ikke om vi skal sende statuskoder?
			// res.status(201).json({
			//     "title": "Room not available"
			// })
			message += ': The room is not available';
			sendConfirmation(message);
		} else {
			console.log('The room is free to reservate');
			
			//TODO: Kan ikke få fat på id'et!!!
			const updatedRoom = await hotelCollection.findByIdAndUpdate(
				room._id,
				{
					reservation: true,
				},
				{
					new: true,
				}
			);
			if (updatedRoom) {
				//TODO: send confirmation til ConfirmReservation
				message += ': Successfully booked';
				sendConfirmation(message);
				return console.log('Succesfully booked');
				
			} else {
				//TODO: send confirmation til ConfirmReservation
				message += ': server error';
				sendConfirmation(message);

				console.log('unknown server error');
			}
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
