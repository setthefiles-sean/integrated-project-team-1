"use client"
import Link from "next/link";
import { Category, Categories } from "./data.model";
import { MouseEventHandler } from "react";
import { sendJSONData } from "./Toolkit";

export const dynamic = "force-dynamic";

export function CategoryManager({ categories }: Categories) {
    const DELETE_CATEGORY_SCRIPT: string = "/api/category/delete"

    // event handler for the delete button
    const onDeleteCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
        
        // grab the value of the delete button
        let deleteJson = { _id: e.currentTarget.id }

        const response = await sendJSONData(DELETE_CATEGORY_SCRIPT, deleteJson, "DELETE" );
        console.log(deleteJson);

    }

    return (
        // show all categories in the database
        <div>
        {categories.length > 0 ? (
            categories.map((category: Category) => (
                <div key={category._id.toString()}>
                    <p>Category name: {category.name} </p>
                    {/* if the category is not default, show the delete button */}
                    {category.default ? (<></>) : (<button id={category._id.toString()} onClick={onDeleteCategory}>Delete</button>)}
                </div>
                // alert the user if there are no categories in the database
            ))) : (<>There are no catagories in the database</>)}
        </div> )}