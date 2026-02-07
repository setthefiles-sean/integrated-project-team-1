"use client"
import { CategoryManager } from "@/src/components/CategoryManager"
import { Categories, Category } from "@/src/components/data.model"

export const dynamic = "force-dynamic"

export default function CategoryManagementForm({categories}:{categories: Category[]}) {
    return (<>
         {/* dump the category table into a div */}
    <div>
      {categories.length > 0 ? (
        <CategoryManager categories={categories} />
      ) : (
        <p>There are currently no categories in the database</p>
      )}
      </div>
    </>)
}