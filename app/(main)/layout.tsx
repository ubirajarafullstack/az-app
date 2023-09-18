import Link from 'next/link';
import './locals.css';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="fixed top-0 z-50 w-full p-4 flex justify-center items-center backdrop-blur-sm bg-black/90 dark:bg-black/90 text-white dark:text-white">
        <div className="w-11/12">
          <h1><Link href="/">az-app</Link></h1>
        </div>
      </nav>
      <main>
        {children}
      </main>
    </>
  )
}
