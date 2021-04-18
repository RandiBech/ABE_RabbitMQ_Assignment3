var amqp = require("amqplib/callback_api");
const { handleReservationRequest } = require("./reservation_controller");
require("./reservation_controller");

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = "reservation";

    channel.assertQueue(queue, {
      durable: false,
    });
    console.log("[*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(
      queue,
      async function (msg) {
        const message = msg.content.toString();
        console.log("[x] Received %s", msg.content.toString());

        const messageArray = message.split(/([0-9]+)/);
        const request = {
            hotelName: messageArray[0].trim(),
            roomNo: messageArray[1]
        }
        await handleReservationRequest(request);
      },
      {
        noAck: true,
      }
    );
  });
});
