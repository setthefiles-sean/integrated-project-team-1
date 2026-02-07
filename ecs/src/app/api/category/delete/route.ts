import { NextRequest } from "next/server";
import { deleteCategory } from "@/src/components/Requests";

export async function DELETE(request: NextRequest) {

    return deleteCategory(request);

}