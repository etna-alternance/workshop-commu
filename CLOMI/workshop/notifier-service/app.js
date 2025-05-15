import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'notifier-service',
    brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'notifier-group' });

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const run = async () => {
    console.log("NOTIFIER BOOTING UP...");
    await wait(10000);
    console.log("NOTIFIER BOOTED TRYING TO CONNECT TO KAFKA...");

    const MAX_RETRIES = 5;
    for (let i = 1; i <= MAX_RETRIES; i++) {
        try {
            await consumer.connect();
            console.log("NOTIFIER CONNECTED TO KAFKA !");
            return;
        } catch (e) {
            if (i == MAX_RETRIES)
                return (88);
            await wait(1000);
        }
    }

    /* CODER ICI */

};

run().catch(console.error);
