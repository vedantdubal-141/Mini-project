import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '../../components/GlassCard';
import { useSurvey } from '../../context/SurveyContext';

export default function SurveyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { surveys, deleteSurvey } = useSurvey();
  
  const survey = surveys.find(s => s.id === id);

  if (!survey) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Survey not found.</Text>
        <Pressable style={styles.backButtonLarge} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Survey',
      'Are you sure you want to permanently delete this survey?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => {
            deleteSurvey(id);
            router.back();
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerText}>Survey Details</Text>
      </View>
      
      <GlassCard style={styles.card}>
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Site Name:</Text>
          <Text style={styles.value}>{survey.siteName}</Text>
        </View>
        <View style={styles.divider} />
        
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Client Name:</Text>
          <Text style={styles.value}>{survey.clientName}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.fieldRow}>
          <Text style={styles.label}>Priority:</Text>
          <Text style={styles.value}>{survey.priority}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.fieldRow}>
          <Text style={styles.label}>Date Created:</Text>
          <Text style={styles.value}>{survey.date}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.fieldRow}>
          <Text style={styles.label}>Timestamp:</Text>
          <Text style={styles.value}>{new Date(parseInt(survey.id)).toLocaleString()}</Text>
        </View>

        {survey.description ? (
          <>
            <View style={styles.divider} />
            <Text style={[styles.label, { marginBottom: 8 }]}>Description / Notes:</Text>
            <Text style={styles.valueBlock}>{survey.description}</Text>
          </>
        ) : null}
      </GlassCard>

      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash" size={20} color="#fff" />
        <Text style={styles.buttonText}>Delete Survey</Text>
      </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
  },
  content: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  backButtonLarge: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  card: {
    padding: 16,
    marginBottom: 24,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.9)',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
  valueBlock: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.9)',
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,59,48,0.8)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
