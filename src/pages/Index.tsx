
import { MainLayout } from '@/components/layout/MainLayout'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppStore } from '@/store/useAppStore'
import { Loader2, Rocket, Settings, Users } from 'lucide-react'

const Index = () => {
  const { isLoading, setLoading, user, setUser } = useAppStore()

  const simulateLoading = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  const simulateLogin = () => {
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    })
  }

  const features = [
    {
      icon: Rocket,
      title: 'Feature 1',
      description: 'Ready to implement your first feature'
    },
    {
      icon: Users,
      title: 'Feature 2', 
      description: 'User management and authentication'
    },
    {
      icon: Settings,
      title: 'Feature 3',
      description: 'Configuration and settings'
    }
  ]

  return (
    <>
      <Header />
      <MainLayout>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Your Web Application
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with React, Vite, Tailwind CSS, shadcn/ui, and Zustand. 
              Ready for your next feature implementation.
            </p>
          </div>

          {/* Demo Section */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Zustand State Management Demo</CardTitle>
              <CardDescription>
                Test the global state management with these interactive buttons
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={simulateLoading}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isLoading ? 'Loading...' : 'Test Loading State'}
                </Button>
                
                <Button 
                  onClick={simulateLogin}
                  variant="outline"
                  disabled={!!user}
                >
                  {user ? 'Already Logged In' : 'Simulate Login'}
                </Button>
              </div>
              
              {user && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">
                    <strong>User State:</strong> {user.name} ({user.email})
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Ready for Your Next Feature</CardTitle>
              <CardDescription>
                Your project is now set up with a clean architecture. Ready to implement your next feature!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">✅ Completed Setup:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• React + Vite + TypeScript</li>
                    <li>• Tailwind CSS + shadcn/ui</li>
                    <li>• Zustand state management</li>
                    <li>• Responsive layout structure</li>
                    <li>• Theme switching</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🚀 Ready to Add:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Your specific features</li>
                    <li>• API integrations</li>
                    <li>• Authentication flow</li>
                    <li>• Database connections</li>
                    <li>• Custom components</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </>
  )
}

export default Index
