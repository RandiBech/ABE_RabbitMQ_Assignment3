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
			return room.roomNo === roomNumber;
		});
		var message = hotel.name + ' ' + room.roomNo;
		if (room.reservation) {
			console.log('The room is not available');
			message += ': The room is not available';
			sendConfirmation(message);
		} else {
			console.log('The room is free to reserve');
			console.log('RoomID: ' + room._id)
			console.log('RoomNumber: ' + room.roomNo)
			try {
				room.reservation = true;
				hotel.save();
				message += ': Successfully booked';
				sendConfirmation(message);
				console.log('Succesfully booked room ' + room.roomNo);
			} catch {
				console.log('unknown server error');
				message += ': server error';
				sendConfirmation(message);
			}
		}
	} catch (error) {
		console.log(error);
	}
};
