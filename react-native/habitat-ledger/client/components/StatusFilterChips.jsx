import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput } from 'react-native';
import { CATEGORIES } from '../constants/categories';
import { useIssues } from '../context/IssueContext';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from './GlassCard';

export default function StatusFilterChips() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
  } = useIssues();

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <GlassCard style={styles.searchCard} contentStyle={styles.searchContent}>
        <Ionicons name="search" size={18} color="rgba(0,0,0,0.5)" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search issues, defects, rooms..."
          placeholderTextColor="rgba(0,0,0,0.4)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="rgba(0,0,0,0.4)" />
          </Pressable>
        )}
      </GlassCard>

      {/* Category Horizontal Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsScroll}
      >
        <Pressable
          style={[
            styles.chip,
            !selectedCategory && styles.activeChip,
          ]}
          onPress={() => setSelectedCategory('')}
        >
          <Text style={[styles.chipText, !selectedCategory && styles.activeChipText]}>
            🌐 All
          </Text>
        </Pressable>

        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <Pressable
              key={cat.id}
              style={[
                styles.chip,
                isActive && { backgroundColor: 'rgba(0,0,0,0.8)', borderColor: '#000' },
              ]}
              onPress={() => setSelectedCategory(isActive ? '' : cat.id)}
            >
              <Text style={[styles.chipText, isActive && styles.activeChipText]}>
                {cat.icon} {cat.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Active Filter Clear Pill (if filtered) */}
      {(selectedCategory || selectedStatus) && (
        <View style={styles.activeFilterRow}>
          <Text style={styles.filterStateText}>
            Filtering by: {selectedStatus ? selectedStatus.toUpperCase() : ''} {selectedCategory ? `[${selectedCategory}]` : ''}
          </Text>
          <Pressable
            onPress={() => {
              setSelectedCategory('');
              setSelectedStatus('');
            }}
          >
            <Text style={styles.clearAllText}>Reset</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  searchCard: {
    marginBottom: 12,
    borderRadius: 14,
  },
  searchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    padding: 0,
  },
  chipsScroll: {
    paddingRight: 10,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  activeChip: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderColor: '#000',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.75)',
  },
  activeChipText: {
    color: '#ffffff',
  },
  activeFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  filterStateText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowRadius: 3,
  },
  clearAllText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
