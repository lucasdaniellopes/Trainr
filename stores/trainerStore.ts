import { create } from 'zustand';

export interface Trainer {
  id: string;
  name: string;
  profile_photo?: string;
  bio: string;
  specialties: string[];
  experience_years: number;
  hourly_rate: number;
  rating_average: number;
  total_sessions: number;
  is_verified: boolean;
  latitude: number;
  longitude: number;
  distance?: number;
  available_locations: string[];
  certifications: string[];
}

export interface TrainerFilters {
  specialties: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  maxDistance: number;
  availability: string[];
}

interface TrainerStore {
  trainers: Trainer[];
  filters: TrainerFilters;
  searchQuery: string;
  selectedTrainer: Trainer | null;
  isLoading: boolean;
  setTrainers: (trainers: Trainer[]) => void;
  setFilters: (filters: Partial<TrainerFilters>) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTrainer: (trainer: Trainer | null) => void;
  setLoading: (loading: boolean) => void;
  getFilteredTrainers: () => Trainer[];
}

export const useTrainerStore = create<TrainerStore>()((set, get) => ({
  trainers: [],
  filters: {
    specialties: [],
    minPrice: 0,
    maxPrice: 500,
    minRating: 0,
    maxDistance: 50,
    availability: []
  },
  searchQuery: '',
  selectedTrainer: null,
  isLoading: false,

  setTrainers: (trainers) => set({ trainers }),
  setFilters: (filters) => set(state => ({ 
    filters: { ...state.filters, ...filters } 
  })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedTrainer: (trainer) => set({ selectedTrainer: trainer }),
  setLoading: (loading) => set({ isLoading: loading }),

  getFilteredTrainers: () => {
    const { trainers, filters, searchQuery } = get();
    
    return trainers.filter(trainer => {
      // Search query filter
      if (searchQuery && !trainer.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Price filter
      if (trainer.hourly_rate < filters.minPrice || trainer.hourly_rate > filters.maxPrice) {
        return false;
      }
      
      // Rating filter
      if (trainer.rating_average < filters.minRating) {
        return false;
      }
      
      // Distance filter
      if (trainer.distance && trainer.distance > filters.maxDistance) {
        return false;
      }
      
      // Specialties filter
      if (filters.specialties.length > 0 && 
          !filters.specialties.some(spec => trainer.specialties.includes(spec))) {
        return false;
      }
      
      return true;
    });
  }
}));