'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { GraduationCap, Phone, Mail } from 'lucide-react'

interface SplashScreenProps {
  onEnter: () => void
}

const motivationalQuotes = [
  { text: "Education is the passport to the future.", author: "Malcolm X" },
  { text: "The beautiful thing about learning is nobody can take it away from you.", author: "B.B. King" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Learning is not attained by chance, it must be sought for with ardor.", author: "Abigail Adams" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
]

export function SplashScreen({ onEnter }: SplashScreenProps) {
  const profile = useStore((state) => state.profile)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [quote, setQuote] = useState<typeof motivationalQuotes[0] | null>(null)

  useEffect(() => {
    setMounted(true)
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)])
  }, [])

  const handleEnter = () => {
    setIsLoading(true)
    setTimeout(() => {
      onEnter()
    }, 2500)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center">
        <div className="animate-pulse">
          <GraduationCap className="w-24 h-24 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-primary-foreground mt-6 animate-pulse">
          Loading...
        </h1>
        <div className="mt-8 flex gap-2">
          <div className="w-3 h-3 bg-primary-foreground/80 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-primary-foreground/80 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-primary-foreground/80 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-2">
          {profile.logoUrl ? (
            <img src={profile.logoUrl} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <GraduationCap className="w-8 h-8 text-primary" />
          )}
          <span className="font-semibold text-foreground">{profile.shortName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <a 
            href={`tel:${profile.phone.replace(/\s/g, '')}`} 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            title={`Call ${profile.phone}`}
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">{profile.phone}</span>
          </a>
          <a 
            href={`mailto:${profile.email}`} 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            title={`Email ${profile.email}`}
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">{profile.email}</span>
          </a>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden">
            {profile.logoUrl ? (
              <img src={profile.logoUrl} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <GraduationCap className="w-14 h-14 text-primary-foreground" />
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 text-balance">
            {profile.name}
          </h1>
          <p className="text-muted-foreground mb-6">
            Student & Fees Management System
          </p>
          <div className="bg-muted/50 rounded-lg p-4 mb-8 max-w-md mx-auto min-h-[76px]">
            {quote && (
              <>
                <p className="text-foreground italic text-sm sm:text-base">"{quote.text}"</p>
                <p className="text-muted-foreground text-xs mt-2">— {quote.author}</p>
              </>
            )}
          </div>
          <Button size="lg" onClick={handleEnter} className="px-8">
            Enter App
          </Button>
        </div>
      </main>

      <footer className="p-4 text-center text-sm text-muted-foreground border-t bg-card">
        {profile.name} - Excellence in Education
      </footer>
    </div>
  )
}
