"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!user) {
    router.push("/api/auth/login");
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}
