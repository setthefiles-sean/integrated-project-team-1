import Link from "next/link";
import { Category, Categories } from "./data.model";

export const dynamic = "force-dynamic"

export function CategoryManager({ categories }: Categories) {
    return (<div>
        {categories.map((Category: Category) => (
            <div key={Category._id.toString()}>
                   <p>Categoryname: {Category.name}</p>
                    <button><Link href={"/placeholder/category"}> Delete </Link></button>
            </div>
    ))}
    </div>
    )

}