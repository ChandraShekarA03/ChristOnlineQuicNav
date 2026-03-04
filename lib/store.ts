import { create } from 'zustand'

interface User {
  id: string
  name?: string
  email: string
  role: string
  department?: string
}

interface AppState {
  user: User | null
  links: any[]
  lmsModules: any[]
  analytics: any
  setUser: (user: User | null) => void
  setLinks: (links: any[]) => void
  setLmsModules: (modules: any[]) => void
  setAnalytics: (analytics: any) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  links: [],
  lmsModules: [],
  analytics: {},
  setUser: (user) => set({ user }),
  setLinks: (links) => set({ links }),
  setLmsModules: (lmsModules) => set({ lmsModules }),
  setAnalytics: (analytics) => set({ analytics }),
}))