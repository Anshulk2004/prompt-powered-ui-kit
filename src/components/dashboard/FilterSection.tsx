
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAppStore } from '@/store/useAppStore'
import { ArrowUp, ArrowDown, ChevronDown, Filter } from 'lucide-react'
import { useState } from 'react'

export const FilterSection = () => {
  const { 
    filters, 
    sortBy,
    sortOrder,
    setFilter, 
    setSortBy,
    toggleSortOrder,
    applyFilters,
    resetFilters,
    getUniqueClasses,
    getUniqueUnits
  } = useAppStore()

  const [isClassOpen, setIsClassOpen] = useState(false)
  const [isUnitOpen, setIsUnitOpen] = useState(false)

  const uniqueClasses = getUniqueClasses()
  const uniqueUnits = getUniqueUnits(filters.subject === 'All' ? undefined : filters.subject)

  const handleClassChange = (className: string, checked: boolean) => {
    const newClasses = checked 
      ? [...filters.classes, className]
      : filters.classes.filter(c => c !== className)
    setFilter('classes', newClasses)
    applyFilters()
  }

  const handleUnitChange = (unitName: string, checked: boolean) => {
    const newUnits = checked 
      ? [...filters.units, unitName]
      : filters.units.filter(u => u !== unitName)
    setFilter('units', newUnits)
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
    if (sortBy === 'chapter') {
      setSortBy('progress')
    } else {
      toggleSortOrder()
    }
    applyFilters()
  }

  const handleResetFilters = () => {
    resetFilters()
    applyFilters()
  }

  return (
    <div className="space-y-4">
      {/* Desktop Filter Layout */}
      <div className="hidden lg:flex lg:flex-row gap-4 items-center">
        {/* Class Filter */}
        <Popover open={isClassOpen} onOpenChange={setIsClassOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-40 justify-between">
              {filters.classes.length > 0 
                ? `Classes (${filters.classes.length})`
                : "All Classes"
              }
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-2">
            <div className="space-y-2">
              {uniqueClasses.map((className) => (
                <div key={className} className="flex items-center space-x-2">
                  <Checkbox
                    id={className}
                    checked={filters.classes.includes(className)}
                    onCheckedChange={(checked) => handleClassChange(className, checked as boolean)}
                  />
                  <label htmlFor={className} className="text-sm font-medium">
                    {className}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Units Filter */}
        <Popover open={isUnitOpen} onOpenChange={setIsUnitOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-40 justify-between">
              {filters.units.length > 0 
                ? `Units (${filters.units.length})`
                : "All Units"
              }
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-2">
            <div className="space-y-2">
              {uniqueUnits.map((unit) => (
                <div key={unit} className="flex items-center space-x-2">
                  <Checkbox
                    id={unit}
                    checked={filters.units.includes(unit)}
                    onCheckedChange={(checked) => handleUnitChange(unit, checked as boolean)}
                  />
                  <label htmlFor={unit} className="text-sm font-medium">
                    {unit}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

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
          <ToggleGroupItem value="weak" className="text-sm text-orange-600">
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
          Sort: {sortBy === 'progress' ? 'Progress' : 'Name'}
          {sortOrder === 'desc' ? (
            <ArrowDown className="h-4 w-4" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </Button>

        {/* Reset Filters */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleResetFilters}
          className="text-muted-foreground"
        >
          Reset
        </Button>
      </div>

      {/* Mobile Filter Layout */}
      <div className="lg:hidden space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {/* Class Filter Mobile */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="justify-between text-xs">
                {filters.classes.length > 0 
                  ? `Classes (${filters.classes.length})`
                  : "Classes"
                }
                <ChevronDown className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2">
              <div className="space-y-2">
                {uniqueClasses.map((className) => (
                  <div key={className} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mobile-${className}`}
                      checked={filters.classes.includes(className)}
                      onCheckedChange={(checked) => handleClassChange(className, checked as boolean)}
                    />
                    <label htmlFor={`mobile-${className}`} className="text-sm">
                      {className}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Units Filter Mobile */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="justify-between text-xs">
                {filters.units.length > 0 
                  ? `Units (${filters.units.length})`
                  : "Units"
                }
                <ChevronDown className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-2">
              <div className="space-y-2">
                {uniqueUnits.map((unit) => (
                  <div key={unit} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mobile-${unit}`}
                      checked={filters.units.includes(unit)}
                      onCheckedChange={(checked) => handleUnitChange(unit, checked as boolean)}
                    />
                    <label htmlFor={`mobile-${unit}`} className="text-sm">
                      {unit}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex gap-2 flex-wrap">
          {/* Mobile Toggles */}
          <ToggleGroup 
            type="multiple" 
            value={filters.status === 'Not Started' ? ['notStarted'] : []}
            onValueChange={handleStatusToggle}
            size="sm"
          >
            <ToggleGroupItem value="notStarted" className="text-xs">
              Not Started
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup 
            type="multiple" 
            value={filters.showWeakChaptersOnly ? ['weak'] : []}
            onValueChange={handleWeakChapterToggle}
            size="sm"
          >
            <ToggleGroupItem value="weak" className="text-xs text-orange-600">
              Weak
            </ToggleGroupItem>
          </ToggleGroup>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSortToggle}
            className="flex items-center gap-1 text-xs"
          >
            {sortBy === 'progress' ? 'Progress' : 'Name'}
            {sortOrder === 'desc' ? (
              <ArrowDown className="h-3 w-3" />
            ) : (
              <ArrowUp className="h-3 w-3" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetFilters}
            className="text-xs text-muted-foreground"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
