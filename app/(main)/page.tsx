import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex gap-2 justify-center min-h-screen items-center">
      Home
      <Link href={{ pathname: "/customer", /* query: { urlparam: "value" }, */ }}>Customer</Link>
      <Link href={{ pathname: "/shoes", /* query: { urlparam: "value" }, */ }}>Shoes</Link>
      <Link href={{ pathname: "/products/shoes", /* query: { urlparam: "value" }, */ }}>Produtos/Shoes</Link>
    </div>
  )
}
