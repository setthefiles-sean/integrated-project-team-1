import Link from "next/link";
import { User, Users } from "./data.model";

export const dynamic = "force-dynamic"

export function UserManager({ users }: Users) {
    return (<div>
        {users.map((user: User) => (
            <div key={user._id.toString()}>
                   <p>Username: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Created on: {user.createdAt.toDateString()}</p>
                    <button><Link href={"/placeholder/employee/create"}> Delete </Link></button>
            </div>
    ))}
    </div>
    )

}