import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: "app",
    brokers: ['localhost:9092', 'localhost:9092']
})

const producer = kafka.producer()

await producer.connect();

export const KafkaSendMessage = async (topicName, message) => {
    if (typeof(message) == "string")
        producer.send({
            topic: topicName,
            messages: [
                { value: message }
            ]
        });
    else if (typeof(message) == "object")
        producer.send({
            topic: topicName,
            messages: [
                message.forEach(element => {value: element})
            ]
        });
    else
        console.error("Message must be a string or a list")
}
