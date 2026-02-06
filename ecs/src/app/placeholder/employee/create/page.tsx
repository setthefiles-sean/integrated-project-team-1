import RegisterForm from "./RegisterForm";
import { getUser } from "@/src/components/Requests";
import { UserManager } from "@/src/components/UserManager";
import { User, Users } from "@/src/components/data.model";

export const dynamic = "force-dynamic"

// a page for testing sign ups via the client. I will remove it later --@Max
export default async function register() {
  let users: User[] = await getUser();

  return ( 
  <>
    <RegisterForm />

    {/* dump the user table into a div */}
    <div>
      {users.length > 0 ? (
        <UserManager users={users} />
      ) : (
        <p>There are currently no users in the database</p>
      )}
      </div>
  </>
);

}
