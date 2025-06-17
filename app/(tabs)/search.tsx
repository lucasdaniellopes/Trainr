import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTrainerStore } from '@/stores/trainerStore';
import { TrainerCard } from '@/components/trainer/TrainerCard';
import { Search as SearchIcon, Filter, MapPin, SlidersHorizontal, Star, Clock } from 'lucide-react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows, iconSizes } from '@/constants/theme';

export default function SearchScreen() {
  const { 
    searchQuery, 
    setSearchQuery, 
    getFilteredTrainers,
    setTrainers,
    filters,
    setFilters
  } = useTrainerStore();
  
  const [showFilters, setShowFilters] = useState(false);
  const filteredTrainers = getFilteredTrainers();

  useEffect(() => {
    const mockTrainers = [
      {
        id: '1',
        name: 'Sarah Wilson',
        profile_photo: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=200',
        specialties: ['Yoga', 'Pilates'],
        hourly_rate: 60,
        rating_average: 4.9,
        total_sessions: 320,
        is_verified: true,
        distance: 4.1,
        next_available: 'Amanhã às 9h',
      },
      {
        id: '2',
        name: 'Alex Rodriguez',
        profile_photo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200',
        specialties: ['Funcional', 'Performance'],
        hourly_rate: 80,
        rating_average: 4.7,
        total_sessions: 280,
        is_verified: true,
        distance: 3.8,
        next_available: 'Hoje às 18h',
      },
      {
        id: '3',
        name: 'Lisa Chen',
        profile_photo: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=200',
        specialties: ['Crossfit', 'Cardio'],
        hourly_rate: 70,
        rating_average: 4.6,
        total_sessions: 195,
        is_verified: false,
        distance: 5.2,
        next_available: 'Segunda às 7h',
      },
    ];
    
    setTrainers(mockTrainers);
  }, []);

  const filterOptions = ['Todos', 'Próximos', 'Bem Avaliados', 'Disponível'];

  const renderTrainerCard = ({ item }: { item: any }) => (
    <View style={styles.trainerCard}>
      <View style={styles.trainerHeader}>
        <View style={styles.trainerImageContainer}>
          <View style={styles.trainerImage}>
            <Text style={styles.trainerInitial}>{item.name.charAt(0)}</Text>
          </View>
          {item.is_verified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓</Text>
            </View>
          )}
        </View>
        
        <View style={styles.trainerInfo}>
          <Text style={styles.trainerName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={fontSize.md} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>{item.rating_average}</Text>
            <Text style={styles.sessionsCount}>({item.total_sessions})</Text>
          </View>
          <View style={styles.specialtiesContainer}>
            {item.specialties.slice(0, 2).map((specialty: string, index: number) => (
              <View key={index} style={styles.specialtyTag}>
                <Text style={styles.specialtyText}>{specialty}</Text>
              </View>
            ))}
            {item.specialties.length > 2 && (
              <Text style={styles.moreText}>+{item.specialties.length - 2}</Text>
            )}
          </View>
        </View>
        
        <View style={styles.trainerActions}>
          <Text style={styles.price}>R$ {item.hourly_rate}/hora</Text>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Reservar</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.trainerFooter}>
        <View style={styles.locationInfo}>
          <MapPin size={iconSizes.xs} color={colors.text.secondary} />
          <Text style={styles.distance}>{item.distance}km</Text>
        </View>
        <View style={styles.availabilityInfo}>
          <Clock size={iconSizes.xs} color={colors.text.secondary} />
          <Text style={styles.availability}>{item.next_available}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors.gradients.primary}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Encontrar Trainers</Text>
            
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <SearchIcon size={iconSizes.md} color={colors.text.light} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar trainers, especialidades..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor={colors.text.light}
                />
                <TouchableOpacity 
                  style={styles.filterButton}
                  onPress={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal size={iconSizes.md} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
            {filterOptions.map((filter, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.filterChip, index === 0 && styles.filterChipActive]}
              >
                <Text style={[styles.filterChipText, index === 0 && styles.filterChipTextActive]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>{filteredTrainers.length} trainers encontrados</Text>
        <TouchableOpacity>
          <Text style={styles.sortText}>Relevância ↓</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTrainers}
        keyExtractor={(item) => item.id}
        renderItem={renderTrainerCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
  },
  headerContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: 10,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xl,
  },
  searchContainer: {
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
    ...shadows.md,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.lg,
    color: colors.text.primary,
  },
  filterButton: {
    padding: spacing.xs,
  },
  filtersContainer: {
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  filtersScroll: {
    paddingHorizontal: spacing.xl,
  },
  filterChip: {
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    fontWeight: fontWeight.medium,
  },
  filterChipTextActive: {
    color: colors.white,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
  },
  resultsCount: {
    fontSize: fontSize.lg,
    color: colors.text.secondary,
    fontWeight: fontWeight.medium,
  },
  sortText: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  listContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 100,
  },
  separator: {
    height: spacing.lg,
  },
  trainerCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    ...shadows.md,
  },
  trainerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  trainerImageContainer: {
    position: 'relative',
    marginRight: spacing.md,
  },
  trainerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trainerInitial: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: 10,
    backgroundColor: colors.status.success,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  verifiedText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: fontWeight.bold,
  },
  trainerInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  trainerName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  rating: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.text.primary,
  },
  sessionsCount: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  specialtyText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  moreText: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
  trainerActions: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  bookButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  bookButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.white,
  },
  trainerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  distance: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
  availabilityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  availability: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
});