import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Star, MapPin, Clock, Shield } from 'lucide-react-native';
import { Card } from '../ui/Card';
import { colors } from '@/constants/theme';

interface TrainerCardProps {
  trainer: {
    id: string;
    name: string;
    profile_photo?: string;
    specialties: string[];
    hourly_rate: number;
    rating_average: number;
    total_sessions: number;
    distance?: number;
    is_verified: boolean;
    next_available?: string;
  };
  onPress: () => void;
  variant?: 'default' | 'glass' | 'compact';
}

export function TrainerCard({ trainer, onPress, variant = 'default' }: TrainerCardProps) {
  if (variant === 'compact') {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Card variant="glass" style={styles.compactCard}>
          <View style={styles.compactContent}>
            <View style={styles.compactImageContainer}>
              <Image
                source={{ uri: trainer.profile_photo || 'https://via.placeholder.com/60' }}
                style={styles.compactAvatar}
              />
              {trainer.is_verified && (
                <View style={styles.verifiedBadge}>
                  <Shield size={12} color="#ffffff" />
                </View>
              )}
            </View>
            
            <View style={styles.compactInfo}>
              <Text style={styles.compactName}>{trainer.name}</Text>
              <View style={styles.compactRating}>
                <Star size={14} color="#FFD700" fill="#FFD700" />
                <Text style={styles.compactRatingText}>{trainer.rating_average}</Text>
              </View>
              <Text style={styles.compactPrice}>R$ {trainer.hourly_rate}/h</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card variant={variant === 'glass' ? 'glass' : 'default'} style={styles.card}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: trainer.profile_photo || 'https://via.placeholder.com/80' }}
              style={styles.avatar}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={styles.imageOverlay}
            />
            {trainer.is_verified && (
              <View style={styles.verifiedBadgeMain}>
                <Shield size={16} color="#ffffff" />
              </View>
            )}
          </View>
          
          <View style={styles.info}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{trainer.name}</Text>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Text style={styles.rating}>{trainer.rating_average}</Text>
                <Text style={styles.sessionCount}>({trainer.total_sessions})</Text>
              </View>
            </View>
            
            <View style={styles.specialtiesContainer}>
              {trainer.specialties.slice(0, 2).map((specialty, index) => (
                <View key={index} style={styles.specialtyTag}>
                  <Text style={styles.specialtyText}>{specialty}</Text>
                </View>
              ))}
              {trainer.specialties.length > 2 && (
                <Text style={styles.moreSpecialties}>+{trainer.specialties.length - 2}</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <MapPin size={16} color="#6B7280" />
            <Text style={styles.footerText}>
              {trainer.distance ? `${trainer.distance.toFixed(1)}km` : 'Localização'}
            </Text>
          </View>
          
          <View style={styles.footerItem}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.footerText}>
              {trainer.next_available || 'Disponível'}
            </Text>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>R$ {trainer.hourly_rate}</Text>
            <Text style={styles.priceUnit}>/hora</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 8,
  },
  compactCard: {
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
  },
  compactContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  compactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  compactInfo: {
    flex: 1,
  },
  compactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  compactRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  compactRatingText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 4,
  },
  compactPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  verifiedBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#10B981',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadgeMain: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#10B981',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 4,
  },
  sessionCount: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 2,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  specialtyTag: {
    backgroundColor: colors.gray[100],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  moreSpecialties: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  priceUnit: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 2,
  },
});