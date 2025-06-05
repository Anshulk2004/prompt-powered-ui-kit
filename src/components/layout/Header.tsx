
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/useAppStore'
import { Moon, Sun } from 'lucide-react'

export const Header = () => {
  const { theme, setTheme, user } = useAppStore()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Your App</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="default" size="sm">
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
