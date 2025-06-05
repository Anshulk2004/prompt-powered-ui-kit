
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Chapter, chaptersData } from '@/data/chaptersData'

export type FilterStatus = "All" | "Not Started" | "In Progress" | "Completed";
export type SortOption = "chapter" | "status" | "progress" | "weakChapters";

interface FilterState {
  subject: string;
  class: string;
  unit: string;
  status: FilterStatus;
  showWeakChaptersOnly: boolean;
}

interface AppState {
  // App-wide state
  isLoading: boolean
  user: null | { id: string; name: string; email: string }
  theme: 'light' | 'dark'
  
  // Chapter data and filters
  chapters: Chapter[]
  filteredChapters: Chapter[]
  filters: FilterState
  sortBy: SortOption
  
  // Actions
  setLoading: (loading: boolean) => void
  setUser: (user: AppState['user']) => void
  setTheme: (theme: AppState['theme']) => void
  clearUser: () => void
  
  // Chapter and filter actions
  updateChapterProgress: (chapterName: string, questionSolved: number) => void
  updateChapterStatus: (chapterName: string, status: Chapter['status']) => void
  toggleWeakChapter: (chapterName: string) => void
  setFilter: (filterType: keyof FilterState, value: string | boolean) => void
  setSortBy: (sortBy: SortOption) => void
  applyFilters: () => void
  resetFilters: () => void
  
  // Computed getters
  getUniqueSubjects: () => string[]
  getUniqueClasses: () => string[]
  getUniqueUnits: (subject?: string) => string[]
  getChapterStats: () => {
    total: number
    completed: number
    inProgress: number
    notStarted: number
    weakChapters: number
  }
}

const initialFilters: FilterState = {
  subject: "All",
  class: "All", 
  unit: "All",
  status: "All",
  showWeakChaptersOnly: false
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial state
      isLoading: false,
      user: null,
      theme: 'light',
      chapters: chaptersData,
      filteredChapters: chaptersData,
      filters: initialFilters,
      sortBy: 'chapter',
      
      // Basic actions
      setLoading: (loading) => set({ isLoading: loading }),
      setUser: (user) => set({ user }),
      setTheme: (theme) => set({ theme }),
      clearUser: () => set({ user: null }),
      
      // Chapter actions
      updateChapterProgress: (chapterName, questionSolved) => set((state) => ({
        chapters: state.chapters.map(chapter =>
          chapter.chapter === chapterName
            ? { ...chapter, questionSolved }
            : chapter
        )
      })),
      
      updateChapterStatus: (chapterName, status) => set((state) => ({
        chapters: state.chapters.map(chapter =>
          chapter.chapter === chapterName
            ? { ...chapter, status }
            : chapter
        )
      })),
      
      toggleWeakChapter: (chapterName) => set((state) => ({
        chapters: state.chapters.map(chapter =>
          chapter.chapter === chapterName
            ? { ...chapter, isWeakChapter: !chapter.isWeakChapter }
            : chapter
        )
      })),
      
      // Filter actions
      setFilter: (filterType, value) => set((state) => {
        const newFilters = { ...state.filters, [filterType]: value };
        return { filters: newFilters };
      }),
      
      setSortBy: (sortBy) => set({ sortBy }),
      
      applyFilters: () => set((state) => {
        let filtered = [...state.chapters];
        
        // Apply subject filter
        if (state.filters.subject !== "All") {
          filtered = filtered.filter(chapter => chapter.subject === state.filters.subject);
        }
        
        // Apply class filter
        if (state.filters.class !== "All") {
          filtered = filtered.filter(chapter => chapter.class === state.filters.class);
        }
        
        // Apply unit filter
        if (state.filters.unit !== "All") {
          filtered = filtered.filter(chapter => chapter.unit === state.filters.unit);
        }
        
        // Apply status filter
        if (state.filters.status !== "All") {
          filtered = filtered.filter(chapter => chapter.status === state.filters.status);
        }
        
        // Apply weak chapters filter
        if (state.filters.showWeakChaptersOnly) {
          filtered = filtered.filter(chapter => chapter.isWeakChapter);
        }
        
        // Apply sorting
        filtered.sort((a, b) => {
          switch (state.sortBy) {
            case 'chapter':
              return a.chapter.localeCompare(b.chapter);
            case 'status':
              return a.status.localeCompare(b.status);
            case 'progress':
              return b.questionSolved - a.questionSolved;
            case 'weakChapters':
              return Number(b.isWeakChapter) - Number(a.isWeakChapter);
            default:
              return 0;
          }
        });
        
        return { filteredChapters: filtered };
      }),
      
      resetFilters: () => set({
        filters: initialFilters,
        filteredChapters: chaptersData,
        sortBy: 'chapter'
      }),
      
      // Computed getters
      getUniqueSubjects: () => {
        const subjects = [...new Set(get().chapters.map(chapter => chapter.subject))];
        return subjects.sort();
      },
      
      getUniqueClasses: () => {
        const classes = [...new Set(get().chapters.map(chapter => chapter.class))];
        return classes.sort();
      },
      
      getUniqueUnits: (subject) => {
        const chapters = subject 
          ? get().chapters.filter(chapter => chapter.subject === subject)
          : get().chapters;
        const units = [...new Set(chapters.map(chapter => chapter.unit))];
        return units.sort();
      },
      
      getChapterStats: () => {
        const chapters = get().filteredChapters;
        return {
          total: chapters.length,
          completed: chapters.filter(c => c.status === "Completed").length,
          inProgress: chapters.filter(c => c.status === "In Progress").length,
          notStarted: chapters.filter(c => c.status === "Not Started").length,
          weakChapters: chapters.filter(c => c.isWeakChapter).length,
        };
      }
    }),
    {
      name: 'app-store',
    }
  )
)
