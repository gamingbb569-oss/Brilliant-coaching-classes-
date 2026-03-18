'use client'

import { useState } from 'react'
import { SplashScreen } from '@/components/splash-screen'
import { Dashboard } from '@/components/dashboard'
import { AdmissionForm } from '@/components/admission-form'
import { FeesManagement } from '@/components/fees-management'
import { StudentList } from '@/components/student-list'
import { ProfileSettings } from '@/components/profile-settings'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  GraduationCap,
  Menu,
  Home,
  UserPlus,
  IndianRupee,
  Users,
  Settings,
  LogOut,
} from 'lucide-react'

type Page = 'dashboard' | 'admission' | 'fees' | 'students' | 'profile'

export default function App() {
  const profile = useStore((state) => state.profile)
  const [showSplash, setShowSplash] = useState(true)
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const [menuOpen, setMenuOpen] = useState(false)

  const navigateTo = (page: Page) => {
    setCurrentPage(page)
    setMenuOpen(false)
  }

  if (showSplash) {
    return <SplashScreen onEnter={() => setShowSplash(false)} />
  }

  const menuItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
    { id: 'admission' as const, label: 'Admission Form', icon: UserPlus },
    { id: 'fees' as const, label: 'Fees Management', icon: IndianRupee },
    { id: 'students' as const, label: 'Student List', icon: Users },
    { id: 'profile' as const, label: 'Profile Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0" title="Navigation Menu">
                <div className="p-4 border-b bg-primary">
                  <div className="flex items-center gap-2 text-primary-foreground">
                    {profile.logoUrl ? (
                      <img src={profile.logoUrl} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <GraduationCap className="w-8 h-8" />
                    )}
                    <span className="font-bold">{profile.shortName}</span>
                  </div>
                </div>
                <nav className="p-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigateTo(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        currentPage === item.id
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
              {profile.logoUrl ? (
                <img src={profile.logoUrl} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <GraduationCap className="w-8 h-8 text-primary" />
              )}
              <span className="font-bold text-foreground hidden sm:inline">
                {profile.name}
              </span>
              <span className="font-bold text-foreground sm:hidden">{profile.shortName}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSplash(true)}
            className="text-muted-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden lg:block w-64 min-h-[calc(100vh-65px)] bg-card border-r">
          <nav className="p-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  currentPage === item.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 min-h-[calc(100vh-65px)]">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'admission' && (
            <AdmissionForm onBack={() => setCurrentPage('dashboard')} />
          )}
          {currentPage === 'fees' && (
            <FeesManagement onBack={() => setCurrentPage('dashboard')} />
          )}
          {currentPage === 'students' && (
            <StudentList onBack={() => setCurrentPage('dashboard')} />
          )}
          {currentPage === 'profile' && (
            <ProfileSettings onBack={() => setCurrentPage('dashboard')} />
          )}
        </main>
      </div>
    </div>
  )
}
