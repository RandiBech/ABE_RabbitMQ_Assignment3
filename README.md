# ABE_RabbitMQ_Assignment3

Der er lavet ny collection til databasen. Nyt navn: "rabbitHotels". Det er gjort, da jeg har fjerne nogle props for at gøre det mere simpelt.
Der er opsat dummyData (seedData), men har ikke fået forbindelse til vores database endnu, så det ligger ikke på clusteret.

RabbitMQ:
Simpelt sat op mellem DirectServer og Database. Det virker med at sende imellem her.
Jeg har brugt lokal server med Docker.

docker commando: docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
