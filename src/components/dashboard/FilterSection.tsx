
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/useAppStore'
import { ArrowUp, ArrowDown } from 'lucide-react'

export const FilterSection = () => {
  const { 
    filters, 
    sortBy,
    setFilter, 
    setSortBy,
    applyFilters,
    getUniqueClasses,
    getUniqueUnits
  } = useAppStore()

  const handleClassChange = (value: string) => {
    setFilter('class', value)
    applyFilters()
  }

  const handleUnitChange = (value: string) => {
    setFilter('unit', value)
    applyFilters()
  }

  const handleStatusToggle = (value: string[]) => {
    const isNotStartedActive = value.includes('notStarted')
    setFilter('status', isNotStartedActive ? 'Not Started' : 'All')
    applyFilters()
  }

  const handleWeakChapterToggle = (value: string[]) => {
    const isWeakChaptersActive = value.includes('weak')
    setFilter('showWeakChaptersOnly', isWeakChaptersActive)
    applyFilters()
  }

  const handleSortToggle = () => {
    const newSort = sortBy === 'chapter' ? 'progress' : 'chapter'
    setSortBy(newSort)
    applyFilters()
  }

  const uniqueClasses = getUniqueClasses()
  const uniqueUnits = getUniqueUnits(filters.subject === 'All' ? undefined : filters.subject)

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
      {/* Class Filter */}
      <Select value={filters.class} onValueChange={handleClassChange}>
        <SelectTrigger className="w-full lg:w-40">
          <SelectValue placeholder="Class" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Classes</SelectItem>
          {uniqueClasses.map((className) => (
            <SelectItem key={className} value={className}>
              {className}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Units Filter */}
      <Select value={filters.unit} onValueChange={handleUnitChange}>
        <SelectTrigger className="w-full lg:w-40">
          <SelectValue placeholder="Units" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Units</SelectItem>
          {uniqueUnits.map((unit) => (
            <SelectItem key={unit} value={unit}>
              {unit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status Toggle */}
      <ToggleGroup 
        type="multiple" 
        value={filters.status === 'Not Started' ? ['notStarted'] : []}
        onValueChange={handleStatusToggle}
        className="justify-start"
      >
        <ToggleGroupItem value="notStarted" className="text-sm">
          Not Started
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Weak Chapters Toggle */}
      <ToggleGroup 
        type="multiple" 
        value={filters.showWeakChaptersOnly ? ['weak'] : []}
        onValueChange={handleWeakChapterToggle}
        className="justify-start"
      >
        <ToggleGroupItem value="weak" className="text-sm">
          Weak Chapters
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Sort Toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleSortToggle}
        className="flex items-center gap-2"
      >
        Sort
        {sortBy === 'progress' ? (
          <ArrowDown className="h-4 w-4" />
        ) : (
          <ArrowUp className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
