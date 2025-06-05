
import { MainLayout } from '@/components/layout/MainLayout'
import { Header } from '@/components/layout/Header'
import { DashboardTabs } from './DashboardTabs'
import { FilterSection } from './FilterSection'
import { StatsDisplay } from './StatsDisplay'
import { ChapterList } from './ChapterList'
import { useAppStore } from '@/store/useAppStore'
import { useEffect } from 'react'

export const Dashboard = () => {
  const { applyFilters } = useAppStore()

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  return (
    <>
      <Header />
      <MainLayout>
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold">JEE Main</h1>
            <p className="text-sm text-muted-foreground">
              2025 - 2009 | 173 Papers | 15825 Qs
            </p>
          </div>

          {/* Tab Navigation */}
          <DashboardTabs />

          {/* Filter Section */}
          <FilterSection />

          {/* Stats Display */}
          <StatsDisplay />

          {/* Chapter List */}
          <ChapterList />
        </div>
      </MainLayout>
    </>
  )
}
