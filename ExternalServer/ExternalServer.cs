using System;
using RabbitMQ.Client;
using System.Text;

namespace ExternalServer
{
    class ExternalServer
    {
        static void Main(string[] args)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                // create Exchange
                channel.QueueDeclare(
                    queue: "reservation",
                    durable: false,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null);

                var message = GetMessage(args);

                var body = Encoding.UTF8.GetBytes(message);

                // var props = channel.CreateBasicProperties();

                channel.BasicPublish(
                    exchange: "",
                    routingKey: "reservation",
                    basicProperties: null,
                    body);

                Console.WriteLine(" [x] sent {0}", message);
            }

            Console.WriteLine("Pres [enter] to exit.");
            Console.ReadLine();

        }

        private static string GetMessage(string[] args)
        {
            return ((args.Length > 0) ? string.Join(" ", args) : " default should not be here");
        }
    }
}
