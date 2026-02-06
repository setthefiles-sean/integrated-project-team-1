import { getUser } from "@/src/components/Requests";
import { NextRequest, NextResponse } from "next/server";

// handler for get/user route
export function POST(request: NextRequest) {

    return getUser();
    
}