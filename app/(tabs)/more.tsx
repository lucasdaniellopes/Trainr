import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { useFocusEffect } from '@react-navigation/native';
import { 
  Search, 
  Dumbbell, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut,
  X,
  ChevronRight
} from 'lucide-react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows, iconSizes } from '@/constants/theme';

export default function MoreScreen() {
  const router = useRouter();
  const { userType, logout } = useAuthStore();
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setShowBottomSheet(true);
      
      return () => {
        setShowBottomSheet(false);
      };
    }, [])
  );

  const menuItems = [
    ...(userType === 'client' ? [
      {
        icon: Search,
        title: 'Buscar Trainers',
        subtitle: 'Encontre personal trainers',
        route: '/(tabs)/search',
        color: colors.primary,
      }
    ] : []),
    {
      icon: Dumbbell,
      title: 'Treinos',
      subtitle: 'Seus treinos e exercícios',
      route: '/(tabs)/workouts',
      color: colors.primary,
    },
    {
      icon: User,
      title: 'Perfil',
      subtitle: 'Seus dados e configurações',
      route: '/(tabs)/profile',
      color: colors.primary,
    },
    {
      icon: Settings,
      title: 'Configurações',
      subtitle: 'Preferências do app',
      route: '/settings',
      color: colors.gray[600],
    },
    {
      icon: HelpCircle,
      title: 'Ajuda',
      subtitle: 'FAQ e suporte',
      route: '/help',
      color: colors.gray[600],
    },
  ];

  const handleNavigation = (route: string) => {
    setShowBottomSheet(false);
    setTimeout(() => {
      router.push(route as any);
    }, 150);
  };

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={showBottomSheet}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setShowBottomSheet(false);
          setTimeout(() => router.push('/(tabs)/home'), 100);
        }}
      >
        <View style={styles.overlay}>
          <TouchableOpacity 
            style={styles.backdropTouchable}
            onPress={() => {
              setShowBottomSheet(false);
              setTimeout(() => router.push('/(tabs)/home'), 100);
            }}
          />
          
          <View style={styles.bottomSheet}>
            <SafeAreaView>
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Menu</Text>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => {
                    setShowBottomSheet(false);
                    setTimeout(() => router.push('/(tabs)/home'), 100);
                  }}
                >
                  <X size={iconSizes.md} color={colors.text.secondary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.menuItem}
                    onPress={() => handleNavigation(item.route)}
                  >
                    <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                      <item.icon size={iconSizes.md} color={item.color} />
                    </View>
                    
                    <View style={styles.menuContent}>
                      <Text style={styles.menuTitle}>{item.title}</Text>
                      <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                    </View>
                    
                    <ChevronRight size={iconSizes.sm} color={colors.gray[400]} />
                  </TouchableOpacity>
                ))}
                
                <View style={styles.divider} />
                
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={handleLogout}
                >
                  <View style={[styles.menuIcon, { backgroundColor: `${colors.status.error}15` }]}>
                    <LogOut size={iconSizes.md} color={colors.status.error} />
                  </View>
                  
                  <View style={styles.menuContent}>
                    <Text style={[styles.menuTitle, { color: colors.status.error }]}>
                      Sair
                    </Text>
                    <Text style={styles.menuSubtitle}>Desconectar da conta</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdropTouchable: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: colors.background.secondary,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    paddingBottom: spacing.xl,
    maxHeight: '80%',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  sheetTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.round,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[200],
    marginVertical: spacing.md,
  },
});