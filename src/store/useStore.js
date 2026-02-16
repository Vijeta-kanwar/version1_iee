import { create } from 'zustand'

export const useStore = create((set) => ({
  user: {
    id: '1',
    name: 'You',
    year: 2,
    branch: 'CSE',
    skills: ['React', 'Python', 'Machine Learning'],
    interests: ['AI', 'Web Dev', 'Robotics'],
    vibeScore: 75
  },
  events: [],
  members: [],
  echoPosts: [],
  
  setUser: (user) => set({ user }),
  setEvents: (events) => set({ events }),
  setMembers: (members) => set({ members }),
  addEchoPost: (post) => set((state) => ({ 
    echoPosts: [...state.echoPosts, post] 
  })),
  
  updateVibeScore: (delta) => set((state) => ({
    user: { 
      ...state.user, 
      vibeScore: Math.min(100, Math.max(0, state.user.vibeScore + delta))
    }
  }))
}))