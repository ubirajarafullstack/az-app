import TanStack from '@/app/data/tanstack';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <TanStack>
      {children}
    </TanStack>
  )
}
