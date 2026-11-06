import Link from "next/link";

const features = [
  {
    title: "Wide catalogue",
    text: "Browse around one hundred products across many categories.",
  },
  {
    title: "Fast search",
    text: "Search by name and filter by category in one click.",
  },
  {
    title: "Modern stack",
    text: "Next.js and Angular front-ends sharing one Express and PostgreSQL API.",
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-linear-to-br from-brand to-indigo-900 px-8 py-16 text-white sm:px-14 sm:py-24">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-200">
          Welcome to ShopLab
        </p>
        <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          Find the right product, fast.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-indigo-100">
          A complete full stack project: a React front-end, a REST API and a
          PostgreSQL database.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-brand hover:bg-indigo-50"
          >
            Browse the catalogue
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            Contact us
          </Link>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold">{f.title}</h2>
            <p className="mt-2 text-slate-500">{f.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
