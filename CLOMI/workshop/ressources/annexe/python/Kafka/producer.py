from kafka import KafkaProducer
import json

# le message est un dict, cela veut dire { key: value, ... }
def KafkaSendMessage(topic: str, message: dict):
    producer = KafkaProducer(
        bootstrap_servers='localhost:9092',
        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )
    producer.send(topic, value=message)
    producer.flush()
