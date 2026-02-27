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
  llmModules: any[]
  analytics: any
  setUser: (user: User | null) => void
  setLinks: (links: any[]) => void
  setLLMModules: (modules: any[]) => void
  setAnalytics: (analytics: any) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  links: [],
  llmModules: [],
  analytics: {},
  setUser: (user) => set({ user }),
  setLinks: (links) => set({ links }),
  setLLMModules: (llmModules) => set({ llmModules }),
  setAnalytics: (analytics) => set({ analytics }),
}))