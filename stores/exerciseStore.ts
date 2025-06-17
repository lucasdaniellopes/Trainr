import { create } from 'zustand';
import { Exercise, Workout, WorkoutSession, ExerciseCategory, MuscleGroup, Equipment, Difficulty } from '@/types/exercise';

interface ExerciseStore {
  exercises: Exercise[];
  workouts: Workout[];
  sessions: WorkoutSession[];
  
  categoryFilter: ExerciseCategory | 'all';
  muscleGroupFilter: MuscleGroup | 'all';
  equipmentFilter: Equipment | 'all';
  difficultyFilter: Difficulty | 'all';
  
  setExercises: (exercises: Exercise[]) => void;
  setWorkouts: (workouts: Workout[]) => void;
  setSessions: (sessions: WorkoutSession[]) => void;
  
  addCustomExercise: (exercise: Omit<Exercise, 'id' | 'created_at'>) => void;
  getExerciseById: (id: string) => Exercise | undefined;
  getFilteredExercises: () => Exercise[];
  
  createWorkout: (workout: Omit<Workout, 'id' | 'created_at' | 'updated_at'>) => void;
  updateWorkout: (id: string, updates: Partial<Workout>) => void;
  deleteWorkout: (id: string) => void;
  getWorkoutById: (id: string) => Workout | undefined;
  
  startWorkoutSession: (workoutId: string, userId: string, trainerId?: string) => string;
  completeWorkoutSession: (sessionId: string) => void;
  
  setCategoryFilter: (category: ExerciseCategory | 'all') => void;
  setMuscleGroupFilter: (muscleGroup: MuscleGroup | 'all') => void;
  setEquipmentFilter: (equipment: Equipment | 'all') => void;
  setDifficultyFilter: (difficulty: Difficulty | 'all') => void;
  clearFilters: () => void;
}

