
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Chapter, chaptersData } from '@/data/chaptersData'

export type FilterStatus = "All" | "Not Started" | "In Progress" | "Completed";
export type SortOption = "chapter" | "progress";

interface FilterState {
  subject: string;
  classes: string[];
  units: string[];
  status: FilterStatus;
  showWeakChaptersOnly: boolean;
}

interface AppState {
  // App-wide state
  isLoading: boolean
  user: null | { id: string; name: string; email: string }
  theme: 'light' | 'dark' | 'system'
  
  // Chapter data and filters
  chapters: Chapter[]
  filteredChapters: Chapter[]
  filters: FilterState
  sortBy: SortOption
  sortOrder: 'asc' | 'desc'
  
  // Actions
  setLoading: (loading: boolean) => void
  setUser: (user: AppState['user']) => void
  setTheme: (theme: AppState['theme']) => void
  clearUser: () => void
  
  // Chapter and filter actions
  updateChapterProgress: (chapterName: string, questionSolved: number) => void
  updateChapterStatus: (chapterName: string, status: Chapter['status']) => void
  toggleWeakChapter: (chapterName: string) => void
  setFilter: (filterType: keyof FilterState, value: string | string[] | boolean) => void
  setSortBy: (sortBy: SortOption) => void
  setSortOrder: (order: 'asc' | 'desc') => void
  toggleSortOrder: () => void
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
  subject: "Physics",
  classes: [],
  units: [],
  status: "All",
  showWeakChaptersOnly: false
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial state
      isLoading: false,
      user: null,
      theme: 'system',
      chapters: chaptersData,
      filteredChapters: chaptersData.filter(chapter => chapter.subject === "Physics"),
      filters: initialFilters,
      sortBy: 'chapter',
      sortOrder: 'asc',
      
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
      setSortOrder: (order) => set({ sortOrder: order }),
      toggleSortOrder: () => set((state) => ({ sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' })),
      
      applyFilters: () => set((state) => {
        let filtered = [...state.chapters];
        
        // Apply subject filter
        filtered = filtered.filter(chapter => chapter.subject === state.filters.subject);
        
        // Apply class filter
        if (state.filters.classes.length > 0) {
          filtered = filtered.filter(chapter => state.filters.classes.includes(chapter.class));
        }
        
        // Apply unit filter
        if (state.filters.units.length > 0) {
          filtered = filtered.filter(chapter => state.filters.units.includes(chapter.unit));
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
          let comparison = 0;
          
          switch (state.sortBy) {
            case 'chapter':
              comparison = a.chapter.localeCompare(b.chapter);
              break;
            case 'progress':
              const aTotalQuestions = Object.values(a.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0);
              const bTotalQuestions = Object.values(b.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0);
              comparison = b.questionSolved - a.questionSolved || bTotalQuestions - aTotalQuestions;
              break;
            default:
              return 0;
          }
          
          return state.sortOrder === 'desc' ? -comparison : comparison;
        });
        
        return { filteredChapters: filtered };
      }),
      
      resetFilters: () => set((state) => {
        const newFilters = { ...initialFilters, subject: state.filters.subject };
        return {
          filters: newFilters,
          sortBy: 'chapter',
          sortOrder: 'asc'
        };
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
