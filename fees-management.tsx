'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, IndianRupee, CheckCircle, Clock, Trash2, Search } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface FeesManagementProps {
  onBack: () => void
}

export function FeesManagement({ onBack }: FeesManagementProps) {
  const students = useStore((state) => state.students)
  const updateFees = useStore((state) => state.updateFees)
  const deleteStudent = useStore((state) => state.deleteStudent)
  const [paymentAmount, setPaymentAmount] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.class.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handlePayment = () => {
    if (selectedStudent && paymentAmount) {
      updateFees(selectedStudent, Number(paymentAmount))
      setPaymentAmount('')
      setSelectedStudent(null)
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-foreground">Fees Management</h2>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2 text-primary">
              <IndianRupee className="w-5 h-5" />
              Student Fees Record
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Student</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Class</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Total</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Paid</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Pending</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => {
                  const pending = student.totalFees - student.paidFees
                  const isPaid = pending === 0
                  return (
                    <tr key={student.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-2 text-sm font-medium text-foreground">{student.name}</td>
                      <td className="py-3 px-2 text-sm text-muted-foreground">{student.class}</td>
                      <td className="py-3 px-2 text-sm text-right text-foreground">₹{student.totalFees.toLocaleString()}</td>
                      <td className="py-3 px-2 text-sm text-right text-chart-4">₹{student.paidFees.toLocaleString()}</td>
                      <td className="py-3 px-2 text-sm text-right text-destructive">₹{pending.toLocaleString()}</td>
                      <td className="py-3 px-2 text-center">
                        {isPaid ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-chart-4/10 text-chart-4 text-xs font-medium rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded-full">
                            <Clock className="w-3 h-3" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center justify-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={isPaid}
                                onClick={() => setSelectedStudent(student.id)}
                              >
                                Update
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Record Payment - {student.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 pt-4">
                                <div className="text-sm text-muted-foreground">
                                  Pending: <span className="font-medium text-destructive">₹{pending.toLocaleString()}</span>
                                </div>
                                <Input
                                  type="number"
                                  placeholder="Enter amount"
                                  value={paymentAmount}
                                  onChange={(e) => setPaymentAmount(e.target.value)}
                                  max={pending}
                                />
                                <Button onClick={handlePayment} className="w-full">
                                  Record Payment
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Student</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {student.name}? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteStudent(student.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
