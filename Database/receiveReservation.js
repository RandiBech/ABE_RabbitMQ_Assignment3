var amqp = require('amqplib/callback_api');

var hotelCollection = require('./models/hotel');

var reservationController = require('./reservation_controller');

amqp.connect('amqp://localhost', async function(error0, connection){
    if(error0){
        throw error0;
    }
    connection.createChannel( async function(error1, channel){
        if(error1){
            throw error1;
        }
        var queue = 'reservation';

        channel.assertQueue(queue, {
            durable: false
        });
        console.log("[*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, async function (msg) {
            console.log("[x] Received %s", msg.content.toString());
            // var hotels = await hotelCollection.find({});
            // console.log(hotels);
            const request = {
                hotelName: "Rabbit Hotel",
                roomNo: "2"
            }
            await reservationController.handleReservationRequest(request);
            //kald metode til undersøge om værelse er ledigt (reservation_controller)
        }, {
            noAck: true
        });
    });    
});
