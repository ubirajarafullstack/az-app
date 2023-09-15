import Link from 'next/link';
import './locals.css';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="fixed top-0 z-50 backdrop-blur-sm bg-white/90 w-full p-4 flex justify-center items-center">
        <div className="w-11/12">
          <h1><Link href="/" className="text-black">az-app</Link></h1>
        </div>
      </nav>
      <main>
        {children}
      </main>
    </>
  )
}
