import { Collection, DeleteResult, Filter, InsertOneResult, MongoClient, ObjectId, WithId } from "mongodb";
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


// query the database and delete the requested category by it's object ID
export async function deleteCategory(request: NextRequest) {
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);
    
    // select the category based on its object ID
    try {
        await mongoClient.connect();
        // grab the category ID from the request body
        const body: any = await request.json();
        let categoryID : ObjectId = new ObjectId(sanitizeHtml(body._id));

        let categoryCollection:Collection<Category> = mongoClient.db(MONGO_DB_NAME).collection<Category>(MONGO_COLLECTION_CATEGORY);

        // delete only if id exists and category is not a default
        let result: WithId<Category> | null = await categoryCollection.findOneAndDelete({"_id": categoryID, "default" : false})

        // check if deleted correctly
        if (result == null ) {
            return NextResponse.json({error: "No Category found with that ID, or category is default"}, {status: 404});
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

export async function createCategory(request: NextRequest) {
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);

    // create a category using the body of the response
    try {
        await mongoClient.connect(); 				
        const body:any = await request.json();

        if (body.name == ""){
            return NextResponse.json({error: "Category Name is required"}, {status: 404});
        }

		body.name = sanitizeHtml(body.name);
        // hard code the default parameter to false
        body.default = false;

        let search:Category | null = await mongoClient.db(MONGO_DB_NAME).collection<Category>(MONGO_COLLECTION_CATEGORY).findOne({name: body.name});

        if (search != null) {
            return NextResponse.json({error: "A Category already exists with that name"}, {status: 406});
        }

        let result:InsertOneResult = await mongoClient.db(MONGO_DB_NAME).collection<Category>(MONGO_COLLECTION_CATEGORY).insertOne(body);

        return NextResponse.json(result, {status: 200});
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    } finally {
        mongoClient.close();
    }
}