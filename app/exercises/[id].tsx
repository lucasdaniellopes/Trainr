import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useExerciseStore } from '@/stores/exerciseStore';
import { useAuthStore } from '@/stores/authStore';
import { 
  ArrowLeft, 
  Star,
  Play,
  Plus,
  Clock,
  Target,
  Info,
  Heart,
  Share,
  Video,
  BookOpen
} from 'lucide-react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows, iconSizes } from '@/constants/theme';

export default function ExerciseDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { exercises } = useExerciseStore();
  const { userType } = useAuthStore();
  const [isFavorited, setIsFavorited] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const exercise = exercises.find(e => e.id === id);
  
  if (!exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Exercício não encontrado</Text>
      </SafeAreaView>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return colors.status.success;
      case 'intermediate': return colors.status.warning;
      case 'advanced': return colors.status.error;
      default: return colors.primary;
    }
  };

  const handleAddToWorkout = () => {
    // Implementar lógica para adicionar exercício a um treino
    console.log('Add to workout:', exercise.id);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
    // Implementar lógica de compartilhamento
    console.log('Share exercise:', exercise.id);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: exercise.image_url }} 
            style={styles.exerciseImage}
            resizeMode="cover"
          />
          
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageOverlay}
          >
            <SafeAreaView>
              <View style={styles.headerActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => router.back()}
                >
                  <ArrowLeft size={iconSizes.md} color={colors.text.inverse} />
                </TouchableOpacity>
                
                <View style={styles.rightActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={handleFavorite}
                  >
                    <Heart 
                      size={iconSizes.md} 
                      color={isFavorited ? colors.status.error : colors.text.inverse}
                      fill={isFavorited ? colors.status.error : 'transparent'}
                    />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={handleShare}
                  >
                    <Share size={iconSizes.md} color={colors.text.inverse} />
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </LinearGradient>
          
          <View style={styles.playButtonContainer}>
            <TouchableOpacity style={styles.playButton}>
              <Play size={iconSizes.lg} color={colors.text.inverse} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Exercise Info */}
        <View style={styles.exerciseInfo}>
          <View style={styles.exerciseHeader}>
            <View style={styles.exerciseTitleContainer}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(exercise.difficulty) }]}>
                <Text style={styles.difficultyText}>{exercise.difficulty}</Text>
              </View>
            </View>
            
            <View style={styles.rating}>
              <Star size={iconSizes.sm} color={colors.status.warning} fill={colors.status.warning} />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
          </View>

          <Text style={styles.exerciseDescription}>{exercise.description}</Text>

          {/* Exercise Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Clock size={iconSizes.md} color={colors.primary} />
              <Text style={styles.statValue}>{exercise.duration_minutes || 5}min</Text>
              <Text style={styles.statLabel}>Duração</Text>
            </View>
            
            <View style={styles.statCard}>
              <Target size={iconSizes.md} color={colors.primary} />
              <Text style={styles.statValue}>{exercise.muscle_groups.length}</Text>
              <Text style={styles.statLabel}>Grupos</Text>
            </View>
            
            <View style={styles.statCard}>
              <Star size={iconSizes.md} color={colors.primary} />
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Avaliação</Text>
            </View>
          </View>

          {/* Muscle Groups */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Grupos Musculares</Text>
            <View style={styles.muscleGroups}>
              {exercise.muscle_groups.map((muscle, index) => (
                <View key={index} style={styles.muscleTag}>
                  <Text style={styles.muscleTagText}>{muscle}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Equipment */}
          {exercise.equipment && exercise.equipment.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Equipamentos</Text>
              <View style={styles.equipmentList}>
                {exercise.equipment.map((item, index) => (
                  <View key={index} style={styles.equipmentItem}>
                    <View style={styles.equipmentIcon}>
                      <Target size={iconSizes.sm} color={colors.primary} />
                    </View>
                    <Text style={styles.equipmentText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Instructions Preview */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Instruções</Text>
              <TouchableOpacity 
                style={styles.viewAllButton}
                onPress={() => setShowInstructions(true)}
              >
                <Text style={styles.viewAllText}>Ver todas</Text>
                <Info size={iconSizes.sm} color={colors.primary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.instructionsPreview}>
              {exercise.instructions.slice(0, 3).map((instruction, index) => (
                <View key={index} style={styles.instructionItem}>
                  <View style={styles.instructionNumber}>
                    <Text style={styles.instructionNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.instructionText}>{instruction}</Text>
                </View>
              ))}
              {exercise.instructions.length > 3 && (
                <Text style={styles.moreInstructionsText}>
                  +{exercise.instructions.length - 3} passos adicionais
                </Text>
              )}
            </View>
          </View>

          {/* Tips */}
          {exercise.tips && exercise.tips.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dicas</Text>
              <View style={styles.tipsContainer}>
                {exercise.tips.map((tip, index) => (
                  <View key={index} style={styles.tipItem}>
                    <Info size={iconSizes.sm} color={colors.status.info} />
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity 
          style={styles.secondaryActionButton}
          onPress={() => setShowInstructions(true)}
        >
          <BookOpen size={iconSizes.md} color={colors.primary} />
          <Text style={styles.secondaryActionText}>Instruções</Text>
        </TouchableOpacity>
        
        {userType === 'trainer' && (
          <TouchableOpacity 
            style={styles.primaryActionButton}
            onPress={handleAddToWorkout}
          >
            <Plus size={iconSizes.md} color={colors.text.inverse} />
            <Text style={styles.primaryActionText}>Adicionar ao Treino</Text>
          </TouchableOpacity>
        )}
        
        {userType === 'client' && (
          <TouchableOpacity style={styles.primaryActionButton}>
            <Play size={iconSizes.md} color={colors.text.inverse} />
            <Text style={styles.primaryActionText}>Iniciar Exercício</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Instructions Modal */}
      <Modal
        visible={showInstructions}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Como fazer: {exercise.name}</Text>
            <TouchableOpacity onPress={() => setShowInstructions(false)}>
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <Image 
              source={{ uri: exercise.image_url }} 
              style={styles.modalExerciseImage}
              resizeMode="cover"
            />
            
            <View style={styles.modalExerciseInfo}>
              <Text style={styles.modalSectionTitle}>Instruções Passo a Passo</Text>
              
              {exercise.instructions.map((instruction, index) => (
                <View key={index} style={styles.modalInstructionItem}>
                  <View style={styles.modalInstructionNumber}>
                    <Text style={styles.modalInstructionNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.modalInstructionText}>{instruction}</Text>
                </View>
              ))}

              {exercise.tips && exercise.tips.length > 0 && (
                <>
                  <Text style={[styles.modalSectionTitle, { marginTop: spacing.xl }]}>
                    Dicas Importantes
                  </Text>
                  
                  {exercise.tips.map((tip, index) => (
                    <View key={index} style={styles.modalTipItem}>
                      <Info size={iconSizes.sm} color={colors.status.info} />
                      <Text style={styles.modalTipText}>{tip}</Text>
                    </View>
                  ))}
                </>
              )}
            </View>
          </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'space-between',
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  rightActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.round,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonContainer: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  exerciseInfo: {
    flex: 1,
    padding: spacing.xl,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  exerciseTitleContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  exerciseName: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  difficultyText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ratingText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.text.primary,
  },
  exerciseDescription: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.sm,
  },
  statValue: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginVertical: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  viewAllText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: fontWeight.semiBold,
  },
  muscleGroups: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  muscleTag: {
    backgroundColor: `${colors.primary}20`,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  muscleTagText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  equipmentList: {
    gap: spacing.sm,
  },
  equipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  equipmentIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.round,
    backgroundColor: `${colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  equipmentText: {
    fontSize: fontSize.md,
    color: colors.text.primary,
  },
  instructionsPreview: {
    gap: spacing.md,
  },
  instructionItem: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  instructionNumber: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionNumberText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
  },
  instructionText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  moreInstructionsText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontStyle: 'italic',
    marginTop: spacing.sm,
  },
  tipsContainer: {
    gap: spacing.md,
  },
  tipItem: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  tipText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  actionBar: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.xl,
    backgroundColor: colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  secondaryActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryActionText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.primary,
  },
  primaryActionButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
  },
  primaryActionText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.text.inverse,
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
    flex: 1,
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
    height: 200,
  },
  modalExerciseInfo: {
    padding: spacing.xl,
  },
  modalSectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  modalInstructionItem: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  modalInstructionNumber: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInstructionNumberText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
  },
  modalInstructionText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  modalTipItem: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  modalTipText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text.secondary,
    lineHeight: 22,
  },
});