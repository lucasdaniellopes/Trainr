import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/theme';

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/homepage');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  return (
    <LinearGradient
      colors={colors.gradients.primary}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.logo}>Trainr</Text>
        <Text style={styles.tagline}>Conecte. Treine. Transforme.</Text>
        <ActivityIndicator size="large" color={colors.white} style={styles.loader} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: colors.gray[200],
    marginBottom: 40,
    fontWeight: '300',
  },
  loader: {
    marginTop: 20,
  },
});