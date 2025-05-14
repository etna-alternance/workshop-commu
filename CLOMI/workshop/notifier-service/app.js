import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'notifier-service',
    brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'notifier-group' });

const run = async () => {
    while (true) {}
    // Implémenter la logique ici
};

run().catch(console.error);
