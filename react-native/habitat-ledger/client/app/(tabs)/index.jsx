import React, { useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, Platform, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import TenantHeader from '../../components/TenantHeader';
import BrutalSummary from '../../components/BrutalSummary';
import BrutalFilter from '../../components/BrutalFilter';
import BrutalIssueCard from '../../components/BrutalIssueCard';
import BrutalCard from '../../components/BrutalCard';
import BrutalButton from '../../components/BrutalButton';
import { useIssues } from '../../context/IssueContext';
import { BrutalTheme } from '../../constants/brutalTheme';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const isFocused = useIsFocused();
  const router = useRouter();
  const { issues, searchQuery, selectedCategory, selectedStatus } = useIssues();

  const isWeb = Platform.OS === 'web';

  const filteredIssues = useMemo(() => {
    return issues
      .filter((item) => {
        if (selectedStatus && item.status !== selectedStatus) return false;
        if (selectedCategory && item.category !== selectedCategory) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title?.toLowerCase().includes(q);
          const matchDesc = item.description?.toLowerCase().includes(q);
          return matchTitle || matchDesc;
        }
        return true;
      })
      .sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [issues, searchQuery, selectedCategory, selectedStatus]);

  if (!isFocused && isWeb) {
    return null;
  }

  return (
    <View style={styles.outerScreen}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.responsiveWrapper}>
          {/* Top Tenant Profile Header */}
          <TenantHeader />

          {/* Metric Summary Ticker Boxes */}
          <BrutalSummary />

          {/* Search & Category Filter */}
          <BrutalFilter />

          {/* Section Header */}
          <View style={styles.sectionHeaderRow}>
            <View style={styles.titleTagRow}>
              <Text style={styles.sectionTitle}>Documented Issues</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>{filteredIssues.length}</Text>
              </View>
            </View>
            <Text style={styles.sectionSubtitle}>EVIDENCE LOG</Text>
          </View>

          {/* Issues List */}
          {filteredIssues.length === 0 ? (
            <BrutalCard style={styles.emptyCard} contentStyle={styles.emptyContent}>
              <Ionicons name="folder-open-outline" size={44} color="#000000" style={{ marginBottom: 10 }} />
              <Text style={styles.emptyTitle}>No Matching Cases</Text>
              <Text style={styles.emptyDesc}>
                {searchQuery || selectedCategory || selectedStatus
                  ? 'No issues match your current filters. Try resetting the filters.'
                  : 'Your ledger is clean! Tap the yellow (+) button to log a property issue.'}
              </Text>
              <BrutalButton
                variant="yellow"
                size="md"
                style={{ marginTop: 16 }}
                onPress={() => router.push('/create')}
              >
                + Log New Issue
              </BrutalButton>
            </BrutalCard>
          ) : (
            filteredIssues.map((issue) => (
              <BrutalIssueCard key={issue._id || issue.id} issue={issue} />
            ))
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button (FAB) — Giant Yellow (+) Button */}
      <Pressable
        style={[
          styles.fabButton,
          isWeb && {
            boxShadow: '3px 4px 0px #000000',
            cursor: 'pointer',
          },
        ]}
        onPress={() => router.push('/create')}
      >
        <Ionicons name="add" size={32} color="#000000" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outerScreen: {
    flex: 1,
    backgroundColor: BrutalTheme.colors.canvas,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'web' ? 20 : 50,
    paddingBottom: 110,
    alignItems: 'center',
  },
  responsiveWrapper: {
    width: '100%',
    maxWidth: 580,
    paddingHorizontal: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
    paddingHorizontal: 2,
  },
  titleTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -0.3,
  },
  countBadge: {
    backgroundColor: BrutalTheme.colors.yellow,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 1,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#000000',
  },
  sectionSubtitle: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(0,0,0,0.5)',
    letterSpacing: 0.5,
  },
  emptyCard: {
    marginTop: 10,
    borderRadius: 20,
  },
  emptyContent: {
    alignItems: 'center',
    padding: 24,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.6)',
    textAlign: 'center',
    lineHeight: 18,
  },
  fabButton: {
    position: 'absolute',
    bottom: 90,
    right: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: BrutalTheme.colors.yellow,
    borderWidth: BrutalTheme.borders.thick,
    borderColor: BrutalTheme.colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 90,
    ...Platform.select({
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
      },
    }),
  },
});
