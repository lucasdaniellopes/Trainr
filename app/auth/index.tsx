import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';

export default function AuthWelcome() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={colors.gradients.primary}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.logo}>FitConnect</Text>
            <Text style={styles.subtitle}>
              Find the perfect personal trainer for your fitness journey
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push('/auth/login')}
            >
              <Text style={styles.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push('/auth/register')}
            >
              <Text style={styles.secondaryButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.features}>
            <Text style={styles.featureText}>✓ Verified Personal Trainers</Text>
            <Text style={styles.featureText}>✓ Flexible Scheduling</Text>
            <Text style={styles.featureText}>✓ Secure Payments</Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: colors.gray[200],
    textAlign: 'center',
    lineHeight: 24,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  heroImage: {
    width: 280,
    height: 200,
    borderRadius: 16,
  },
  buttonContainer: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  secondaryButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  features: {
    alignItems: 'center',
    marginBottom: 40,
    gap: 8,
  },
  featureText: {
    color: colors.gray[200],
    fontSize: 16,
  },
});