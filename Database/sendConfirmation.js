var amqp = require('amqplib/callback_api');

module.exports = { sendConfirmation };

async function sendConfirmation(msg) {
	amqp.connect('amqp://localhost', function (error0, connection) {
		if (error0) {
			throw error0;
		}

		connection.createChannel(function (error1, channel) {
			if (error1) throw error1;

			var queue = 'confirmation';

			var message = msg;

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
