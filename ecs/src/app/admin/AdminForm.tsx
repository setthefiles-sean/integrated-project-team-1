"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/src/app/lib/auth-client";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import Link from "next/link";

/** returns the admin login form  */
export default function AdminForm() {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  /** handler for login form submission*/
  const onSubmit = async () => {
    let loginJson = { email: email, password: password };

    let response = await authClient.signIn.email(loginJson);

    // if we don't get an error, send to a new page
    if (!response.error) {
      router.push("/success");
    }
    // if there is an error, show it and enable the error message div
    if (response.error) {
      setError(response.error.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans bg-[#4a4a4a]">
      <Header />

      <main className="flex grow flex-col items-center justify-center p-4">
        <h1 className="text-white text-2xl md:text-3xl text-center mb-8 font-light tracking-wide">
          Welcome to Weyland-Yutani Corporation
          <br />
          Employee Claims System
        </h1>

        {/* login area */}
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
          <h2 className="text-gray-800 text-xl mb-2">Admin sign-in</h2>
          <hr className="w-full border-gray-300 mb-8" />

          <div className="w-full space-y-6">
            {/* username field */}
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-600 mb-1">email:</label>
              <input
                type="email"
                className="w-full text-gray-700 bg-[#d9d9d9] rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            {/* password field */}
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-600 mb-1">password:</label>
              <input
                type="password"
                className="w-full text-gray-700 bg-[#d9d9d9] rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            {/* sign-in button */}
            <div className="flex justify-center pt-2">
              <button
                className="bg-blue-400 text-gray-700 px-8 py-2 rounded-lg border border-gray-400 hover:bg-blue-500 transition-colors shadow-sm"
                type="submit"
                onClick={onSubmit}
              >
                sign-in
              </button>
            </div>
          </div>

          {/* employee sign-in link */}
          <button className="mt-12 text-sm text-gray-700 hover:underline">
            <Link href="/">employee sign-in </Link>
          </button>
          {error && <p className="mt-5 text-red-500 text-center">{error}</p>}
        </div>
      </main>

      <Footer />
    </div>
  );
}
