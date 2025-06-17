import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { 
  Search, 
  MapPin, 
  Star, 
  Users, 
  Clock, 
  Shield, 
  Zap, 
  TrendingUp,
  Heart,
  Target,
  Award,
  ChevronRight,
  Play
} from 'lucide-react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows, iconSizes } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function Homepage() {
  const router = useRouter();

  const stats = [
    { number: '50K+', label: 'Usuários Ativos' },
    { number: '2K+', label: 'Trainers Certificados' },
    { number: '100K+', label: 'Sessões Realizadas' },
    { number: '4.9', label: 'Avaliação Média' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.heroSection}
        >
          <SafeAreaView>
            <View style={styles.heroContent}>
              <View style={styles.heroHeader}>
                <Text style={styles.heroTitle}>
                  Transforme seu{'\n'}
                  <Text style={styles.heroTitleAccent}>corpo e mente</Text>
                </Text>
                <Text style={styles.heroSubtitle}>
                  Conecte-se com personal trainers certificados e alcance seus objetivos de fitness
                </Text>
              </View>

              <View style={styles.heroActions}>
                <TouchableOpacity 
                  style={styles.primaryButton}
                  onPress={() => router.push('/auth')}
                >
                  <BlurView intensity={30} style={styles.buttonBlur}>
                    <Text style={styles.buttonText}>Encontrar Trainer</Text>
                  </BlurView>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.videoButton}>
                  <BlurView intensity={20} style={styles.videoButtonBlur}>
                    <Play size={iconSizes.md} color={colors.text.inverse} />
                    <Text style={styles.videoButtonText}>Ver como funciona</Text>
                  </BlurView>
                </TouchableOpacity>
              </View>

              {/* Hero Image */}
              <View style={styles.heroImageCard}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                  style={styles.heroImage}
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={styles.heroImageOverlay}
                >
                  <View style={styles.heroImageContent}>
                    <Text style={styles.heroImageTitle}>Treino Personalizado</Text>
                    <Text style={styles.heroImageSubtitle}>Para cada objetivo</Text>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statNumber}>{stat.number}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Por que escolher a Trainr?</Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: `${colors.primary}15` }]}>
                <Search size={iconSizes.lg} color={colors.primary} />
              </View>
              <Text style={styles.featureTitle}>Encontre o Trainer Ideal</Text>
              <Text style={styles.featureDescription}>Milhares de trainers certificados próximos a você</Text>
            </View>
            
            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: `${colors.status.success}15` }]}>
                <Shield size={iconSizes.lg} color={colors.status.success} />
              </View>
              <Text style={styles.featureTitle}>Segurança Garantida</Text>
              <Text style={styles.featureDescription}>Todos os trainers são verificados e avaliados</Text>
            </View>
            
            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: `${colors.status.warning}15` }]}>
                <Clock size={iconSizes.lg} color={colors.status.warning} />
              </View>
              <Text style={styles.featureTitle}>Flexibilidade Total</Text>
              <Text style={styles.featureDescription}>Agende quando e onde for melhor para você</Text>
            </View>
            
            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: `${colors.secondary}15` }]}>
                <TrendingUp size={iconSizes.lg} color={colors.secondary} />
              </View>
              <Text style={styles.featureTitle}>Acompanhe seu Progresso</Text>
              <Text style={styles.featureDescription}>Monitore seus treinos e evolução</Text>
            </View>
          </View>
        </View>

        {/* How it Works */}
        <LinearGradient
          colors={[colors.background.primary, `${colors.primary}10`]}
          style={styles.howItWorksSection}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Como Funciona</Text>
            <View style={styles.stepsContainer}>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Busque</Text>
                  <Text style={styles.stepDescription}>Encontre trainers próximos a você</Text>
                </View>
              </View>
              
              <ChevronRight size={iconSizes.md} color={colors.gray[300]} />
              
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Conecte</Text>
                  <Text style={styles.stepDescription}>Converse e agende sua sessão</Text>
                </View>
              </View>
              
              <ChevronRight size={iconSizes.md} color={colors.gray[300]} />
              
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Treine</Text>
                  <Text style={styles.stepDescription}>Alcance seus objetivos com segurança</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* CTA Section */}
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.ctaSection}
        >
          <BlurView intensity={20} style={styles.ctaContent}>
            <Text style={styles.ctaTitle}>Pronto para começar?</Text>
            <Text style={styles.ctaSubtitle}>
              Junte-se a milhares de pessoas que já transformaram suas vidas
            </Text>
            <View style={styles.ctaButtons}>
              <TouchableOpacity 
                style={styles.ctaButton}
                onPress={() => router.push('/auth/register')}
              >
                <BlurView intensity={30} style={styles.ctaButtonBlur}>
                  <Text style={styles.ctaButtonText}>Sou Cliente</Text>
                </BlurView>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.ctaButton, styles.ctaButtonOutline]}
                onPress={() => router.push('/auth/register')}
              >
                <Text style={styles.ctaButtonTextOutline}>Sou Trainer</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </LinearGradient>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Trainr. Todos os direitos reservados.</Text>
          <Text style={styles.footerSubtext}>Conectando pessoas através do fitness</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  heroSection: {
    paddingBottom: 40,
  },
  heroContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  heroHeader: {
    marginBottom: spacing.xxxl,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontFamily: 'Inter-Bold',
  },
  heroTitleAccent: {
    color: colors.secondary,
  },
  heroSubtitle: {
    fontSize: fontSize.xl,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  heroActions: {
    marginBottom: spacing.xxxl,
    gap: spacing.lg,
    alignItems: 'center',
  },
  primaryButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  buttonBlur: {
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.text.inverse,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    fontFamily: 'Inter-Bold',
  },
  videoButton: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  videoButtonBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  videoButtonText: {
    color: colors.text.inverse,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    fontFamily: 'Inter-Medium',
  },
  heroImageCard: {
    height: 200,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  heroImageContent: {
    alignItems: 'flex-start',
  },
  heroImageTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
    fontFamily: 'Inter-Bold',
  },
  heroImageSubtitle: {
    fontSize: fontSize.md,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Inter-Regular',
  },
  statsSection: {
    marginTop: -20,
    paddingHorizontal: spacing.xl,
    marginBottom: 40,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 60) / 2,
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statNumber: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
  },
  section: {
    paddingHorizontal: spacing.xl,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xxxl,
    fontFamily: 'Inter-Bold',
  },
  featuresGrid: {
    gap: spacing.lg,
  },
  featureCard: {
    padding: spacing.xxxl,
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.xl,
    ...shadows.lg,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  featureTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  featureDescription: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  howItWorksSection: {
    paddingVertical: 40,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepItem: {
    flex: 1,
    alignItems: 'center',
  },
  stepNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  stepNumberText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
    fontFamily: 'Inter-Bold',
  },
  stepContent: {
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontFamily: 'Inter-SemiBold',
  },
  stepDescription: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  ctaSection: {
    paddingVertical: 60,
  },
  ctaContent: {
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
    textAlign: 'center',
    marginBottom: spacing.md,
    fontFamily: 'Inter-Bold',
  },
  ctaSubtitle: {
    fontSize: fontSize.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: spacing.xxxl,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: spacing.lg,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  ctaButton: {
    minWidth: 140,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  ctaButtonBlur: {
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: colors.text.inverse,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    fontFamily: 'Inter-Bold',
  },
  ctaButtonOutline: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'transparent',
  },
  ctaButtonTextOutline: {
    color: colors.text.inverse,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    fontFamily: 'Inter-Bold',
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.lg,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  footerText: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    fontFamily: 'Inter-Medium',
  },
  footerSubtext: {
    fontSize: fontSize.sm,
    color: colors.gray[400],
    fontFamily: 'Inter-Regular',
  },
});