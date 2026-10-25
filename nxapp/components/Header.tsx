import Link from "next/link";

export default function Header() {
  return (
    <nav className="flex justify-center gap-4 p-4">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/products">Products</Link>
      <Link href="/admin">Admin</Link>
    </nav>
  );
}
