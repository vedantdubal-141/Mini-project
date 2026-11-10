import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, Platform } from 'react-native';
import { CATEGORIES } from '../constants/categories';
import { useIssues } from '../context/IssueContext';
import { BrutalTheme } from '../constants/brutalTheme';
import CategoryIcon from './CategoryIcon';
import { Ionicons } from '@expo/vector-icons';

export default function BrutalFilter() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
  } = useIssues();

  const isWeb = Platform.OS === 'web';

  return (
    <View style={styles.container}>
      {/* Pill Search Input */}
      <View
        style={[
          styles.searchBarWrapper,
          isWeb && { boxShadow: '3px 3px 0px #000000' },
        ]}
      >
        <Ionicons name="search" size={18} color="#000000" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search defects, rooms, code issues..."
          placeholderTextColor="rgba(0,0,0,0.4)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery('')} style={styles.clearBtn}>
            <Ionicons name="close-circle" size={18} color="#000000" />
          </Pressable>
        )}
      </View>

      {/* Horizontal Category Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsScroll}
      >
        <Pressable
          style={[
            styles.chip,
            !selectedCategory && styles.activeChip,
            isWeb && {
              boxShadow: !selectedCategory ? '2px 2px 0px #000000' : '1.5px 1.5px 0px #000000',
              cursor: 'pointer',
            },
          ]}
          onPress={() => setSelectedCategory('')}
        >
          <Ionicons name="grid" size={14} color="#000000" style={{ marginRight: 6 }} />
          <Text style={[styles.chipText, !selectedCategory && styles.activeChipText]}>
            All
          </Text>
        </Pressable>

        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <Pressable
              key={cat.id}
              style={[
                styles.chip,
                isActive && styles.activeChip,
                isWeb && {
                  boxShadow: isActive ? '2px 2px 0px #000000' : '1.5px 1.5px 0px #000000',
                  cursor: 'pointer',
                },
              ]}
              onPress={() => setSelectedCategory(isActive ? '' : cat.id)}
            >
              <CategoryIcon categoryId={cat.id} size={14} style={{ marginRight: 6 }} />
              <Text style={[styles.chipText, isActive && styles.activeChipText]}>
                {cat.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Active Filter Status Indicator */}
      {(selectedCategory || selectedStatus) && (
        <View style={styles.activeFilterRow}>
          <Text style={styles.filterStateText}>
            FILTERED: {selectedStatus ? selectedStatus.toUpperCase() : ''}{' '}
            {selectedCategory ? `[${selectedCategory.toUpperCase()}]` : ''}
          </Text>
          <Pressable
            onPress={() => {
              setSelectedCategory('');
              setSelectedStatus('');
            }}
          >
            <Text style={styles.resetText}>RESET ✕</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: BrutalTheme.borders.regular,
    borderColor: BrutalTheme.colors.black,
    borderRadius: BrutalTheme.radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
    ...Platform.select({
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 3,
      },
    }),
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    padding: 0,
  },
  clearBtn: {
    padding: 2,
  },
  chipsScroll: {
    gap: 8,
    paddingRight: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: BrutalTheme.borders.regular,
    borderColor: BrutalTheme.colors.black,
    borderRadius: BrutalTheme.radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 7,
    ...Platform.select({
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 2,
      },
    }),
  },
  activeChip: {
    backgroundColor: BrutalTheme.colors.yellow,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000000',
  },
  activeChipText: {
    color: '#000000',
  },
  activeFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  filterStateText: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(0,0,0,0.6)',
    letterSpacing: 0.5,
  },
  resetText: {
    fontSize: 11,
    fontWeight: '900',
    color: BrutalTheme.colors.coral,
    textDecorationLine: 'underline',
  },
});
