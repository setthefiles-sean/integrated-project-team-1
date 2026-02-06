"use client";
import { authClient } from "@/src/app/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  // handler for signout button
  const onSignOutClicked = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // redirect to start page
        },
      },
    });
  };

  return (
    <>
      {/* show user info and sign out button if login was successful */}
      {session != null ? (
        <>
          <div>Sign-in successful as {session?.user.name}</div>
          <button
            type="submit"
            className="hover:text-blue-700"
            onClick={onSignOutClicked}
          >
            Sign Out
          </button>
        </>
      ) : (
        <div> not signed in </div>
      )}
    </>
  );
}