const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Push-ups',
    description: 'Classic bodyweight exercise for chest, shoulders, and triceps',
    category: 'strength',
    muscle_groups: ['chest', 'shoulders', 'triceps'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: [
      'Start in a plank position with hands slightly wider than shoulders',
      'Lower your body until chest nearly touches the floor',
      'Push back up to starting position',
      'Keep your body in a straight line throughout'
    ],
    tips: [
      'Keep your core engaged',
      'Don\'t let your hips sag',
      'Control the movement both up and down'
    ],
    image_url: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=400',
    is_custom: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Squats',
    description: 'Fundamental lower body exercise targeting quads, glutes, and hamstrings',
    category: 'strength',
    muscle_groups: ['quadriceps', 'glutes', 'hamstrings'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body by bending knees and hips',
      'Go down until thighs are parallel to floor',
      'Push through heels to return to standing'
    ],
    tips: [
      'Keep your chest up',
      'Don\'t let knees cave inward',
      'Weight should be on your heels'
    ],
    image_url: 'https://images.pexels.com/photos/4944559/pexels-photo-4944559.jpeg?auto=compress&cs=tinysrgb&w=400',
    is_custom: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Deadlifts',
    description: 'Compound exercise targeting posterior chain muscles',
    category: 'strength',
    muscle_groups: ['back', 'glutes', 'hamstrings'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
    instructions: [
      'Stand with feet hip-width apart, bar over mid-foot',
      'Bend at hips and knees to grip the bar',
      'Keep chest up and back straight',
      'Drive through heels to lift the bar',
      'Stand tall, then lower bar with control'
    ],
    tips: [
      'Keep the bar close to your body',
      'Engage your lats',
      'Don\'t round your back'
    ],
    image_url: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
    is_custom: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Plank',
    description: 'Isometric core strengthening exercise',
    category: 'strength',
    muscle_groups: ['abs', 'back', 'shoulders'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: [
      'Start in push-up position',
      'Lower to forearms, keeping elbows under shoulders',
      'Keep body in straight line from head to heels',
      'Hold position for desired time'
    ],
    tips: [
      'Don\'t let hips sag or pike up',
      'Breathe normally',
      'Engage your core throughout'
    ],
    image_url: 'https://images.pexels.com/photos/3837789/pexels-photo-3837789.jpeg?auto=compress&cs=tinysrgb&w=400',
    is_custom: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Burpees',
    description: 'High-intensity full-body exercise combining strength and cardio',
    category: 'functional',
    muscle_groups: ['full_body'],
    equipment: ['bodyweight'],
    difficulty: 'intermediate',
    instructions: [
      'Start standing, then drop into squat position',
      'Place hands on floor and jump feet back to plank',
      'Do a push-up (optional)',
      'Jump feet back to squat position',
      'Explode up with arms overhead'
    ],
    tips: [
      'Land softly on your feet',
      'Keep movements controlled',
      'Modify as needed for fitness level'
    ],
    image_url: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400',
    is_custom: false,
    created_at: new Date().toISOString(),
  },
];

const mockWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Beginner Full Body',
    description: 'Perfect starter workout targeting all major muscle groups',
    type: 'strength',
    duration_minutes: 30,
    difficulty: 'beginner',
    exercises: [
      {
        exercise: mockExercises[0], // Push-ups
        sets: 3,
        reps: 10,
        rest_time: 60,
        order: 1,
      },
      {
        exercise: mockExercises[1], // Squats
        sets: 3,
        reps: 15,
        rest_time: 60,
        order: 2,
      },
      {
        exercise: mockExercises[3], // Plank
        sets: 3,
        duration: 30,
        rest_time: 60,
        order: 3,
      },
    ],
    is_template: true,
    is_custom: false,
    tags: ['full-body', 'beginner', 'bodyweight'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'HIIT Cardio Blast',
    description: 'High-intensity interval training for maximum calorie burn',
    type: 'hiit',
    duration_minutes: 20,
    difficulty: 'intermediate',
    exercises: [
      {
        exercise: mockExercises[4], // Burpees
        sets: 4,
        reps: 8,
        rest_time: 30,
        order: 1,
      },
      {
        exercise: mockExercises[1], // Squats
        sets: 4,
        reps: 20,
        rest_time: 30,
        order: 2,
      },
      {
        exercise: mockExercises[0], // Push-ups
        sets: 4,
        reps: 12,
        rest_time: 30,
        order: 3,
      },
    ],
    is_template: true,
    is_custom: false,
    tags: ['hiit', 'cardio', 'fat-loss'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const useExerciseStore = create<ExerciseStore>((set, get) => ({
  exercises: mockExercises,
  workouts: mockWorkouts,
  sessions: [],
  
  categoryFilter: 'all',
  muscleGroupFilter: 'all',
  equipmentFilter: 'all',
  difficultyFilter: 'all',
  
  setExercises: (exercises) => set({ exercises }),
  setWorkouts: (workouts) => set({ workouts }),
  setSessions: (sessions) => set({ sessions }),
  
  addCustomExercise: (exerciseData) => {
    const newExercise: Exercise = {
      ...exerciseData,
      id: Date.now().toString(),
      is_custom: true,
      created_at: new Date().toISOString(),
    };
    
    set((state) => ({
      exercises: [...state.exercises, newExercise],
    }));
  },
  
  getExerciseById: (id) => {
    return get().exercises.find(exercise => exercise.id === id);
  },
  
  getFilteredExercises: () => {
    const { exercises, categoryFilter, muscleGroupFilter, equipmentFilter, difficultyFilter } = get();
    
    return exercises.filter(exercise => {
      if (categoryFilter !== 'all' && exercise.category !== categoryFilter) return false;
      if (muscleGroupFilter !== 'all' && !exercise.muscle_groups.includes(muscleGroupFilter)) return false;
      if (equipmentFilter !== 'all' && !exercise.equipment.includes(equipmentFilter)) return false;
      if (difficultyFilter !== 'all' && exercise.difficulty !== difficultyFilter) return false;
      return true;
    });
  },
  
  createWorkout: (workoutData) => {
    const newWorkout: Workout = {
      ...workoutData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    set((state) => ({
      workouts: [...state.workouts, newWorkout],
    }));
  },
  
  updateWorkout: (id, updates) => {
    set((state) => ({
      workouts: state.workouts.map(workout =>
        workout.id === id
          ? { ...workout, ...updates, updated_at: new Date().toISOString() }
          : workout
      ),
    }));
  },
  
  deleteWorkout: (id) => {
    set((state) => ({
      workouts: state.workouts.filter(workout => workout.id !== id),
    }));
  },
  
  getWorkoutById: (id) => {
    return get().workouts.find(workout => workout.id === id);
  },
  
  startWorkoutSession: (workoutId, userId, trainerId) => {
    const workout = get().getWorkoutById(workoutId);
    if (!workout) throw new Error('Workout not found');
    
    const sessionId = Date.now().toString();
    const newSession: WorkoutSession = {
      id: sessionId,
      workout,
      user_id: userId,
      trainer_id: trainerId,
      started_at: new Date().toISOString(),
      status: 'in_progress',
      exercise_logs: [],
    };
    
    set((state) => ({
      sessions: [...state.sessions, newSession],
    }));
    
    return sessionId;
  },
  
  completeWorkoutSession: (sessionId) => {
    set((state) => ({
      sessions: state.sessions.map(session =>
        session.id === sessionId
          ? { 
              ...session, 
              status: 'completed' as const,
              completed_at: new Date().toISOString()
            }
          : session
      ),
    }));
  },
  
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  setMuscleGroupFilter: (muscleGroup) => set({ muscleGroupFilter: muscleGroup }),
  setEquipmentFilter: (equipment) => set({ equipmentFilter: equipment }),
  setDifficultyFilter: (difficulty) => set({ difficultyFilter: difficulty }),
  clearFilters: () => set({
    categoryFilter: 'all',
    muscleGroupFilter: 'all',
    equipmentFilter: 'all',
    difficultyFilter: 'all',
  }),
}));