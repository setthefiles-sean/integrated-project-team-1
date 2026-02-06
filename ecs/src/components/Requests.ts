import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from 'sanitize-html'
import { User } from "./data.model";

// MongoDB constants
const MONGO_URL: string = process.env.MONGODB_URI || "mongodb://mongo:27017";
const MONGO_DB_NAME:string = "ECS";	
const MONGO_COLLECTION_USER:string = "user";

export async function getUser() {
    // construct mongo
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);

    let userArray:User[]
    try {
        await mongoClient.connect();
        // get JSON data from mongoDB Atlas
        userArray = await mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_USER).find().toArray();
        userArray.forEach((user:User) => user._id = user._id.toString());
    } catch (error: any) {
        console.log(`>>> ERROR : ${error.message}`);
        throw error;
    } finally {
        // close the connection
        mongoClient.close()
    }
        return userArray;
}