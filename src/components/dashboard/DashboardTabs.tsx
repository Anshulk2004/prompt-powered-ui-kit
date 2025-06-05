
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useAppStore } from '@/store/useAppStore'

export const DashboardTabs = () => {
  const { filters, setFilter, applyFilters } = useAppStore()

  const handleSubjectChange = (subject: string) => {
    setFilter('subject', subject)
    setFilter('unit', 'All') // Reset unit filter when subject changes
    applyFilters()
  }

  return (
    <Tabs value={filters.subject} onValueChange={handleSubjectChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
        <TabsTrigger value="Physics" className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="hidden sm:inline">Physics PYQs</span>
          <span className="sm:hidden">Phy</span>
        </TabsTrigger>
        <TabsTrigger value="Chemistry" className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="hidden sm:inline">Chemistry PYQs</span>
          <span className="sm:hidden">Chem</span>
        </TabsTrigger>
        <TabsTrigger value="Mathematics" className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="hidden sm:inline">Mathematics PYQs</span>
          <span className="sm:hidden">Math</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="Physics" className="mt-6">
        <p className="text-sm text-muted-foreground">Chapter-wise Collection of Physics PYQs</p>
      </TabsContent>
      <TabsContent value="Chemistry" className="mt-6">
        <p className="text-sm text-muted-foreground">Chapter-wise Collection of Chemistry PYQs</p>
      </TabsContent>
      <TabsContent value="Mathematics" className="mt-6">
        <p className="text-sm text-muted-foreground">Chapter-wise Collection of Mathematics PYQs</p>
      </TabsContent>
    </Tabs>
  )
}
