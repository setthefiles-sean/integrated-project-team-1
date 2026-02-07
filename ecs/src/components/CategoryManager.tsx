import Link from "next/link";
import { Category, Categories } from "./data.model";

export const dynamic = "force-dynamic";

export function CategoryManager({ categories }: Categories) {
    return (
        // show all categories in the database
        <div>
        {categories.length > 0 ? (
            categories.map((category: Category) => (
                <div key={category._id.toString()}>
                    <p>Category name: {category.name} </p>
                    {/* if the category is not default, show the delete button */}
                    {category.default ? (<></>) : (<button><Link href={"/placeholder/category"}> Delete </Link></button>)}
                </div>
                // alert the user if there are no categories in the database
            ))) : (<>There are no catagories in the database</>)}
        </div> )}