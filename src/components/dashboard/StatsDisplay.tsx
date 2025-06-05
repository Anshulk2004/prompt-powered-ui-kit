
import { useAppStore } from '@/store/useAppStore'

export const StatsDisplay = () => {
  const { getChapterStats } = useAppStore()
  const stats = getChapterStats()

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 border-b">
      <div className="text-sm text-muted-foreground">
        Showing all chapters ({stats.total})
      </div>
      
      <div className="flex gap-4 text-sm">
        <span className="text-green-600">Completed: {stats.completed}</span>
        <span className="text-blue-600">In Progress: {stats.inProgress}</span>
        <span className="text-gray-600">Not Started: {stats.notStarted}</span>
        <span className="text-orange-600">Weak: {stats.weakChapters}</span>
      </div>
    </div>
  )
}
