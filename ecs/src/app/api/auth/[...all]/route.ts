// default auth route from better-auth's documentation
import { auth } from "@/src/app/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
