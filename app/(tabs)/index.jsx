import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import GlassCard from '../../components/GlassCard';
import { Ionicons } from '@expo/vector-icons';
import { useSurvey } from '../../context/SurveyContext';

export default function DashboardScreen() {
  const router = useRouter();
  const { surveys } = useSurvey();

  // Generate a demo Survey ID and copy it to clipboard
  const copySurveyId = async () => {
    const id = 'SRV-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    await Clipboard.setStringAsync(id);
    Alert.alert('Copied!', `Survey ID "${id}" copied to clipboard.`);
  };

  const ActionCard = ({ title, icon, onPress }) => (
    <Pressable style={styles.actionCard} onPress={onPress}>
      <GlassCard style={styles.glassContainer}>
        <Ionicons name={icon} size={32} color="rgba(0,0,0,0.7)" />
        <Text style={styles.actionTitle}>{title}</Text>
      </GlassCard>
    </Pressable>
  );

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.welcomeText}>Welcome back,</Text>
      <Text style={styles.headerText}>Surveyor</Text>

      <GlassCard style={styles.statCard}>
        <Text style={styles.statLabel}>Today's Surveys</Text>
        <Text style={styles.statNumber}>{surveys.length}</Text>
      </GlassCard>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.grid}>
        <ActionCard 
          title="New Survey" 
          icon="add-circle-outline" 
          onPress={() => router.push('/create')} 
        />
        <ActionCard 
          title="Camera" 
          icon="camera-outline" 
          onPress={() => router.push('/camera')} 
        />
        <ActionCard 
          title="Location" 
          icon="location-outline" 
          onPress={() => router.push('/location')} 
        />
        <ActionCard 
          title="Contacts" 
          icon="people-outline" 
          onPress={() => router.push('/contacts')} 
        />
        <ActionCard 
          title="Copy Survey ID" 
          icon="copy-outline" 
          onPress={copySurveyId} 
        />
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Survey History</Text>
        {surveys.length > 0 && (
          <Pressable onPress={() => router.push('/survey/history')}>
            <Text style={styles.viewAllText}>View All</Text>
          </Pressable>
        )}
      </View>
      
      {surveys.length === 0 ? (
        <GlassCard style={styles.emptyHistory}>
          <Text style={styles.emptyText}>No surveys created yet today.</Text>
        </GlassCard>
      ) : (
        surveys.map((survey) => (
          <GlassCard key={survey.id} style={styles.historyCard}>
            <View style={styles.historyRow}>
              <View>
                <Text style={styles.historyTitle}>{survey.siteName}</Text>
                <Text style={styles.historyClient}>{survey.clientName} • {survey.priority} Priority</Text>
              </View>
              <Text style={styles.historyTime}>{new Date(parseInt(survey.id)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
            </View>
          </GlassCard>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // No backgroundColor — transparent so wallpaper shows through from _layout
  },
  content: {
    padding: 24,
    paddingBottom: 120,
  },
  welcomeText: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 32,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  statCard: {
    marginBottom: 32,
  },
  statLabel: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.5)',
  },
  statNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    marginBottom: 16,
  },
  glassContainer: {
    alignItems: 'center',
    padding: 24,
  },
  actionTitle: {
    color: 'rgba(0,0,0,0.7)',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  emptyHistory: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: 'rgba(0,0,0,0.5)',
    fontStyle: 'italic',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingRight: 8,
  },
  viewAllText: {
    color: 'rgba(0,0,0,0.6)',
    fontWeight: 'bold',
    fontSize: 14,
  },
  historyCard: {
    marginBottom: 12,
    padding: 16,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
    marginBottom: 4,
  },
  historyClient: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
  },
  historyTime: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.4)',
    fontWeight: 'bold',
  }
});
