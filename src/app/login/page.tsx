"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, gql } from "@apollo/client";
import { useAuth } from "@/context/AuthContext";

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const [loginUser] = useMutation(LOGIN_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { email, password } });
      login(data.loginUser.token);
      router.push("/products");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2">Login</button>
    </form>
  );
}