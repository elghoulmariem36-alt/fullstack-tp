"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-brand">
          Shop<span className="text-slate-900">Lab</span>
        </Link>

        <button
          type="button"
          className="rounded-lg border border-slate-200 px-3 py-1 text-sm font-medium text-slate-700 md:hidden"
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <ul
          id="main-menu"
          className={`${open ? "flex" : "hidden"} absolute left-0 top-full w-full flex-col gap-1 border-b border-slate-200 bg-white p-4 md:static md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:border-0 md:p-0`}
        >
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded px-2 py-1 text-sm font-medium transition-colors ${
                  isActive(l.href)
                    ? "text-brand"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 rounded px-2 py-1 text-sm font-medium transition-colors ${
                isActive("/cart") ? "text-brand" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Cart
              {count > 0 && (
                <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-white">
                  {count}
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-brand px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
