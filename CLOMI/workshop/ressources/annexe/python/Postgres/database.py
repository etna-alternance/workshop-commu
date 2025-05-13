import os
import psycopg2
from tenacity import retry, stop_after_attempt, wait_fixed
import time

DB_CONFIG = {
    'user': os.getenv('POSTGRES_USER', 'user'),
    'password': os.getenv('POSTGRES_PASSWORD', 'password'),
    'host': os.getenv('POSTGRES_HOST', 'host'),
    'port': os.getenv('POSTGRES_PORT', '5432'),
    'dbname': os.getenv('POSTGRES_DATABASE', 'database')
}

@retry(stop=stop_after_attempt(5), wait=wait_fixed(1))
def ConnectToDB():
    try:
        print("Waiting for db")
        conn = psycopg2.connect(**DB_CONFIG)
    except Exception:
        print("Giving up")
        return
    print("Connected to db")
    return conn
