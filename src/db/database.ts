import { MongoClient,ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { CarSchema } from "./schemas.ts";

const env = config();
/*
if (!env.MONGO_USR || env.MONGO_PWD){
    throw Error("You need env vars MONGO_USR and MONGO_PWD");
}
*/
const MONGO_USR="jofranro";
const MONGO_PWD="jofranro";
const dbName = "Cabify";
//const mongo_url =  `mongodb+srv://${MONGO_USR}:${MONGO_PWD}@cluster0.0xq0.mongodb.net/${dbName}?authMechanism=SCRAM-SHA-1`;
const mongo_url = `mongodb+srv://jofranro:jofranro@cluster0.iczdkf2.mongodb.net/${dbName}?authMechanism=SCRAM-SHA-1`;

const client = new MongoClient();
//Connecting to a Mongo Atlas Database
await client.connect(mongo_url);


const db = client.database(dbName);
console.info(`Mongo DB ${dbName} connected`);

export const carsCollection = db.collection<CarSchema>("Cars");