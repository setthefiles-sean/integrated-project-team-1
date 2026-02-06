import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
const uri = process.env.MONGODB_URI!;

const client = new MongoClient(uri);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // allow the backend to connect from our vercel app or dev server
  trustedOrigins: [
    "http://localhost:3000",
    "https://integrated-project-team-1-beta.vercel.app",
  ],
});
