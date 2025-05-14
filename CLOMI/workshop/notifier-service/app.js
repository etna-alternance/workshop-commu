import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'notifier-service',
    brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'notifier-group' });

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const run = async () => {
    const MAX_RETRIES = 50
    for (let i = 1; i <= MAX_RETRIES; i++) {
        try {
            await consumer.connect();
            console.log("CONNECTED")
            return;
        } catch (e) {
            if (i == MAX_RETRIES)
                return (88)
            await wait(1000);
        }
    }
    await consumer.subscribe({ topic: 'order-events', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const eventType = message.key?.toString();
            const payload = message.value?.toString();

            console.log(`Received event: ${eventType}`);
            console.log(`Payload: ${payload}`);

            switch (eventType) {
                case 'order_created':
                    console.log(`[LOGS] New order created: ${payload}`);
                    break;
                case 'order_deleted':
                    console.log(`[LOGS] Order deleted: ${payload}`);
                    break;
                default:
                    console.error(`[LOGS] Unknown event type: ${eventType}`);
            }
        },
    });
};

run().catch(console.error);
