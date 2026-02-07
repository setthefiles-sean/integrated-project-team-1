import { NextRequest } from "next/server";
import { deleteUser } from "@/src/components/Requests";

export async function DELETE(request: NextRequest) {

    return deleteUser(request);

}