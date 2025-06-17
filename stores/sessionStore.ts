import { create } from 'zustand';

export interface Session {
  id: string;
  client_id: string;
  trainer_id: string;
  trainer_name: string;
  trainer_photo?: string;
  date: string;
  time: string;
  duration_minutes: number;
  location: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  payment_status: 'pending' | 'paid' | 'refunded';
  client_notes?: string;
  trainer_notes?: string;
  created_at: string;
}

interface SessionStore {
  sessions: Session[];
  selectedSession: Session | null;
  isLoading: boolean;
  setSessions: (sessions: Session[]) => void;
  addSession: (session: Session) => void;
  updateSession: (id: string, updates: Partial<Session>) => void;
  setSelectedSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  getUpcomingSessions: () => Session[];
  getCompletedSessions: () => Session[];
}

export const useSessionStore = create<SessionStore>()((set, get) => ({
  sessions: [],
  selectedSession: null,
  isLoading: false,

  setSessions: (sessions) => set({ sessions }),
  
  addSession: (session) => set(state => ({ 
    sessions: [...state.sessions, session] 
  })),
  
  updateSession: (id, updates) => set(state => ({
    sessions: state.sessions.map(session => 
      session.id === id ? { ...session, ...updates } : session
    )
  })),
  
  setSelectedSession: (session) => set({ selectedSession: session }),
  setLoading: (loading) => set({ isLoading: loading }),

  getUpcomingSessions: () => {
    const { sessions } = get();
    const now = new Date();
    return sessions.filter(session => {
      const sessionDate = new Date(`${session.date}T${session.time}`);
      return sessionDate > now && session.status !== 'cancelled';
    }).sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());
  },

  getCompletedSessions: () => {
    const { sessions } = get();
    return sessions.filter(session => session.status === 'completed')
      .sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime());
  }
}));