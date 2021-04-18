# ABE_RabbitMQ_Assignment3

Der er lavet ny collection til databasen. Nyt navn: "rabbitHotels". Det er gjort, da jeg har fjerne nogle props for at gøre det mere simpelt.
Der er opsat dummyData (seedData), men har ikke fået forbindelse til vores database endnu, så det ligger ikke på clusteret.

RabbitMQ:
Simpelt sat op mellem DirectServer og Database. Det virker med at sende imellem her.
simpelt sat op mellem ExternalServer og Database. Det virker med at sende imellem her.

Jeg har brugt lokal server med Docker.

docker commando: docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

Tilføjer .net console applikation ConfirmReservation til at kunne modtage confirms fra Database, og gemme dem i en logfil.

Har i Database projektet added sendConfirmation.js -> der sætter en "Confirmation" queue op.
i reservation_controller.js kaldes sendCOnfirmation() for at sende en besked til denne Confirmation queue. - mangler at få det tested ordentligt.
