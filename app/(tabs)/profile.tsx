import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { 
  Settings, 
  Edit3, 
  Star, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  LogOut,
  CreditCard,
  Shield,
  HelpCircle
} from 'lucide-react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows, iconSizes } from '@/constants/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, userType, logout } = useAuthStore();
  
  const profile = user?.profile;
  const profilePhoto = profile?.profile_photo || 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=200';

  const handleLogout = () => {
    logout();
    router.replace('/auth');
  };

  const menuItems = [
    {
      icon: Edit3,
      title: 'Edit Profile',
      subtitle: 'Update your personal information',
      onPress: () => {},
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      subtitle: 'Manage your payment options',
      onPress: () => {},
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      subtitle: 'Manage your privacy settings',
      onPress: () => {},
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      onPress: () => {},
    },
    {
      icon: Settings,
      title: 'Settings',
      subtitle: 'App preferences and notifications',
      onPress: () => {},
    },
  ];

  const trainerStats = userType === 'trainer' ? [
    { label: 'Total Sessions', value: '156' },
    { label: 'Rating', value: '4.8' },
    { label: 'Clients', value: '24' },
    { label: 'Experience', value: '3 years' },
  ] : [
    { label: 'Sessions Completed', value: '23' },
    { label: 'Favorite Trainers', value: '3' },
    { label: 'Goals Achieved', value: '5' },
    { label: 'Member Since', value: '2023' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
            
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profile?.name || 'User'}</Text>
              <Text style={styles.profileType}>
                {userType === 'client' ? 'Fitness Enthusiast' : 'Personal Trainer'}
              </Text>
              
              <View style={styles.contactInfo}>
                <View style={styles.contactItem}>
                  <Mail size={iconSizes.sm} color={colors.gray[500]} />
                  <Text style={styles.contactText}>{user?.email}</Text>
                </View>
                
                <View style={styles.contactItem}>
                  <Phone size={iconSizes.sm} color={colors.gray[500]} />
                  <Text style={styles.contactText}>{profile?.phone || 'Not provided'}</Text>
                </View>
              </View>
            </View>
          </View>

          {userType === 'trainer' && (
            <View style={styles.verificationBadge}>
              <Award size={iconSizes.sm} color={colors.status.success} />
              <Text style={styles.verificationText}>Verified Trainer</Text>
            </View>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            {trainerStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Trainer Specific Info */}
        {userType === 'trainer' && (
          <View style={styles.trainerSection}>
            <Text style={styles.sectionTitle}>Professional Info</Text>
            
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Specialties</Text>
              <View style={styles.specialtiesContainer}>
                {['Strength Training', 'Weight Loss', 'Cardio'].map((specialty, index) => (
                  <View key={index} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Hourly Rate</Text>
              <Text style={styles.rateText}>$75/hour</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Service Area</Text>
              <View style={styles.locationContainer}>
                <MapPin size={iconSizes.sm} color={colors.gray[500]} />
                <Text style={styles.locationText}>Within 10km radius</Text>
              </View>
            </View>
          </View>
        )}

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuItemIcon}>
                <item.icon size={iconSizes.lg} color={colors.gray[500]} />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={iconSizes.md} color={colors.status.error} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>FitConnect v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  header: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.xxxl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xxxl,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: spacing.lg,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  profileType: {
    fontSize: fontSize.lg,
    color: colors.gray[500],
    marginBottom: spacing.md,
  },
  contactInfo: {
    gap: spacing.sm,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  contactText: {
    fontSize: fontSize.md,
    color: colors.gray[500],
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xl,
    alignSelf: 'flex-start',
  },
  verificationText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.status.success,
  },
  statsContainer: {
    paddingHorizontal: spacing.xxxl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xxxl,
  },
  sectionTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.md,
  },
  statValue: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.md,
    color: colors.gray[500],
    textAlign: 'center',
  },
  trainerSection: {
    paddingHorizontal: spacing.xxxl,
    paddingBottom: spacing.xxxl,
  },
  infoCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  infoTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  specialtyTag: {
    backgroundColor: `${colors.primary}20`,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.lg,
  },
  specialtyText: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  rateText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
    color: colors.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  locationText: {
    fontSize: fontSize.md,
    color: colors.gray[500],
  },
  menuSection: {
    paddingHorizontal: spacing.xxxl,
    paddingBottom: spacing.xxxl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    ...shadows.md,
  },
  menuItemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  menuItemSubtitle: {
    fontSize: fontSize.md,
    color: colors.gray[500],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.background.secondary,
    marginHorizontal: spacing.xxxl,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xxxl,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.status.error,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: spacing.xxxl,
  },
  footerText: {
    fontSize: fontSize.md,
    color: colors.gray[400],
  },
});