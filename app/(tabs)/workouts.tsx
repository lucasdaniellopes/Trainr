import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useExerciseStore } from '@/stores/exerciseStore';
import { useAuthStore } from '@/stores/authStore';
import { Dumbbell, Plus, Clock, Target, Users, Filter, Play, BookOpen } from 'lucide-react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows, iconSizes } from '@/constants/theme';
import { Workout } from '@/types/exercise';

export default function WorkoutsScreen() {
  const router = useRouter();
  const { workouts } = useExerciseStore();
  const { userType } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'workouts' | 'exercises'>('workouts');

  const renderWorkoutCard = ({ item }: { item: Workout }) => (
    <TouchableOpacity 
      style={styles.workoutCard}
      onPress={() => router.push(`/workout/${item.id}`)}
    >
      <View style={styles.workoutHeader}>
        <View style={styles.workoutIconContainer}>
          <View style={[styles.workoutIcon, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
            <Dumbbell size={iconSizes.md} color={colors.text.inverse} />
          </View>
          {item.is_custom && (
            <View style={styles.customBadge}>
              <Text style={styles.customBadgeText}>Custom</Text>
            </View>
          )}
        </View>
        
        <View style={styles.workoutInfo}>
          <Text style={styles.workoutName}>{item.name}</Text>
          <Text style={styles.workoutDescription} numberOfLines={2}>
            {item.description}
          </Text>
          
          <View style={styles.workoutMeta}>
            <View style={styles.metaItem}>
              <Clock size={iconSizes.xs} color={colors.text.secondary} />
              <Text style={styles.metaText}>{item.duration_minutes}min</Text>
            </View>
            <View style={styles.metaItem}>
              <Target size={iconSizes.xs} color={colors.text.secondary} />
              <Text style={styles.metaText}>{item.exercises.length} exercícios</Text>
            </View>
            <View style={styles.metaItem}>
              <Users size={iconSizes.xs} color={colors.text.secondary} />
              <Text style={styles.metaText}>{item.difficulty}</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.playButton}
          onPress={() => router.push(`/workout/${item.id}`)}
        >
          <Play size={iconSizes.md} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.workoutTags}>
        {item.tags.slice(0, 3).map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        {item.tags.length > 3 && (
          <Text style={styles.moreTagsText}>+{item.tags.length - 3}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

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
              <View>
                <Text style={styles.title}>Treinos</Text>
                <Text style={styles.subtitle}>
                  {userType === 'client' ? 'Seus treinos e exercícios' : 'Gerencie treinos e exercícios'}
                </Text>
              </View>
              {userType === 'trainer' && (
                <TouchableOpacity style={styles.addButton}>
                  <Plus size={iconSizes.md} color={colors.text.inverse} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.tabsContainer}>
              <TouchableOpacity 
                style={[styles.tab, activeTab === 'workouts' && styles.activeTab]}
                onPress={() => setActiveTab('workouts')}
              >
                <Dumbbell size={iconSizes.sm} color={activeTab === 'workouts' ? colors.text.inverse : 'rgba(255,255,255,0.7)'} />
                <Text style={[styles.tabText, activeTab === 'workouts' && styles.activeTabText]}>
                  Treinos
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.tab, activeTab === 'exercises' && styles.activeTab]}
                onPress={() => setActiveTab('exercises')}
              >
                <BookOpen size={iconSizes.sm} color={activeTab === 'exercises' ? colors.text.inverse : 'rgba(255,255,255,0.7)'} />
                <Text style={[styles.tabText, activeTab === 'exercises' && styles.activeTabText]}>
                  Exercícios
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.content}>
        {activeTab === 'workouts' ? (
          <>
            <View style={styles.statsSection}>
              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{workouts.length}</Text>
                  <Text style={styles.statLabel}>Treinos</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>
                    {workouts.filter(w => w.difficulty === 'beginner').length}
                  </Text>
                  <Text style={styles.statLabel}>Iniciante</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>
                    {workouts.filter(w => w.is_custom).length}
                  </Text>
                  <Text style={styles.statLabel}>Personalizados</Text>
                </View>
              </View>
            </View>

            <View style={styles.filterSection}>
              <TouchableOpacity style={styles.filterButton}>
                <Filter size={iconSizes.sm} color={colors.primary} />
                <Text style={styles.filterText}>Filtrar</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={workouts}
              keyExtractor={(item) => item.id}
              renderItem={renderWorkoutCard}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </>
        ) : (
          <View style={styles.exercisesPlaceholder}>
            <BookOpen size={48} color={colors.gray[400]} />
            <Text style={styles.placeholderTitle}>Biblioteca de Exercícios</Text>
            <Text style={styles.placeholderText}>
              Explore nossa base completa de exercícios ou crie seus próprios
            </Text>
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => router.push('/exercises')}
            >
              <Text style={styles.exploreButtonText}>Explorar Exercícios</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: spacing.xs,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.md,
    padding: spacing.xs,
    gap: spacing.xs,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.sm,
    gap: spacing.xs,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  activeTabText: {
    color: colors.text.inverse,
  },
  content: {
    flex: 1,
  },
  statsSection: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.md,
  },
  statNumber: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.text.secondary,
    fontWeight: fontWeight.medium,
  },
  filterSection: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    alignSelf: 'flex-start',
  },
  filterText: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  listContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  separator: {
    height: spacing.lg,
  },
  workoutCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    ...shadows.md,
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  workoutIconContainer: {
    position: 'relative',
    marginRight: spacing.md,
  },
  workoutIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customBadge: {
    position: 'absolute',
    top: -spacing.xs,
    right: -spacing.xs,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
  customBadgeText: {
    fontSize: 10,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
  },
  workoutInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  workoutName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  workoutDescription: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  workoutMeta: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.round,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutTags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  tagText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  moreTagsText: {
    fontSize: fontSize.xs,
    color: colors.text.secondary,
  },
  exercisesPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  placeholderTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  placeholderText: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  exploreButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  exploreButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.text.inverse,
  },
});