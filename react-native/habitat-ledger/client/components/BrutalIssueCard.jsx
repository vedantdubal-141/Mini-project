import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { CATEGORIES, SEVERITIES, STATUSES } from '../constants/categories';
import { BrutalTheme } from '../constants/brutalTheme';
import { useIssues } from '../context/IssueContext';
import CategoryIcon from './CategoryIcon';
import { Ionicons } from '@expo/vector-icons';

export default function BrutalIssueCard({ issue }) {
  const router = useRouter();
  const { togglePin } = useIssues();
  const [pressed, setPressed] = useState(false);

  const isWeb = Platform.OS === 'web';
  const id = issue._id || issue.id;
  const cat = CATEGORIES.find((c) => c.id === issue.category);
  const sev = SEVERITIES.find((s) => s.id === issue.severity);
  const sta = STATUSES.find((s) => s.id === issue.status);

  const formattedDate = issue.createdAt
    ? new Date(issue.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      })
    : '';

  const getSeverityBg = () => {
    switch (issue.severity) {
      case 'critical':
        return BrutalTheme.colors.coral;
      case 'high':
        return BrutalTheme.colors.yellow;
      case 'medium':
        return '#FDBA74';
      case 'low':
      default:
        return '#86EFAC';
    }
  };

  const getStatusBg = () => {
    switch (issue.status) {
      case 'closed':
        return BrutalTheme.colors.green;
      case 'in_progress':
        return BrutalTheme.colors.cyan;
      case 'open':
      default:
        return '#FF6B6B';
    }
  };

  return (
    <Pressable
      style={[
        styles.cardContainer,
        isWeb && {
          boxShadow: pressed
            ? '0px 0px 0px #000000'
            : '3px 4px 0px #000000',
          transform: pressed
            ? [{ translateY: 2 }, { translateX: 2 }]
            : undefined,
          cursor: 'pointer',
          transition: 'transform 0.08s ease, box-shadow 0.08s ease',
        },
        issue.pinned && styles.pinnedBorder,
      ]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => router.push(`/issue/${id}`)}
    >
      {/* Top Header Row */}
      <View style={styles.topRow}>
        <View style={styles.badgesRow}>
          {cat && (
            <View style={[styles.categoryBadge, { backgroundColor: cat.bg || '#F3F4F6' }]}>
              <CategoryIcon categoryId={cat.id} size={12} style={{ marginRight: 4 }} />
              <Text style={styles.categoryBadgeText}>
                {cat.label}
              </Text>
            </View>
          )}

          {sev && (
            <View style={[styles.severityBadge, { backgroundColor: getSeverityBg() }]}>
              <Text style={styles.severityBadgeText}>{sev.label.toUpperCase()}</Text>
            </View>
          )}
        </View>

        <Pressable
          hitSlop={10}
          onPress={(e) => {
            e.stopPropagation?.();
            togglePin(id);
          }}
          style={styles.pinBtn}
        >
          <Text style={styles.pinIcon}>{issue.pinned ? '⭐' : '☆'}</Text>
        </Pressable>
      </View>

      {/* Main Content Row: Vector Icon Circle + Title/Desc */}
      <View style={styles.bodyRow}>
        <View style={styles.catIconCircle}>
          <CategoryIcon categoryId={issue.category} size={20} />
        </View>

        <View style={styles.contentCol}>
          <Text style={styles.titleText} numberOfLines={2}>
            {issue.title}
          </Text>
          {issue.description ? (
            <Text style={styles.descText} numberOfLines={2}>
              {issue.description}
            </Text>
          ) : null}
        </View>
      </View>

      {/* Divider */}
      <View style={styles.dashedDivider} />

      {/* Footer Row */}
      <View style={styles.footerRow}>
        <View style={styles.statusRow}>
          <View style={[styles.statusPill, { backgroundColor: getStatusBg() }]}>
            <Text style={styles.statusPillText}>
              {sta?.label.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>

        <View style={styles.arrowCircle}>
          <Ionicons name="arrow-forward" size={14} color="#000000" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: BrutalTheme.borders.regular,
    borderColor: BrutalTheme.colors.black,
    borderRadius: BrutalTheme.radii.lg,
    padding: 16,
    marginBottom: 14,
    ...Platform.select({
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
      },
    }),
  },
  pinnedBorder: {
    backgroundColor: '#FFFEF5',
    borderColor: '#000000',
    borderLeftWidth: 6,
    borderLeftColor: BrutalTheme.colors.yellow,
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
    gap: 6,
    flexWrap: 'wrap',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#000',
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#000',
  },
  severityBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 0.5,
  },
  pinBtn: {
    padding: 2,
  },
  pinIcon: {
    fontSize: 18,
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  catIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: BrutalTheme.colors.canvasMuted,
    borderWidth: 1.5,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  contentCol: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000000',
    lineHeight: 22,
    marginBottom: 4,
  },
  descText: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.65)',
    lineHeight: 18,
  },
  dashedDivider: {
    height: 1,
    borderBottomWidth: 1.5,
    borderColor: '#000000',
    borderStyle: 'dashed',
    marginVertical: 10,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#000',
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 0.5,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.5)',
  },
  arrowCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: BrutalTheme.colors.yellow,
    borderWidth: 1.5,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
