
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/store/useAppStore'
import { 
  CircuitBoard, 
  Atom, 
  Calculator, 
  Zap, 
  Thermometer, 
  Waves, 
  Eye, 
  Microscope, 
  Cpu,
  Triangle,
  Circle,
  Square,
  Diamond,
  Hexagon,
  Star,
  Heart,
  Target,
  Compass,
  Globe
} from 'lucide-react'

const iconMap = {
  0: CircuitBoard,
  1: Atom,
  2: Calculator,
  3: Zap,
  4: Thermometer,
  5: Waves,
  6: Eye,
  7: Microscope,
  8: Cpu,
  9: Triangle,
  10: Circle,
  11: Square,
  12: Diamond,
  13: Hexagon,
  14: Star,
  15: Heart,
  16: Target,
  17: Compass,
  18: Globe,
  19: CircuitBoard
}

export const ChapterList = () => {
  const { filteredChapters } = useAppStore()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500'
      case 'In Progress':
        return 'bg-blue-500'
      case 'Not Started':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'default'
      case 'In Progress':
        return 'secondary'
      case 'Not Started':
        return 'outline'
      default:
        return 'outline'
    }
  }

  const getTotalQuestions = (yearWiseQuestionCount: Record<string, number>) => {
    return Object.values(yearWiseQuestionCount).reduce((sum, count) => sum + count, 0)
  }

  const getRecentYearQuestions = (yearWiseQuestionCount: Record<string, number>) => {
    const year2025 = yearWiseQuestionCount['2025'] || 0
    const year2024 = yearWiseQuestionCount['2024'] || 0
    return { year2025, year2024 }
  }

  return (
    <div className="space-y-3">
      {filteredChapters.map((chapter, index) => {
        const IconComponent = iconMap[index % 20]
        const { year2025, year2024 } = getRecentYearQuestions(chapter.yearWiseQuestionCount)
        const totalQuestions = getTotalQuestions(chapter.yearWiseQuestionCount)

        return (
          <Card key={`${chapter.subject}-${chapter.chapter}`} className={`transition-all hover:shadow-md ${chapter.isWeakChapter ? 'ring-2 ring-orange-200' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={`p-2 rounded-lg ${getStatusColor(chapter.status)} bg-opacity-10`}>
                  <IconComponent className={`h-5 w-5 ${getStatusColor(chapter.status).replace('bg-', 'text-')}`} />
                </div>

                {/* Chapter Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{chapter.chapter}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>{chapter.class}</span>
                        <span>•</span>
                        <span>{chapter.unit}</span>
                      </div>
                    </div>

                    {/* Stats - Mobile: Below title, Desktop: Right side */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">
                          2025: {year2025}q | 2024: {year2024}q
                        </span>
                        <span className="font-medium">
                          {chapter.questionSolved}/{totalQuestions} Qs
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusBadgeVariant(chapter.status)} className="text-xs">
                          {chapter.status}
                        </Badge>
                        {chapter.isWeakChapter && (
                          <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">
                            Weak
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {chapter.status !== 'Not Started' && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getStatusColor(chapter.status)}`}
                          style={{
                            width: `${Math.min((chapter.questionSolved / totalQuestions) * 100, 100)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {filteredChapters.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No chapters found matching your filters.</p>
        </div>
      )}
    </div>
  )
}
