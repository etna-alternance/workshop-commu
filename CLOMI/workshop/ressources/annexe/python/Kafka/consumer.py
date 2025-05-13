from kafka import KafkaConsumer
import json

def KafkaReadMessage(topic: str, group_id_: str, routine: function):
    consumer = KafkaConsumer(
        topic,
        bootstraps_servers='localhost:9092',
        group_id=group_id_,
        value_deserializer=lambda m: json.loads(m.decode('utf-8'))
    )
    for msg in consumer:
        routine(msg)
