import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import GlassCard from './GlassCard';
import { CATEGORIES, SEVERITIES, STATUSES } from '../constants/categories';
import { useIssues } from '../context/IssueContext';
import { Ionicons } from '@expo/vector-icons';

export default function IssueCard({ issue }) {
  const router = useRouter();
  const { togglePin } = useIssues();

  const id = issue._id || issue.id;
  const cat = CATEGORIES.find((c) => c.id === issue.category);
  const sev = SEVERITIES.find((s) => s.id === issue.severity);
  const sta = STATUSES.find((s) => s.id === issue.status);

  const formattedDate = issue.createdAt
    ? new Date(issue.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : '';

  return (
    <Pressable
      style={styles.cardPressable}
      onPress={() => router.push(`/issue/${id}`)}
    >
      <GlassCard
        style={[
          styles.card,
          issue.pinned && styles.pinnedBorder,
          issue.status === 'closed' && styles.closedCard,
        ]}
        contentStyle={styles.cardContent}
      >
        {/* Top Meta Row */}
        <View style={styles.topRow}>
          <View style={styles.badgesRow}>
            {cat && (
              <View style={[styles.badge, { backgroundColor: cat.bg }]}>
                <Text style={[styles.badgeText, { color: cat.color }]}>
                  {cat.icon} {cat.label}
                </Text>
              </View>
            )}
            {sev && (
              <View style={[styles.badge, { backgroundColor: sev.bg }]}>
                <Text style={[styles.badgeText, { color: sev.color }]}>
                  {sev.label}
                </Text>
              </View>
            )}
          </View>

          <Pressable
            hitSlop={10}
            onPress={(e) => {
              e.stopPropagation?.();
              togglePin(id);
            }}
          >
            <Text style={styles.pinIcon}>{issue.pinned ? '⭐' : '☆'}</Text>
          </Pressable>
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {issue.title}
        </Text>

        {/* Description snippet */}
        {issue.description ? (
          <Text style={styles.desc} numberOfLines={2}>
            {issue.description}
          </Text>
        ) : null}

        {/* Footer Row */}
        <View style={styles.footerRow}>
          <View style={styles.statusRow}>
            {sta && (
              <View style={[styles.statusBadge, { backgroundColor: sta.bg }]}>
                <Text style={[styles.statusText, { color: sta.color }]}>
                  {sta.icon} {sta.label}
                </Text>
              </View>
            )}
            {formattedDate ? (
              <Text style={styles.dateText}>{formattedDate}</Text>
            ) : null}
          </View>

          <View style={styles.arrowRow}>
            <Ionicons name="chevron-forward" size={16} color="rgba(0,0,0,0.4)" />
          </View>
        </View>
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardPressable: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 18,
  },
  cardContent: {
    padding: 16,
  },
  pinnedBorder: {
    borderColor: '#f59e0b',
    borderWidth: 1.5,
  },
  closedCard: {
    opacity: 0.82,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  pinIcon: {
    fontSize: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
    lineHeight: 22,
  },
  desc: {
    fontSize: 13,
    color: 'rgba(15, 23, 42, 0.72)',
    lineHeight: 18,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
    paddingTop: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  dateText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.45)',
    fontWeight: '500',
  },
  arrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
