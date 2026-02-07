import { Collection, DeleteResult, MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from 'sanitize-html'
import { Category, User } from "./data.model";

// MongoDB constants
const MONGO_URL: string = process.env.MONGODB_URI || "mongodb://mongo:27017";
const MONGO_DB_NAME:string = "ECS";	
const MONGO_COLLECTION_USER:string = "user";
const MONGO_COLLECTION_CATEGORY:string = "category";


export async function getUser() {
    // construct mongoclient
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);

    let userArray:User[]
    try {
        await mongoClient.connect();
        // get JSON data from mongoDB Atlas
        userArray = await mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_USER).find({ role: "employee"}).toArray(); // grab just the employees
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

export async function deleteUser(request: NextRequest) {

    // construct mongoclient
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);
    try {
        // grab the employeeID from the request body
        const body: any = await request.json();
        let employeeID: ObjectId = new ObjectId(sanitizeHtml(body._id));

        let userCollection:Collection<User> = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_USER);
        let selector:Object = { "_id": employeeID };
        let result: DeleteResult = await userCollection.deleteOne(selector);

        // check if deleted correctly
        if (result.deletedCount <= 0) {
            return NextResponse.json({error: "No employee found with that ID"}, {status: 404});
        } else {
            // status code for deleted
            return NextResponse.json(result, {status: 200});
        }
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    } finally {
        mongoClient.close();
    }
}

// query the database and return all catagories
export async function getCategories() {
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);

    let categoryArray:Category[]
    try {
        await mongoClient.connect();
        // get JSON data from mongoDB Atlas
        categoryArray = await mongoClient.db(MONGO_DB_NAME).collection<Category>(MONGO_COLLECTION_CATEGORY).find().toArray();
        categoryArray.forEach((category:Category) => category._id = category._id.toString());
    } catch (error: any) {
        console.log(`>>> ERROR : ${error.message}`);
        throw error;
    } finally {
        // close the connection
        mongoClient.close()
    }
        return categoryArray;
}
