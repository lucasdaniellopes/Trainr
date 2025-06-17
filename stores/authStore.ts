import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export interface User {
  id: string;
  email: string;
  type: 'client' | 'trainer';
  profile: ClientProfile | TrainerProfile;
  created_at: string;
  status: 'active' | 'suspended' | 'pending_verification';
}

export interface ClientProfile {
  user_id: string;
  name: string;
  phone: string;
  birth_date?: string;
  gender?: 'M' | 'F' | 'Other';
  profile_photo?: string;
  fitness_goals: string[];
  medical_restrictions?: string;
  preferred_locations: string[];
  emergency_contact?: string;
}

export interface TrainerProfile {
  user_id: string;
  name: string;
  phone: string;
  profile_photo?: string;
  bio: string;
  specialties: string[];
  certifications: Certification[];
  experience_years: number;
  hourly_rate: number;
  service_radius_km: number;
  available_locations: string[];
  rating_average: number;
  total_sessions: number;
  is_verified: boolean;
  background_check_status: string;
}

export interface Certification {
  id: string;
  trainer_id: string;
  name: string;
  institution: string;
  issue_date: string;
  expiry_date: string;
  document_url?: string;
  verified: boolean;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  userType: 'client' | 'trainer' | null;
  isLoading: boolean;
  login: (userData: User, authToken: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

const storage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(key);
      } else {
        return await SecureStore.getItemAsync(key);
      }
    } catch (error) {
      console.error('Storage getItem error:', error);
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch (error) {
      console.error('Storage setItem error:', error);
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error('Storage removeItem error:', error);
    }
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      userType: null,
      isLoading: false,
      
      login: (userData, authToken) => set({
        user: userData,
        token: authToken,
        isAuthenticated: true,
        userType: userData.type,
        isLoading: false
      }),
      
      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
        userType: null,
        isLoading: false
      }),
      
      updateUser: (updates) => set(state => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),

      setLoading: (loading) => set({ isLoading: loading })
    }),
    {
      name: 'fitconnect-auth',
      storage: createJSONStorage(() => storage)
    }
  )
);