import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/stores/authStore';
import { useSessionStore } from '@/stores/sessionStore';
import { Calendar, Clock, MapPin, User, Plus } from 'lucide-react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows, iconSizes } from '@/constants/theme';

export default function ScheduleScreen() {
  const { userType } = useAuthStore();
  const { getUpcomingSessions, getCompletedSessions } = useSessionStore();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  
  const upcomingSessions = getUpcomingSessions();
  const completedSessions = getCompletedSessions();

  const renderSessionCard = (session: any) => (
    <TouchableOpacity key={session.id} style={styles.sessionCard}>
      <View style={styles.sessionHeader}>
        <View style={styles.sessionDateContainer}>
          <Calendar size={iconSizes.md} color={colors.primary} />
          <Text style={styles.sessionDate}>{session.date}</Text>
        </View>
        <View style={styles.sessionStatusContainer}>
          <View style={[
            styles.statusIndicator,
            { backgroundColor: session.status === 'confirmed' ? colors.status.success : colors.status.warning }
          ]} />
          <Text style={styles.sessionStatus}>
            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.sessionContent}>
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionTitle}>
            {userType === 'client' ? `Session with ${session.trainer_name}` : `Session with Client`}
          </Text>
          
          <View style={styles.sessionDetails}>
            <View style={styles.sessionDetail}>
              <Clock size={iconSizes.sm} color={colors.gray[500]} />
              <Text style={styles.sessionDetailText}>
                {session.time} • {session.duration_minutes} min
              </Text>
            </View>
            
            <View style={styles.sessionDetail}>
              <MapPin size={iconSizes.sm} color={colors.gray[500]} />
              <Text style={styles.sessionDetailText}>
                {session.location.name}
              </Text>
            </View>
            
            <View style={styles.sessionDetail}>
              <User size={iconSizes.sm} color={colors.gray[500]} />
              <Text style={styles.sessionDetailText}>
                ${session.price}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {activeTab === 'upcoming' && (
        <View style={styles.sessionActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>View Details</Text>
          </TouchableOpacity>
          
          {session.status === 'scheduled' && (
            <TouchableOpacity style={[styles.actionButton, styles.confirmButton]}>
              <Text style={[styles.actionButtonText, styles.confirmButtonText]}>
                Confirm
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'upcoming' && styles.activeTab
            ]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'upcoming' && styles.activeTabText
            ]}>
              Upcoming
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'completed' && styles.activeTab
            ]}
            onPress={() => setActiveTab('completed')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'completed' && styles.activeTabText
            ]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {activeTab === 'upcoming' ? (
            upcomingSessions.length > 0 ? (
              upcomingSessions.map(renderSessionCard)
            ) : (
              <View style={styles.emptyState}>
                <Calendar size={48} color={colors.gray[300]} />
                <Text style={styles.emptyStateTitle}>No Upcoming Sessions</Text>
                <Text style={styles.emptyStateSubtitle}>
                  {userType === 'client' 
                    ? 'Book a session with a trainer to get started'
                    : 'Your upcoming sessions will appear here'
                  }
                </Text>
              </View>
            )
          ) : (
            completedSessions.length > 0 ? (
              completedSessions.map(renderSessionCard)
            ) : (
              <View style={styles.emptyState}>
                <Clock size={48} color={colors.gray[300]} />
                <Text style={styles.emptyStateTitle}>No Completed Sessions</Text>
                <Text style={styles.emptyStateSubtitle}>
                  Your session history will appear here
                </Text>
              </View>
            )
          )}
        </View>
      </ScrollView>

      {userType === 'client' && (
        <TouchableOpacity style={styles.fab}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={styles.fabGradient}
          >
            <Plus size={iconSizes.lg} color={colors.text.inverse} />
          </LinearGradient>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    paddingHorizontal: spacing.xxxl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  title: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xxxl,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.gray[200],
    borderRadius: borderRadius.md,
    padding: spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  activeTab: {
    backgroundColor: colors.background.secondary,
    ...shadows.md,
  },
  tabText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.gray[500],
  },
  activeTabText: {
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xxxl,
    paddingBottom: 100,
  },
  sessionCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sessionDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sessionDate: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.text.primary,
  },
  sessionStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusIndicator: {
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: spacing.xs,
  },
  sessionStatus: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.gray[500],
  },
  sessionContent: {
    marginBottom: spacing.lg,
  },
  sessionInfo: {
    gap: spacing.md,
  },
  sessionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
    color: colors.text.primary,
  },
  sessionDetails: {
    gap: spacing.sm,
  },
  sessionDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sessionDetailText: {
    fontSize: fontSize.md,
    color: colors.gray[500],
  },
  sessionActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    backgroundColor: colors.gray[100],
  },
  confirmButton: {
    backgroundColor: colors.primary,
  },
  actionButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.gray[700],
  },
  confirmButtonText: {
    color: colors.text.inverse,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.semiBold,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyStateSubtitle: {
    fontSize: fontSize.lg,
    color: colors.gray[500],
    textAlign: 'center',
    lineHeight: 22,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xxxl,
    right: spacing.xxxl,
    borderRadius: 28,
    ...shadows.lg,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});