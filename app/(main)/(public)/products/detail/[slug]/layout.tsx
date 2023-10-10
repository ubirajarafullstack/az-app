import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `Az-app - produtos - ${params.slug}`,
    description: `Curadoria de produtos - ${params.slug}`
  }
}

export default function DetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
