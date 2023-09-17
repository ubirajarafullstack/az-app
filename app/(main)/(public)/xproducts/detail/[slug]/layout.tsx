import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `${params.slug}`,
    description: `${params.slug}`
  }
}
export default function DetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
