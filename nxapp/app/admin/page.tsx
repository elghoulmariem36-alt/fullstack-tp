"use client";
import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

type Form = {
  title: string;
  description: string;
  price: string;
  thumbnail: string;
  stock: string;
  category: string;
};

const emptyForm: Form = {
  title: "",
  description: "",
  price: "",
  thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.webp",
  stock: "0",
  category: "",
};

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Form>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API}/products?limit=20&order=desc`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setProducts(data.products);
      });
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");

    const body = {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      thumbnail: form.thumbnail,
      stock: Number(form.stock),
      category: form.category,
    };

    const res = await fetch(
      editingId ? `${API}/products/${editingId}` : `${API}/products`,
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      const details = err?.details as
        | { path: (string | number)[]; message: string }[]
        | undefined;
      setError(
        details
          ? details.map((d) => `${d.path.join(".")}: ${d.message}`).join(", ")
          : "Request failed"
      );
      return;
    }

    setMessage(editingId ? "Product updated" : "Product created");
    cancel();
    setRefresh((r) => r + 1);
  }

  function edit(p: Product) {
    setEditingId(p.id);
    setMessage("");
    setError("");
    setForm({
      title: p.title,
      description: p.description,
      price: String(p.price),
      thumbnail: p.thumbnail,
      stock: String(p.stock),
      category: p.category.name,
    });
  }

  function cancel() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function remove(p: Product) {
    if (!confirm(`Delete "${p.title}"?`)) return;
    const res = await fetch(`${API}/products/${p.id}`, { method: "DELETE" });
    if (res.ok) {
      setMessage("Product deleted");
      setRefresh((r) => r + 1);
    } else {
      setError("Delete failed");
    }
  }

  const input = "rounded border px-3 py-2";

  return (
    <div className="p-4">
      <h1 className="mb-3 text-xl font-bold">
        {editingId ? `Edit product #${editingId}` : "New product"}
      </h1>

      {message && <p className="mb-2 rounded bg-green-100 p-2">{message}</p>}
      {error && <p className="mb-2 rounded bg-red-100 p-2">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 grid gap-2 md:grid-cols-2">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className={input} />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required className={input} />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className={`${input} md:col-span-2`} />
        <input name="price" type="number" step="0.01" min="0.01" value={form.price} onChange={handleChange} placeholder="Price" required className={input} />
        <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} placeholder="Stock" required className={input} />
        <input name="thumbnail" type="url" value={form.thumbnail} onChange={handleChange} placeholder="Image URL" required className={`${input} md:col-span-2`} />
        <div className="flex gap-2 md:col-span-2">
          <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
            {editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button type="button" onClick={cancel} className="rounded border px-4 py-2">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">ID</th>
              <th className="p-2">Title</th>
              <th className="p-2">Category</th>
              <th className="p-2">Price</th>
              <th className="p-2">Stock</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">{p.id}</td>
                <td className="p-2">{p.title}</td>
                <td className="p-2">{p.category.name}</td>
                <td className="p-2">{p.price} $</td>
                <td className="p-2">{p.stock}</td>
                <td className="flex gap-2 p-2">
                  <button onClick={() => edit(p)} className="rounded border px-2 py-1">Edit</button>
                  <button onClick={() => remove(p)} className="rounded border border-red-400 px-2 py-1 text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
