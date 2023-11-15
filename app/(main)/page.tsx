import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex gap-4 justify-center min-h-screen items-center">
      {"{ Home }"}
      
      <Link 
        className="decoration-2 underline-offset-4 hover:underline focus:underline" 
        href={{ pathname: "/products", /* query: { urlparam: "value" }, */ }}
      >
        Produtos
      </Link>
    </div>
  )
}
