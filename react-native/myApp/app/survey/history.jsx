import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '../../components/GlassCard';
import { useSurvey } from '../../context/SurveyContext';

export default function SurveyHistoryScreen() {
  const router = useRouter();
  const { surveys, deleteSurvey } = useSurvey();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filteredSurveys = useMemo(() => {
    return surveys.filter(s => {
      const matchesSearch = 
        s.siteName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.clientName?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPriority = priorityFilter === 'All' || s.priority?.toLowerCase() === priorityFilter.toLowerCase();

      return matchesSearch && matchesPriority;
    });
  }, [surveys, searchQuery, priorityFilter]);

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Survey',
      'Are you sure you want to permanently delete this survey?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => deleteSurvey(id)
        }
      ]
    );
  };

  const renderFilterChip = (label) => {
    const isActive = priorityFilter === label;
    return (
      <Pressable 
        style={[styles.filterChip, isActive && styles.filterChipActive]}
        onPress={() => setPriorityFilter(label)}
      >
        <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{label}</Text>
      </Pressable>
    );
  };

  const renderSurvey = ({ item }) => (
    <GlassCard style={styles.historyCard}>
      <Pressable 
        style={styles.cardPressable}
        onPress={() => router.push(`/survey/${item.id}`)}
      >
        <View style={styles.historyInfo}>
          <Text style={styles.historyTitle}>{item.siteName}</Text>
          <Text style={styles.historyClient}>{item.clientName}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.historyPriority}>{item.priority} Priority</Text>
            <Text style={styles.historyDate}>{item.date}</Text>
          </View>
        </View>
        
        <Pressable style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash-outline" size={20} color="rgba(0,0,0,0.6)" />
        </Pressable>
      </Pressable>
    </GlassCard>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Survey History</Text>
      </View>

      <View style={styles.controlsContainer}>
        <GlassCard style={styles.searchCard}>
          <Ionicons name="search" size={20} color="rgba(0,0,0,0.5)" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search site or client..."
            placeholderTextColor="rgba(0,0,0,0.4)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')} style={styles.clearSearchButton}>
              <Ionicons name="close-circle" size={20} color="rgba(0,0,0,0.4)" />
            </Pressable>
          )}
        </GlassCard>

        <View style={styles.filterRow}>
          {renderFilterChip('All')}
          {renderFilterChip('High')}
          {renderFilterChip('Med')}
          {renderFilterChip('Low')}
        </View>
      </View>

      <FlatList
        data={filteredSurveys}
        keyExtractor={item => item.id}
        renderItem={renderSurvey}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <GlassCard style={styles.emptyStateCard}>
            <Ionicons name="document-text-outline" size={48} color="rgba(0,0,0,0.4)" />
            <Text style={styles.emptyStateTitle}>No Surveys Found</Text>
            <Text style={styles.emptyStateText}>Try adjusting your search or filter.</Text>
          </GlassCard>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  controlsContainer: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
  },
  clearSearchButton: {
    padding: 4,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  filterChipActive: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderColor: 'rgba(0,0,0,0.8)',
  },
  filterText: {
    color: 'rgba(0,0,0,0.7)',
    fontWeight: '600',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#fff',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  historyCard: {
    marginBottom: 12,
    overflow: 'hidden',
  },
  cardPressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.9)',
    marginBottom: 4,
  },
  historyClient: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyPriority: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  historyDate: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)',
  },
  deleteButton: {
    padding: 12,
    marginLeft: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 24,
  },
  emptyStateCard: {
    alignItems: 'center',
    padding: 32,
    marginTop: 24,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    textAlign: 'center',
  },
});
