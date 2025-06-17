import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/stores/authStore';
import { Bell, MapPin, Star, Calendar, Plus, Zap, TrendingUp, Users, Clock, Target, Award } from 'lucide-react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows, iconSizes } from '@/constants/theme';

export default function HomeScreen() {
  const { user, userType } = useAuthStore();
  const userName = user?.profile?.name || 'User';

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.header}
        >
          <SafeAreaView>
            <View style={styles.headerContent}>
              <View style={styles.headerTop}>
                <View>
                  <Text style={styles.greeting}>Olá,</Text>
                  <Text style={styles.userName}>{userName}! 👋</Text>
                </View>
                <TouchableOpacity style={styles.notificationButton}>
                  <Bell size={iconSizes.md} color={colors.text.inverse} />
                </TouchableOpacity>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <Zap size={iconSizes.sm} color={colors.primary} />
                  <Text style={styles.statNumber}>12</Text>
                  <Text style={styles.statLabel}>Sessões</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Star size={iconSizes.sm} color={colors.primary} />
                  <Text style={styles.statNumber}>4.8</Text>
                  <Text style={styles.statLabel}>Avaliação</Text>
                </View>
                
                <View style={styles.statCard}>
                  <TrendingUp size={iconSizes.sm} color={colors.primary} />
                  <Text style={styles.statNumber}>28</Text>
                  <Text style={styles.statLabel}>Dias</Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ações Rápidas</Text>
            <View style={styles.actionsGrid}>
              {userType === 'client' ? (
                <>
                  <TouchableOpacity style={styles.actionCard}>
                    <View style={[styles.actionIcon, { backgroundColor: '#ff7b54' }]}>
                      <MapPin size={24} color="#ffffff" />
                    </View>
                    <Text style={styles.actionTitle}>Buscar</Text>
                    <Text style={styles.actionSubtitle}>Trainers</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.actionCard}>
                    <View style={[styles.actionIcon, { backgroundColor: '#ff9a56' }]}>
                      <Calendar size={24} color="#ffffff" />
                    </View>
                    <Text style={styles.actionTitle}>Agendar</Text>
                    <Text style={styles.actionSubtitle}>Sessão</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity style={styles.actionCard}>
                    <View style={[styles.actionIcon, { backgroundColor: '#ff7b54' }]}>
                      <Users size={24} color="#ffffff" />
                    </View>
                    <Text style={styles.actionTitle}>Clientes</Text>
                    <Text style={styles.actionSubtitle}>Gerenciar</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.actionCard}>
                    <View style={[styles.actionIcon, { backgroundColor: '#ff9a56' }]}>
                      <Clock size={24} color="#ffffff" />
                    </View>
                    <Text style={styles.actionTitle}>Horários</Text>
                    <Text style={styles.actionSubtitle}>Definir</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Agenda de Hoje</Text>
            <View style={styles.scheduleCard}>
              <View style={styles.scheduleHeader}>
                <Calendar size={20} color="#ff7b54" />
                <Text style={styles.scheduleDate}>17 de Junho</Text>
              </View>
              
              <View style={styles.sessionItem}>
                <View style={styles.sessionTime}>
                  <Text style={styles.timeText}>14:00</Text>
                </View>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionTitle}>
                    {userType === 'client' ? 'Treino com Alex Rodriguez' : 'João Silva - Funcional'}
                  </Text>
                  <Text style={styles.sessionLocation}>Academia Central</Text>
                </View>
                <View style={[styles.sessionStatus, { backgroundColor: '#10b981' }]}>
                  <Text style={styles.statusText}>Confirmado</Text>
                </View>
              </View>

              <View style={styles.sessionItem}>
                <View style={styles.sessionTime}>
                  <Text style={styles.timeText}>16:30</Text>
                </View>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionTitle}>
                    {userType === 'client' ? 'Treino com Sarah Wilson' : 'Maria Santos - Pilates'}
                  </Text>
                  <Text style={styles.sessionLocation}>Estúdio Zen</Text>
                </View>
                <View style={[styles.sessionStatus, { backgroundColor: '#f59e0b' }]}>
                  <Text style={styles.statusText}>Pendente</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Seu Progresso</Text>
            <View style={styles.progressGrid}>
              <View style={styles.progressCard}>
                <Target size={24} color="#ff7b54" />
                <Text style={styles.progressNumber}>85%</Text>
                <Text style={styles.progressLabel}>Meta Mensal</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '85%' }]} />
                </View>
              </View>
              
              <View style={styles.progressCard}>
                <Award size={24} color="#ff9a56" />
                <Text style={styles.progressNumber}>12</Text>
                <Text style={styles.progressLabel}>Esta Semana</Text>
                <Text style={styles.progressSubtext}>+3 que semana passada</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Atividade Recente</Text>
            <View style={styles.activityCard}>
              <View style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: '#ff7b54' }]}>
                  <Zap size={16} color="#ffffff" />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>Treino concluído</Text>
                  <Text style={styles.activityTime}>Há 2 horas</Text>
                </View>
              </View>
              
              <View style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: '#ff9a56' }]}>
                  <Calendar size={16} color="#ffffff" />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>Nova sessão agendada</Text>
                  <Text style={styles.activityTime}>Ontem</Text>
                </View>
              </View>
              
              <View style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: '#ffb366' }]}>
                  <Star size={16} color="#ffffff" />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>Nova avaliação recebida</Text>
                  <Text style={styles.activityTime}>2 dias atrás</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.fabGradient}
        >
          <Plus size={iconSizes.lg} color={colors.text.inverse} />
        </LinearGradient>
      </TouchableOpacity>
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
    marginBottom: spacing.xl,
  },
  greeting: {
    fontSize: fontSize.lg,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: fontWeight.medium,
  },
  userName: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
    marginTop: spacing.xs,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    minHeight: 70,
    justifyContent: 'center',
    ...shadows.md,
  },
  statNumber: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginTop: spacing.xs,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.text.secondary,
    fontWeight: fontWeight.medium,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 28,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  scheduleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  scheduleDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sessionTime: {
    width: 60,
    marginRight: 12,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff7b54',
  },
  sessionInfo: {
    flex: 1,
    marginRight: 12,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  sessionLocation: {
    fontSize: 14,
    color: '#666',
  },
  sessionStatus: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  progressGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  progressCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  progressSubtext: {
    fontSize: 12,
    color: '#10b981',
    marginTop: 4,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#f3f4f6',
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ff7b54',
    borderRadius: 2,
  },
  activityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 14,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});