import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: boolean;
  variant?: 'default' | 'glass' | 'gradient';
  intensity?: number;
}

export function Card({ children, style, padding = true, variant = 'default', intensity = 20 }: CardProps) {
  if (variant === 'glass') {
    return (
      <BlurView intensity={intensity} style={[styles.glassCard, style]}>
        <View style={[styles.glassOverlay, padding && styles.padding]}>
          {children}
        </View>
      </BlurView>
    );
  }

  if (variant === 'gradient') {
    return (
      <LinearGradient
        colors={[`${colors.primary}20`, `${colors.primaryLight}10`]}
        style={[styles.gradientCard, padding && styles.padding, style]}
      >
        {children}
      </LinearGradient>
    );
  }

  return (
    <View style={[
      styles.card,
      padding && styles.padding,
      style
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  glassCard: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  glassOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  gradientCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  padding: {
    padding: 20,
  },
});