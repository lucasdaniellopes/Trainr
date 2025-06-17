import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/stores/authStore';
import { Search, MessageCircle, Clock } from 'lucide-react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows, iconSizes } from '@/constants/theme';

interface Message {
  id: string;
  sender_name: string;
  sender_photo?: string;
  last_message: string;
  timestamp: string;
  unread_count: number;
  is_online: boolean;
}

export default function MessagesScreen() {
  const { userType } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const messages: Message[] = [
    {
      id: '1',
      sender_name: 'Mike Johnson',
      sender_photo: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=100',
      last_message: 'Great session today! Looking forward to our next workout.',
      timestamp: '2 min ago',
      unread_count: 0,
      is_online: true,
    },
    {
      id: '2',
      sender_name: 'Sarah Wilson',
      sender_photo: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=100',
      last_message: 'Can we reschedule tomorrow\'s session to 3 PM?',
      timestamp: '1 hour ago',
      unread_count: 2,
      is_online: false,
    },
    {
      id: '3',
      sender_name: 'Alex Rodriguez',
      sender_photo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
      last_message: 'Don\'t forget to bring your water bottle and towel.',
      timestamp: '3 hours ago',
      unread_count: 0,
      is_online: true,
    },
    {
      id: '4',
      sender_name: 'Emma Davis',
      sender_photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      last_message: 'Thank you for the workout plan! I\'ll start tomorrow.',
      timestamp: '1 day ago',
      unread_count: 0,
      is_online: false,
    },
  ];

  const filteredMessages = messages.filter(message =>
    message.sender_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMessage = ({ item }: { item: Message }) => (
    <TouchableOpacity style={styles.messageCard}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.sender_photo }} style={styles.avatar} />
        {item.is_online && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.senderName}>{item.sender_name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        
        <Text style={styles.lastMessage} numberOfLines={2}>
          {item.last_message}
        </Text>
      </View>
      
      {item.unread_count > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{item.unread_count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        
        <View style={styles.searchContainer}>
          <Search size={iconSizes.md} color={colors.gray[500]} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {filteredMessages.length > 0 ? (
        <FlatList
          data={filteredMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <MessageCircle size={48} color={colors.gray[300]} />
          <Text style={styles.emptyStateTitle}>
            {searchQuery ? 'No messages found' : 'No messages yet'}
          </Text>
          <Text style={styles.emptyStateSubtitle}>
            {searchQuery 
              ? 'Try searching with a different name'
              : userType === 'client' 
                ? 'Start a conversation with a trainer after booking a session'
                : 'Messages with your clients will appear here'
            }
          </Text>
        </View>
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
    marginBottom: spacing.xl,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...shadows.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: fontSize.lg,
    color: colors.text.primary,
  },
  messagesList: {
    paddingHorizontal: spacing.xxxl,
    paddingBottom: spacing.xxxl,
  },
  messageCard: {
    flexDirection: 'row',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
    ...shadows.md,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.lg,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.status.success,
    borderWidth: 2,
    borderColor: colors.background.secondary,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  senderName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.text.primary,
  },
  timestamp: {
    fontSize: fontSize.sm,
    color: colors.gray[500],
  },
  lastMessage: {
    fontSize: fontSize.md,
    color: colors.gray[500],
    lineHeight: 20,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  unreadCount: {
    color: colors.text.inverse,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semiBold,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxxl,
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
});