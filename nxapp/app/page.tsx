"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Child from "@/components/Child";

export default function Home() {
  const router = useRouter();
  const [states] = useState(["Tozeur", "Gafsa", "Tunis"]);
  const [chosen, setChosen] = useState("");

  return (
    <>
      <div className="flex gap-2 p-4">
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => router.push("/login")}
        >
          Login Page
        </button>
        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          onClick={() => router.push("/contact/123")}
        >
          Contact Page
        </button>
      </div>

      <Child states={states} onSelect={setChosen} />
      <p className="p-4">Selected: {chosen}</p>
    </>
  );
}