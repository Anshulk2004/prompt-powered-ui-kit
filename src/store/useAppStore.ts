
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AppState {
  // App-wide state will go here
  isLoading: boolean
  user: null | { id: string; name: string; email: string }
  theme: 'light' | 'dark'
  
  // Actions
  setLoading: (loading: boolean) => void
  setUser: (user: AppState['user']) => void
  setTheme: (theme: AppState['theme']) => void
  clearUser: () => void
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      // Initial state
      isLoading: false,
      user: null,
      theme: 'light',
      
      // Actions
      setLoading: (loading) => set({ isLoading: loading }),
      setUser: (user) => set({ user }),
      setTheme: (theme) => set({ theme }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'app-store',
    }
  )
)
