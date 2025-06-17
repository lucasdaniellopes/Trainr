import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useExerciseStore } from '@/stores/exerciseStore';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Target,
  Clock,
  Star,
  Play,
  BookOpen
} from 'lucide-react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows, iconSizes } from '@/constants/theme';
import { Exercise } from '@/types/exercise';

export default function ExercisesLibraryScreen() {
  const router = useRouter();
  const { exercises } = useExerciseStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const muscleGroups = ['all', 'chest', 'back', 'shoulders', 'arms', 'legs', 'core', 'cardio'];
  
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         exercise.muscle_groups.some(mg => mg.toLowerCase().includes(selectedFilter.toLowerCase()));
    
    return matchesSearch && matchesFilter;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return colors.status.success;
      case 'intermediate': return colors.status.warning;
      case 'advanced': return colors.status.error;
      default: return colors.primary;
    }
  };

  const renderExercise = ({ item }: { item: Exercise }) => (
    <TouchableOpacity 
      style={styles.exerciseCard}
      onPress={() => router.push(`/exercises/${item.id}`)}
    >
      <Image 
        source={{ uri: item.image_url }} 
        style={styles.exerciseImage}
        resizeMode="cover"
      />
      
      <View style={styles.exerciseOverlay}>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
        
        <TouchableOpacity style={styles.playButton}>
          <Play size={iconSizes.sm} color={colors.text.inverse} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.exerciseDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.exerciseMeta}>
          <View style={styles.metaItem}>
            <Target size={iconSizes.xs} color={colors.text.secondary} />
            <Text style={styles.metaText}>
              {item.muscle_groups.slice(0, 2).join(', ')}
            </Text>
          </View>
          
          <View style={styles.metaItem}>
            <Clock size={iconSizes.xs} color={colors.text.secondary} />
            <Text style={styles.metaText}>{item.duration_minutes || 5}min</Text>
          </View>
        </View>
        
        <View style={styles.muscleGroups}>
          {item.muscle_groups.slice(0, 3).map((muscle, index) => (
            <View key={index} style={styles.muscleTag}>
              <Text style={styles.muscleTagText}>{muscle}</Text>
            </View>
          ))}
          {item.muscle_groups.length > 3 && (
            <Text style={styles.moreTagsText}>+{item.muscle_groups.length - 3}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFilterButton = (filter: string) => (
    <TouchableOpacity
      key={filter}
      style={[
        styles.filterButton,
        selectedFilter === filter && styles.activeFilterButton
      ]}
      onPress={() => setSelectedFilter(filter)}
    >
      <Text style={[
        styles.filterButtonText,
        selectedFilter === filter && styles.activeFilterButtonText
      ]}>
        {filter === 'all' ? 'Todos' : filter.charAt(0).toUpperCase() + filter.slice(1)}
      </Text>
    </TouchableOpacity>
  );

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
              
              <Text style={styles.title}>Biblioteca de Exercícios</Text>
              <View style={{ width: 40 }} />
            </View>

            <View style={styles.searchContainer}>
              <Search size={iconSizes.md} color="rgba(255, 255, 255, 0.7)" />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar exercícios..."
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{exercises.length}</Text>
                <Text style={styles.statLabel}>Exercícios</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {exercises.filter(e => e.difficulty === 'beginner').length}
                </Text>
                <Text style={styles.statLabel}>Iniciante</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {new Set(exercises.flatMap(e => e.muscle_groups)).size}
                </Text>
                <Text style={styles.statLabel}>Grupos</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.filtersSection}>
          <View style={styles.filtersHeader}>
            <Filter size={iconSizes.sm} color={colors.text.primary} />
            <Text style={styles.filtersTitle}>Filtrar por grupo muscular</Text>
          </View>
          
          <FlatList
            data={muscleGroups}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => renderFilterButton(item)}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.filtersList}
          />
        </View>

        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {filteredExercises.length} exercício{filteredExercises.length !== 1 ? 's' : ''} encontrado{filteredExercises.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {filteredExercises.length > 0 ? (
          <FlatList
            data={filteredExercises}
            renderItem={renderExercise}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.exercisesList}
            columnWrapperStyle={styles.exercisesRow}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <BookOpen size={48} color={colors.gray[400]} />
            <Text style={styles.emptyStateTitle}>
              {searchQuery ? 'Nenhum exercício encontrado' : 'Nenhum exercício disponível'}
            </Text>
            <Text style={styles.emptyStateSubtitle}>
              {searchQuery 
                ? 'Tente buscar com termos diferentes ou ajuste os filtros'
                : 'Aguarde enquanto carregamos os exercícios'
              }
            </Text>
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
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text.inverse,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.sm,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: spacing.xs,
  },
  content: {
    flex: 1,
  },
  filtersSection: {
    paddingVertical: spacing.lg,
  },
  filtersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  filtersTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.text.primary,
  },
  filtersList: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  filterButton: {
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.text.primary,
  },
  activeFilterButtonText: {
    color: colors.text.inverse,
  },
  resultsHeader: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
  resultsText: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
  exercisesList: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  exercisesRow: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  exerciseCard: {
    width: '48%',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  exerciseImage: {
    width: '100%',
    height: 120,
  },
  exerciseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    justifyContent: 'space-between',
    padding: spacing.sm,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  difficultyText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
  },
  playButton: {
    alignSelf: 'flex-end',
    width: 32,
    height: 32,
    borderRadius: borderRadius.round,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseInfo: {
    padding: spacing.md,
  },
  exerciseName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  exerciseDescription: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
  exerciseMeta: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: fontSize.xs,
    color: colors.text.secondary,
  },
  muscleGroups: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    alignItems: 'center',
  },
  muscleTag: {
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.xs,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
  muscleTagText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  moreTagsText: {
    fontSize: 10,
    color: colors.text.secondary,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyStateTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});