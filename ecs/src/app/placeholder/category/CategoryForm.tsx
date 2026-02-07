"use client"
import { CategoryManager } from "@/src/components/CategoryManager"
import { Categories, Category } from "@/src/components/data.model"

export const dynamic = "force-dynamic"

export default function CategoryManagementForm({categories}:{categories: Category[]}) {
    return (<>
        
        <CategoryManager categories={categories} />

    </>)
}