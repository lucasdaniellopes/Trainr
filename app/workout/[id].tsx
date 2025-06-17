import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useExerciseStore } from '@/stores/exerciseStore';
import { 
  ArrowLeft, 
  Clock, 
  Target, 
  Users, 
  Play, 
  Pause, 
  RotateCcw,
  Check,
  Info,
  Star
} from 'lucide-react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows, iconSizes } from '@/constants/theme';

export default function WorkoutDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { workouts, exercises } = useExerciseStore();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [showExerciseDetails, setShowExerciseDetails] = useState(false);

  const workout = workouts.find(w => w.id === id);
  
  if (!workout) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Treino não encontrado</Text>
      </SafeAreaView>
    );
  }

  const currentExercise = workout.exercises[currentExerciseIndex];
  const exerciseDetails = currentExercise?.exercise;

  const handleNextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const handleCompleteExercise = () => {
    const exerciseId = currentExercise.exercise.id;
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises([...completedExercises, exerciseId]);
    }
    handleNextExercise();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return colors.status.success;
      case 'intermediate': return colors.status.warning;
      case 'advanced': return colors.status.error;
      default: return colors.primary;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors.gradients.primary}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <ArrowLeft size={iconSizes.md} color={colors.text.inverse} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.infoButton}
                onPress={() => setShowExerciseDetails(true)}
              >
                <Info size={iconSizes.md} color={colors.text.inverse} />
              </TouchableOpacity>
            </View>

            <Text style={styles.workoutTitle}>{workout.name}</Text>
            
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Exercício {currentExerciseIndex + 1} de {workout.exercises.length}
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${((currentExerciseIndex + 1) / workout.exercises.length) * 100}%` }
                  ]} 
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {exerciseDetails && (
          <View style={styles.exerciseCard}>
            <Image 
              source={{ uri: exerciseDetails.image_url }} 
              style={styles.exerciseImage}
              resizeMode="cover"
            />
            
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{exerciseDetails.name}</Text>
              <Text style={styles.exerciseDescription}>{exerciseDetails.description}</Text>
              
              <View style={styles.exerciseMeta}>
                <View style={styles.metaItem}>
                  <Target size={iconSizes.sm} color={colors.primary} />
                  <Text style={styles.metaText}>
                    {currentExercise.sets} séries × {currentExercise.reps || currentExercise.duration + 's'} {currentExercise.reps ? 'reps' : ''}
                  </Text>
                </View>
                
                {currentExercise.rest_time && (
                  <View style={styles.metaItem}>
                    <Clock size={iconSizes.sm} color={colors.primary} />
                    <Text style={styles.metaText}>
                      {currentExercise.rest_time}s descanso
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.muscleGroups}>
                {exerciseDetails.muscle_groups.map((muscle, index) => (
                  <View key={index} style={styles.muscleTag}>
                    <Text style={styles.muscleTagText}>{muscle}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        <View style={styles.controlsSection}>
          <View style={styles.controls}>
            <TouchableOpacity 
              style={[styles.controlButton, currentExerciseIndex === 0 && styles.disabledButton]}
              onPress={handlePreviousExercise}
              disabled={currentExerciseIndex === 0}
            >
              <RotateCcw size={iconSizes.md} color={currentExerciseIndex === 0 ? colors.gray[400] : colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.playButton}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause size={iconSizes.lg} color={colors.text.inverse} />
              ) : (
                <Play size={iconSizes.lg} color={colors.text.inverse} />
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.controlButton}
              onPress={handleCompleteExercise}
            >
              <Check size={iconSizes.md} color={colors.status.success} />
            </TouchableOpacity>
          </View>

          <Text style={styles.controlsHint}>
            {isPlaying ? 'Pausar exercício' : 'Iniciar exercício'}
          </Text>
        </View>

        <View style={styles.exercisesList}>
          <Text style={styles.sectionTitle}>Exercícios do Treino</Text>
          
          {workout.exercises.map((workoutExercise, index) => {
            const exerciseData = workoutExercise.exercise;
            const isCompleted = completedExercises.includes(exerciseData.id);
            const isCurrent = index === currentExerciseIndex;
            
            return (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.exerciseItem,
                  isCurrent && styles.currentExerciseItem,
                  isCompleted && styles.completedExerciseItem
                ]}
                onPress={() => setCurrentExerciseIndex(index)}
              >
                <View style={styles.exerciseItemContent}>
                  <View style={[
                    styles.exerciseItemIcon,
                    isCurrent && styles.currentExerciseIcon,
                    isCompleted && styles.completedExerciseIcon
                  ]}>
                    {isCompleted ? (
                      <Check size={iconSizes.sm} color={colors.text.inverse} />
                    ) : (
                      <Text style={styles.exerciseNumber}>{index + 1}</Text>
                    )}
                  </View>
                  
                  <View style={styles.exerciseItemInfo}>
                    <Text style={[
                      styles.exerciseItemName,
                      isCompleted && styles.completedText
                    ]}>
                      {exerciseData?.name}
                    </Text>
                    <Text style={styles.exerciseItemMeta}>
                      {workoutExercise.sets} séries × {workoutExercise.reps || workoutExercise.duration + 's'} {workoutExercise.reps ? 'reps' : ''}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Exercise Details Modal */}
      <Modal
        visible={showExerciseDetails}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Detalhes do Exercício</Text>
            <TouchableOpacity onPress={() => setShowExerciseDetails(false)}>
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
          
          {exerciseDetails && (
            <ScrollView style={styles.modalContent}>
              <Image 
                source={{ uri: exerciseDetails.image_url }} 
                style={styles.modalExerciseImage}
                resizeMode="cover"
              />
              
              <View style={styles.modalExerciseInfo}>
                <Text style={styles.modalExerciseName}>{exerciseDetails.name}</Text>
                <Text style={styles.modalExerciseDescription}>{exerciseDetails.description}</Text>
                
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Instruções</Text>
                  {exerciseDetails.instructions.map((instruction, index) => (
                    <Text key={index} style={styles.instructionText}>
                      {index + 1}. {instruction}
                    </Text>
                  ))}
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Grupos Musculares</Text>
                  <View style={styles.modalMuscleGroups}>
                    {exerciseDetails.muscle_groups.map((muscle, index) => (
                      <View key={index} style={styles.modalMuscleTag}>
                        <Text style={styles.modalMuscleTagText}>{muscle}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: borderRadius.xxl,
    borderBottomRightRadius: borderRadius.xxl,
  },
  headerContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
    marginBottom: spacing.lg,
  },
  progressContainer: {
    marginBottom: spacing.sm,
  },
  progressText: {
    fontSize: fontSize.md,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.text.inverse,
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  exerciseCard: {
    backgroundColor: colors.background.card,
    margin: spacing.xl,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.lg,
  },
  exerciseImage: {
    width: '100%',
    height: 200,
  },
  exerciseInfo: {
    padding: spacing.xl,
  },
  exerciseName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  exerciseDescription: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  exerciseMeta: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  metaText: {
    fontSize: fontSize.md,
    color: colors.text.primary,
    fontWeight: fontWeight.medium,
  },
  muscleGroups: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  muscleTag: {
    backgroundColor: `${colors.primary}20`,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  muscleTagText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  controlsSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    marginBottom: spacing.md,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.round,
    backgroundColor: colors.background.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  disabledButton: {
    opacity: 0.5,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  controlsHint: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
  exercisesList: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  exerciseItem: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  currentExerciseItem: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  completedExerciseItem: {
    backgroundColor: colors.gray[50],
  },
  exerciseItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseItemIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  currentExerciseIcon: {
    backgroundColor: colors.primary,
  },
  completedExerciseIcon: {
    backgroundColor: colors.status.success,
  },
  exerciseNumber: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
  },
  exerciseItemInfo: {
    flex: 1,
  },
  exerciseItemName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  exerciseItemMeta: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.gray[500],
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  modalTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
  },
  modalCloseText: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: fontWeight.semiBold,
  },
  modalContent: {
    flex: 1,
  },
  modalExerciseImage: {
    width: '100%',
    height: 250,
  },
  modalExerciseInfo: {
    padding: spacing.xl,
  },
  modalExerciseName: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  modalExerciseDescription: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  modalSection: {
    marginBottom: spacing.xl,
  },
  modalSectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  instructionText: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  modalMuscleGroups: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  modalMuscleTag: {
    backgroundColor: `${colors.primary}20`,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  modalMuscleTagText: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
});