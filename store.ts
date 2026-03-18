import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Student {
  id: string
  name: string
  fatherName: string
  class: string
  mobile: string
  address: string
  admissionDate: string
  totalFees: number
  paidFees: number
}

export interface WebsiteProfile {
  name: string
  shortName: string
  logoUrl: string
  phone: string
  email: string
  address: string
}

interface AppState {
  students: Student[]
  profile: WebsiteProfile
  addStudent: (student: Omit<Student, 'id' | 'totalFees' | 'paidFees'>) => void
  deleteStudent: (id: string) => void
  updateFees: (id: string, paidAmount: number) => void
  updateProfile: (profile: Partial<WebsiteProfile>) => void
}

const defaultProfile: WebsiteProfile = {
  name: 'Brilliant Coaching Classes',
  shortName: 'BCC',
  logoUrl: '',
  phone: '+91 98765 43210',
  email: 'info@brilliantcoaching.com',
  address: 'Main Street, Delhi',
}

const defaultStudents: Student[] = [
  {
    id: '1',
    name: 'Rahul Kumar',
    fatherName: 'Rajesh Kumar',
    class: '10th',
    mobile: '9876543210',
    address: '123 Main Street, Delhi',
    admissionDate: '2024-01-15',
    totalFees: 15000,
    paidFees: 10000,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    fatherName: 'Anil Sharma',
    class: '12th',
    mobile: '9876543211',
    address: '456 Park Road, Delhi',
    admissionDate: '2024-02-20',
    totalFees: 18000,
    paidFees: 18000,
  },
  {
    id: '3',
    name: 'Amit Singh',
    fatherName: 'Vijay Singh',
    class: '9th',
    mobile: '9876543212',
    address: '789 Lake View, Delhi',
    admissionDate: '2024-03-10',
    totalFees: 12000,
    paidFees: 5000,
  },
]

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      students: defaultStudents,
      profile: defaultProfile,
      addStudent: (student) =>
        set((state) => ({
          students: [
            ...state.students,
            {
              ...student,
              id: Date.now().toString(),
              totalFees: 15000,
              paidFees: 0,
            },
          ],
        })),
      deleteStudent: (id) =>
        set((state) => ({
          students: state.students.filter((s) => s.id !== id),
        })),
      updateFees: (id, paidAmount) =>
        set((state) => ({
          students: state.students.map((s) =>
            s.id === id ? { ...s, paidFees: Math.min(s.paidFees + paidAmount, s.totalFees) } : s
          ),
        })),
      updateProfile: (profile) =>
        set((state) => ({
          profile: { ...state.profile, ...profile },
        })),
    }),
    {
      name: 'brilliant-coaching-storage',
    }
  )
)
