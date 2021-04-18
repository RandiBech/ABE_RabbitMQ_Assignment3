var amqp = require('amqplib/callback_api');

module.exports = { sendConfirmation };

//test strings
// const msg = 'Rabbit Hotel room 1 : Successfully booked';
// const msg = 'Rabbit Hotel room 1 : The room is not available';

async function sendConfirmation(msg) {
	amqp.connect('amqp://localhost', function (error0, connection) {
		if (error0) {
			throw error0;
		}

		connection.createChannel(function (error1, channel) {
			if (error1) throw error1;

			var queue = 'confirmation';

			var message = msg;
			if (msg.includes('Successfully')) {
				message += ': Reservation confirmed';
			} else {
				message += ': Reservation denied';
			}

			channel.assertQueue(queue, {
				durable: false,
			});

			channel.sendToQueue(queue, Buffer.from(message));
			console.log('Sent %s', message);
		});
		setTimeout(function () {
			connection.close();
			process.exit(0);
		}, 500);
	});
}

// sendConfirmation(msg); // test sendConfirmation()
