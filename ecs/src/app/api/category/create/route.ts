import { NextRequest } from "next/server";
import { createCategory } from "@/src/components/Requests";

export async function POST(request: NextRequest) {

    return createCategory(request);

}