"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex gap-2 p-4">
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => router.push("/contact/123")}
      >
        Login Page
      </button>
      <button
        className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
        onClick={() => router.push("/contact")}
      >
        Contact Page
      </button>
    </div>
  );
}