import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, MapPin, User, CheckCircle, AlertCircle, Clock as ClockIcon } from 'lucide-react-native';
import { Card } from '../ui/Card';
import { colors } from '@/constants/theme';

interface SessionCardProps {
  session: {
    id: string;
    trainer_name?: string;
    client_name?: string;
    date: string;
    duration_minutes: number;
    location: {
      name: string;
      address: string;
    };
    status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
    price: number;
  };
  userType: 'client' | 'trainer';
  onPress: () => void;
  variant?: 'default' | 'glass';
}

export function SessionCard({ session, userType, onPress, variant = 'default' }: SessionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return '#F59E0B';
      case 'confirmed': return '#10B981';
      case 'completed': return colors.primary;
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <ClockIcon size={16} color={getStatusColor(status)} />;
      case 'confirmed': return <CheckCircle size={16} color={getStatusColor(status)} />;
      case 'completed': return <CheckCircle size={16} color={getStatusColor(status)} />;
      case 'cancelled': return <AlertCircle size={16} color={getStatusColor(status)} />;
      default: return <ClockIcon size={16} color={getStatusColor(status)} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Agendado';
      case 'confirmed': return 'Confirmado';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card variant={variant} style={styles.card}>
        <View style={styles.header}>
          <View style={styles.statusContainer}>
            {getStatusIcon(session.status)}
            <Text style={[styles.statusText, { color: getStatusColor(session.status) }]}>
              {getStatusText(session.status)}
            </Text>
          </View>
          
          <Text style={styles.price}>R$ {session.price.toFixed(2)}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.participantInfo}>
            <User size={18} color="#6B7280" />
            <Text style={styles.participantName}>
              {userType === 'client' ? session.trainer_name : session.client_name}
            </Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Calendar size={16} color="#6B7280" />
              <Text style={styles.detailText}>{formatDate(session.date)}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Clock size={16} color="#6B7280" />
              <Text style={styles.detailText}>
                {formatTime(session.date)} • {session.duration_minutes}min
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <MapPin size={16} color="#6B7280" />
              <Text style={styles.detailText} numberOfLines={1}>
                {session.location.name}
              </Text>
            </View>
          </View>
        </View>

        {session.status === 'scheduled' && (
          <LinearGradient
            colors={[`${colors.primary}20`, `${colors.primaryLight}10`]}
            style={styles.actionBar}
          >
            <Text style={styles.actionText}>
              {userType === 'client' ? 'Aguardando confirmação' : 'Clique para confirmar'}
            </Text>
          </LinearGradient>
        )}

        {session.status === 'confirmed' && (
          <LinearGradient
            colors={['rgba(16, 185, 129, 0.1)', 'rgba(5, 150, 105, 0.05)']}
            style={styles.actionBar}
          >
            <Text style={[styles.actionText, { color: colors.primary }]}>
              Sessão confirmada • Prepare-se!
            </Text>
          </LinearGradient>
        )}
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  content: {
    marginBottom: 12,
  },
  participantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  participantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  detailsContainer: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
  },
  actionBar: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
});