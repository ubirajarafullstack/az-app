import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex gap-2 justify-center min-h-screen items-center">
      {"{ Home }"}
      <Link href={{ pathname: "/customer", /* query: { urlparam: "value" }, */ }}>Customer</Link>
      <Link href={{ pathname: "/products", /* query: { urlparam: "value" }, */ }}>Products</Link>
    </div>
  )
}
