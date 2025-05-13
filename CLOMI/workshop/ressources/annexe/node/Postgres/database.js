import { Client } from 'pg'
import { retry } from 'async'

export const client = new Client({
	user: process.env?.POSTGRES_USER || "user",
	password: process.env?.POSTGRES_PASSWORD || "password",
	host: process.env?.POSTGRES_HOST || "host",
	port: process.env?.POSTGRES_PORT || "port",
	database: process.env?.POSTGRES_DATABASE || "database",
});

retry(
    {times: 5, interval: 1000},
    function(callback) {
        client.connect().then(() => {
          callback(undefined, client);
        }).catch((err) => {
          console.error("Waiting for db", err);
          callback(err, undefined);
        });
    },
    function(err, client) {
      if (err) {
        return console.error("Giving up");
      }
      console.log("Connected to db");
    }
);
