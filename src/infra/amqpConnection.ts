import client, { Connection, Channel, ConsumeMessage } from "amqplib"

class RabbitMQConnection {
    connection!: Connection;
    channel!: Channel;
    private connected!: Boolean;

    async connect() {
        if(this.connected && this.channel) return;
        else this.connected = true;

        try{
            console.log(`⌛️ Connecting to Rabbit-MQ Server`);
            console.log(process.env.RABBITMQ_PORT);
            this.connection = await client.connect(
                `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
            );

            console.log(`✅ Rabbit MQ Connection is ready`);

            this.channel = await this.connection.createChannel();

            this.channel.assertQueue('ceps');

            console.log(`🛸 Created RabbitMQ Channel successfully`);
        } catch (error) {
            console.error(error);
            console.error(`Not connected to MQ Server`);
          }
    }

    async sendToQueue(queue: string, message:any) {
        try {
            if (!this.channel) {
                await this.connect();
            }

            this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        } catch(err) {
            console.error(err);
            throw err;
        }
    }
}

const mqConnection = new RabbitMQConnection();

export default mqConnection;