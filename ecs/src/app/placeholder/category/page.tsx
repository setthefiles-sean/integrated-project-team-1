import { Categories, Category } from "@/src/components/data.model";
import CategoryManagementForm from "./CategoryForm"
import {getCategories} from "@/src/components/Requests"
export const dynamic = "force-dynamic"

let categories:Category[] = await getCategories();
console.log(categories);


export default function categoryManagement(){
    return <><CategoryManagementForm categories={categories}/></>
}