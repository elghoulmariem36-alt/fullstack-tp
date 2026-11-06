"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Child from "@/components/Child";

export default function Tp1Demos() {
  const router = useRouter();
  const [states] = useState(["Tozeur", "Gafsa", "Tunis"]);
  const [chosen, setChosen] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">TP1 demos</h1>
        <p className="mt-1 text-slate-500">
          Navigation from code, route parameters and parent to child communication.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-bold">Navigation from code</h2>
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            onClick={() => router.push("/login")}
          >
            Login Page
          </button>
          <button
            className="rounded-lg bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-700"
            onClick={() => router.push("/contact/123")}
          >
            Contact Page (id 123)
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-bold">Parent to child</h2>
        <Child states={states} onSelect={setChosen} />
        <p className="px-4">Selected: {chosen}</p>
      </section>
    </div>
  );
}
