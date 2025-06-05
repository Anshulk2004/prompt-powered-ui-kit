
import { ReactNode } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: ReactNode
  className?: string
}

export const MainLayout = ({ children, className }: MainLayoutProps) => {
  const { isLoading, theme } = useAppStore()

  return (
    <div className={cn(
      "min-h-screen bg-background text-foreground transition-colors duration-300",
      theme === 'dark' && 'dark',
      className
    )}>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
