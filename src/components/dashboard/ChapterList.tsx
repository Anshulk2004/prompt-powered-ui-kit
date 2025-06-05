
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
  Globe,
  Beaker,
  Dna,
  Magnet,
  Lightbulb,
  Battery,
  Radio,
  Gauge,
  BookOpen,
  FlaskConical,
  Telescope
} from 'lucide-react'

const iconMap = {
  0: CircuitBoard, 1: Atom, 2: Calculator, 3: Zap, 4: Thermometer,
  5: Waves, 6: Eye, 7: Microscope, 8: Cpu, 9: Triangle,
  10: Circle, 11: Square, 12: Diamond, 13: Hexagon, 14: Star,
  15: Heart, 16: Target, 17: Compass, 18: Globe, 19: Beaker,
  20: Dna, 21: Magnet, 22: Lightbulb, 23: Battery, 24: Radio,
  25: Gauge, 26: BookOpen, 27: FlaskConical, 28: Telescope, 29: CircuitBoard
}

// Create a consistent icon mapping based on chapter name
const getChapterIcon = (chapterName: string) => {
  const hash = chapterName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const iconIndex = hash % 30
  return iconMap[iconIndex as keyof typeof iconMap]
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

  const getProgressPercentage = (solved: number, total: number) => {
    return total > 0 ? Math.round((solved / total) * 100) : 0
  }

  if (filteredChapters.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <BookOpen className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No chapters found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {filteredChapters.map((chapter) => {
        const IconComponent = getChapterIcon(chapter.chapter)
        const { year2025, year2024 } = getRecentYearQuestions(chapter.yearWiseQuestionCount)
        const totalQuestions = getTotalQuestions(chapter.yearWiseQuestionCount)
        const progressPercentage = getProgressPercentage(chapter.questionSolved, totalQuestions)

        return (
          <Card 
            key={`${chapter.subject}-${chapter.chapter}`} 
            className={`transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer group ${
              chapter.isWeakChapter ? 'ring-2 ring-orange-200 dark:ring-orange-800' : ''
            }`}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`p-3 rounded-xl ${getStatusColor(chapter.status)} bg-opacity-10 transition-transform group-hover:scale-110`}>
                  <IconComponent className={`h-6 w-6 ${getStatusColor(chapter.status).replace('bg-', 'text-')}`} />
                </div>

                {/* Chapter Content */}
                <div className="flex-1 min-w-0">
                  {/* Mobile Layout */}
                  <div className="sm:hidden space-y-3">
                    <div>
                      <h3 className="font-semibold text-foreground text-base leading-tight">
                        {chapter.chapter}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>{chapter.class}</span>
                        <span>•</span>
                        <span className="truncate">{chapter.unit}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="text-muted-foreground">
                        2025: {year2025}q | 2024: {year2024}q
                      </div>
                      <div className="font-medium">
                        {chapter.questionSolved}/{totalQuestions} ({progressPercentage}%)
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusBadgeVariant(chapter.status)} className="text-xs">
                        {chapter.status}
                      </Badge>
                      {chapter.isWeakChapter && (
                        <Badge variant="outline" className="text-xs border-orange-500 text-orange-600 dark:text-orange-400">
                          Weak
                        </Badge>
                      )}
                    </div>

                    {/* Progress Bar Mobile */}
                    {chapter.status !== 'Not Started' && (
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(chapter.status)}`}
                          style={{
                            width: `${Math.min(progressPercentage, 100)}%`
                          }}
                        ></div>
                      </div>
                    )}
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:block">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-lg leading-tight truncate">
                          {chapter.chapter}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span>{chapter.class}</span>
                          <span>•</span>
                          <span>{chapter.unit}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-right">
                          <div className="text-muted-foreground">
                            2025: {year2025}q | 2024: {year2024}q
                          </div>
                          <div className="font-medium text-base">
                            {chapter.questionSolved}/{totalQuestions} Questions ({progressPercentage}%)
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusBadgeVariant(chapter.status)} className="text-xs">
                            {chapter.status}
                          </Badge>
                          {chapter.isWeakChapter && (
                            <Badge variant="outline" className="text-xs border-orange-500 text-orange-600 dark:text-orange-400">
                              Weak
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar Desktop */}
                    {chapter.status !== 'Not Started' && (
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(chapter.status)}`}
                          style={{
                            width: `${Math.min(progressPercentage, 100)}%`
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
