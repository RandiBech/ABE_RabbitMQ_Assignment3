var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
	if (error0) {
		throw error0;
	}
	connection.createChannel(function (error1, channel) {
		if (error1) {
			throw error1;
		}
		var queue = 'reservation';
		var msg = process.argv.slice(2).join(' ') || 'Rabbit Hotel 1';

		channel.assertQueue(queue, {
			durable: false,
		});

		channel.sendToQueue(queue, Buffer.from(msg));
		console.log('Sent %s', msg);
	});
	setTimeout(function () {
		connection.close();
		process.exit(0);
	}, 500);
});
