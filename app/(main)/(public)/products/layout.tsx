import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: 'Produtos',
    description: 'Curadoria de produtos'
  }
}
export default function DetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
