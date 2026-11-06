import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; ShopLab. Full stack training project.</p>
        <div className="flex gap-4">
          <Link href="/products" className="hover:text-slate-900">Catalogue</Link>
          <Link href="/contact" className="hover:text-slate-900">Contact</Link>
          <Link href="/tp1" className="hover:text-slate-900">TP1 demos</Link>
        </div>
      </div>
    </footer>
  );
}
