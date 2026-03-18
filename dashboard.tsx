'use client'

import { useStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, UserCheck, IndianRupee, Clock, CalendarDays } from 'lucide-react'

export function Dashboard() {
  const students = useStore((state) => state.students)

  const totalStudents = students.length
  const activeStudents = students.filter((s) => s.paidFees > 0).length
  const totalFeesCollected = students.reduce((sum, s) => sum + s.paidFees, 0)
  const pendingFees = students.reduce((sum, s) => sum + (s.totalFees - s.paidFees), 0)
  
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  const thisMonthStudents = students.filter((s) => {
    const admissionMonth = new Date(s.admissionDate).getMonth()
    return admissionMonth === new Date().getMonth()
  })
  const thisMonthRevenue = thisMonthStudents.reduce((sum, s) => sum + s.paidFees, 0)

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      title: 'Active Students',
      value: activeStudents,
      icon: UserCheck,
      color: 'text-chart-4',
      bg: 'bg-chart-4/10',
    },
    {
      title: 'Total Collected',
      value: `₹${totalFeesCollected.toLocaleString()}`,
      icon: IndianRupee,
      color: 'text-chart-4',
      bg: 'bg-chart-4/10',
    },
    {
      title: 'Pending Fees',
      value: `₹${pendingFees.toLocaleString()}`,
      icon: Clock,
      color: 'text-destructive',
      bg: 'bg-destructive/10',
    },
    {
      title: `${currentMonth} Revenue`,
      value: `₹${thisMonthRevenue.toLocaleString()}`,
      icon: CalendarDays,
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
  ]

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
