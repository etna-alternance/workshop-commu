import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: "app",
    brokers: ['localhost:9092', 'localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'kafka' });

await consumer.connect();

export const KafkaReadMessage = async (topic, routine) => {
    await consumer.subscribe({ topic: topic, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ _, _, message }) => {
            routine(message)
        },
    });
}
