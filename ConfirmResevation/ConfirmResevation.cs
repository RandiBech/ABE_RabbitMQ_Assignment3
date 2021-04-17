using System;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Threading;

namespace ConfirmResevation
{
    class ConfirmResevation
    {
        static void Main(string[] args)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(
                    queue: "confirms",
                    durable: false,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null);

                Console.WriteLine(" [*] Awaiting reservation confirmation");

                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += (sender, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    (message.Contains("Not")) ? Console.WriteLine("Reservation not possible. Room is not available.")
                    : Console.WriteLine(" [x] Received Reservation confirmation. Resevation at {0} confirmed", message);
                };
            }

            channel.BasicConsume(
                queue: "confirms",
                autoAck: true,
                consumer: consumer);

            Console.WriteLine("Press [enter] to exit.");
            Console.ReadLine();

        }
    }
}
