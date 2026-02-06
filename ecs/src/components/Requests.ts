import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from 'sanitize-html'
import { User } from "./data.model";

// MongoDB constants
const MONGO_URL:string = "mongodb://mongo:27017/";
const MONGO_DB_NAME:string = "ECS";	
const MONGO_COLLECTION_USER:string = "user";

export function getUser(request:NextRequest) {
    // construct mongo
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);

    let 
}