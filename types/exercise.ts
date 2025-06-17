export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: ExerciseCategory;
  muscle_groups: MuscleGroup[];
  equipment: Equipment[];
  difficulty: Difficulty;
  instructions: string[];
  tips: string[];
  image_url?: string;
  video_url?: string;
  is_custom: boolean;
  created_by?: string; // trainer ID for custom exercises
  created_at: string;
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: number;
  reps?: number;
  duration?: number; // in seconds for time-based exercises
  weight?: number;
  rest_time?: number; // in seconds
  notes?: string;
  order: number;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  type: WorkoutType;
  duration_minutes: number;
  difficulty: Difficulty;
  exercises: WorkoutExercise[];
  is_template: boolean;
  is_custom: boolean;
  created_by?: string; // trainer ID
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface WorkoutSession {
  id: string;
  workout: Workout;
  user_id: string;
  trainer_id?: string;
  started_at: string;
  completed_at?: string;
  status: SessionStatus;
  exercise_logs: ExerciseLog[];
  notes?: string;
  rating?: number;
}

export interface ExerciseLog {
  exercise_id: string;
  sets_completed: SetLog[];
  notes?: string;
}

export interface SetLog {
  set_number: number;
  reps?: number;
  weight?: number;
  duration?: number;
  completed: boolean;
  rpe?: number; // Rate of Perceived Exertion (1-10)
}

export type ExerciseCategory = 
  | 'strength'
  | 'cardio'
  | 'flexibility'
  | 'balance'
  | 'functional'
  | 'plyometric'
  | 'rehabilitation';

export type MuscleGroup = 
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'abs'
  | 'obliques'
  | 'glutes'
  | 'quadriceps'
  | 'hamstrings'
  | 'calves'
  | 'full_body';

export type Equipment = 
  | 'bodyweight'
  | 'dumbbells'
  | 'barbell'
  | 'kettlebell'
  | 'resistance_bands'
  | 'pull_up_bar'
  | 'bench'
  | 'cable_machine'
  | 'smith_machine'
  | 'leg_press'
  | 'treadmill'
  | 'stationary_bike'
  | 'elliptical'
  | 'yoga_mat'
  | 'foam_roller'
  | 'medicine_ball'
  | 'suspension_trainer';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type WorkoutType = 
  | 'strength'
  | 'cardio'
  | 'hiit'
  | 'circuit'
  | 'yoga'
  | 'pilates'
  | 'stretching'
  | 'custom';

export type SessionStatus = 
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'missed';