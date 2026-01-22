"use client";

import { useState, useEffect } from "react";
import { signUp } from "@/src/app/lib/auth-client";

// a page for testing sign ups via the client. I will remove it later --@Max
export default function RegisterForm() {
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    let registerJson = { email: email, name: username, password: password };

    let response = await signUp.email(registerJson);

    if (response.error) {
      setError(response.error.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="email">Email</label>

      <input
        type="email"
        id="email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
      />

      <label htmlFor="username">Username</label>

      <input
        type="text"
        id="username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUsername(e.target.value);
        }}
      />

      <label htmlFor="password"> Password </label>
      <input
        type="password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
      />

      <button type="submit" onClick={onSubmit}>
        Submit
      </button>

      <div className="text-center">
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
