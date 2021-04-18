# ABE_RabbitMQ_Assignment3

For this project a local docker server is used with the command:
    docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

To send reservation request from Direct server call:
    sendReservation.js <Hotel Name (OBS no numbers)> <Room no. (OBS only the number)>

To send reservation request from External server call:
    dotnet run <Hotel Name (OBS no numbers)> <Room no. (OBS only the number)>


-------------Dummy data in db------------------
Two hotels with eight rooms each:
    Rabbit Hotel
    MQ Hotel




-------------- Notes for the team---------------

Tilføjer .net console applikation ConfirmReservation til at kunne modtage confirms fra Database, og gemme dem i en logfil.

Har i Database projektet added sendConfirmation.js -> der sætter en "Confirmation" queue op.
i reservation_controller.js kaldes sendCOnfirmation() for at sende en besked til denne Confirmation queue. - mangler at få det tested ordentligt.
