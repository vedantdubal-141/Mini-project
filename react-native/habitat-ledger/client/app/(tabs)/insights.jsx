import React, { useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import BrutalCard from '../../components/BrutalCard';
import CategoryIcon from '../../components/CategoryIcon';
import { CATEGORIES, SEVERITIES } from '../../constants/categories';
import { BrutalTheme } from '../../constants/brutalTheme';
import { useIssues } from '../../context/IssueContext';
import { Ionicons } from '@expo/vector-icons';

export default function InsightsScreen() {
  const isFocused = useIsFocused();
  const { issues } = useIssues();
  const isWeb = Platform.OS === 'web';

  const stats = useMemo(() => {
    const total = issues.length;
    const open = issues.filter((i) => i.status === 'open').length;
    const inProgress = issues.filter((i) => i.status === 'in_progress').length;
    const closed = issues.filter((i) => i.status === 'closed').length;
    const critical = issues.filter((i) => i.severity === 'critical' && i.status !== 'closed').length;

    const byCat = CATEGORIES.map((cat) => ({
      ...cat,
      count: issues.filter((i) => i.category === cat.id).length,
    }))
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count);

    const maxCat = byCat.length > 0 ? byCat[0].count : 1;

    const closedWithDates = issues.filter(
      (i) => i.status === 'closed' && i.closedAt && i.createdAt
    );

    const avgDays =
      closedWithDates.length > 0
        ? Math.round(
            closedWithDates.reduce((acc, i) => {
              const diffMs = new Date(i.closedAt) - new Date(i.createdAt);
              return acc + Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
            }, 0) / closedWithDates.length
          )
        : 4;

    return { total, open, inProgress, closed, critical, byCat, maxCat, avgDays };
  }, [issues]);

  if (!isFocused && isWeb) {
    return null;
  }

  const statChips = [
    { label: 'TOTAL', count: stats.total, color: '#000000' },
    { label: 'OPEN', count: stats.open, color: BrutalTheme.colors.coral },
    { label: 'ACTIVE', count: stats.inProgress, color: '#2563EB' },
    { label: 'FIXED', count: stats.closed, color: BrutalTheme.colors.green },
    ...(stats.critical > 0
      ? [{ label: 'CRITICAL', count: stats.critical, color: BrutalTheme.colors.coral, isCritical: true }]
      : []),
    { label: 'AVG. TIME', count: `${stats.avgDays}d`, color: '#000000' },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.responsiveWrapper}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.tagPill}>
            <Text style={styles.tagPillText}>ANALYTICS & METRICS</Text>
          </View>
          <Text style={styles.headerTitle}>Property Insights</Text>
          <Text style={styles.headerSubtitle}>
            Real-time audit telemetry, category distributions, and resolution velocity.
          </Text>
        </View>

        {/* Top Metric Ticker Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tickerScroll}
        >
          {statChips.map((s, i) => (
            <View
              key={i}
              style={[
                styles.tickerChip,
                isWeb && { boxShadow: '2px 2px 0px #000000' },
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                {s.isCritical && <Ionicons name="warning" size={14} color={s.color} />}
                <Text style={[styles.tickerCount, { color: s.color }]}>{s.count}</Text>
              </View>
              <Text style={styles.tickerLabel}>{s.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* ── Issues by Category Card ── */}
        <BrutalCard style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>ISSUES BY CATEGORY</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{stats.byCat.length} Categories</Text>
            </View>
          </View>

          <View style={styles.categoryChartList}>
            {stats.byCat.map((cat) => {
              const widthPct = Math.max(8, (cat.count / stats.maxCat) * 100);
              return (
                <View key={cat.id} style={styles.catRow}>
                  <View style={styles.catLabelRow}>
                    <CategoryIcon categoryId={cat.id} size={16} />
                    <Text style={styles.catName} numberOfLines={1}>
                      {cat.label}
                    </Text>
                  </View>

                  <View style={styles.trackContainer}>
                    <View style={styles.trackBg}>
                      <View
                        style={[
                          styles.trackFill,
                          {
                            width: `${widthPct}%`,
                            backgroundColor: cat.color || BrutalTheme.colors.yellow,
                          },
                        ]}
                      />
                    </View>
                  </View>

                  <View style={styles.countPill}>
                    <Text style={styles.countText}>{cat.count}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </BrutalCard>

        {/* ── Severity Breakdown Card ── */}
        <BrutalCard style={styles.sectionCard}>
          <Text style={styles.cardTitle}>SEVERITY BREAKDOWN</Text>

          <View style={styles.severityList}>
            {SEVERITIES.map((sev) => {
              const count = issues.filter((i) => i.severity === sev.id).length;
              const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
              return (
                <View key={sev.id} style={styles.sevRow}>
                  <View style={styles.sevLabelCol}>
                    <View style={[styles.sevDot, { backgroundColor: sev.color }]} />
                    <Text style={styles.sevName}>{sev.label}</Text>
                  </View>

                  <View style={styles.trackContainer}>
                    <View style={styles.trackBg}>
                      <View
                        style={[
                          styles.trackFill,
                          {
                            width: `${pct}%`,
                            backgroundColor: sev.color,
                          },
                        ]}
                      />
                    </View>
                  </View>

                  <View style={styles.sevMeta}>
                    <Text style={[styles.sevCount, { color: sev.color }]}>{count}</Text>
                    <Text style={styles.sevPct}>({pct}%)</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {stats.critical > 0 && (
            <View
              style={[
                styles.criticalAlertBox,
                isWeb && { boxShadow: '2px 2px 0px #000' },
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Ionicons name="alert-circle" size={16} color="#DC2626" />
                <Text style={styles.criticalAlertText}>
                  <Text style={{ fontWeight: '900' }}>{stats.critical} Critical defect{stats.critical > 1 ? 's' : ''}</Text> requiring urgent mitigation
                </Text>
              </View>
            </View>
          )}
        </BrutalCard>

        {/* ── Frequent Category Spotlight ── */}
        {stats.byCat.length > 0 && (
          <BrutalCard
            backgroundColor={BrutalTheme.colors.yellowLight}
            style={styles.spotlightCard}
          >
            <View style={styles.spotlightRow}>
              <View style={styles.spotlightIconCircle}>
                <CategoryIcon categoryId={stats.byCat[0].id} size={22} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.spotlightTitle}>{stats.byCat[0].label}</Text>
                <Text style={styles.spotlightDesc}>
                  Most frequent maintenance category ({stats.byCat[0].count} issues logged).
                </Text>
              </View>
            </View>
          </BrutalCard>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrutalTheme.colors.canvas,
  },
  contentContainer: {
    paddingTop: Platform.OS === 'web' ? 20 : 50,
    paddingBottom: 120,
    alignItems: 'center',
  },
  responsiveWrapper: {
    width: '100%',
    maxWidth: 580,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 16,
  },
  tagPill: {
    alignSelf: 'flex-start',
    backgroundColor: BrutalTheme.colors.yellow,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 6,
  },
  tagPillText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.6)',
    marginTop: 4,
    lineHeight: 18,
  },
  tickerScroll: {
    gap: 8,
    marginBottom: 16,
    paddingRight: 10,
  },
  tickerChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: BrutalTheme.borders.regular,
    borderColor: BrutalTheme.colors.black,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    minWidth: 84,
    ...Platform.select({
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
      },
    }),
  },
  tickerCount: {
    fontSize: 18,
    fontWeight: '900',
  },
  tickerLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(0,0,0,0.5)',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  sectionCard: {
    marginBottom: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: 0.5,
  },
  countBadge: {
    backgroundColor: BrutalTheme.colors.canvasMuted,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#000',
  },
  categoryChartList: {
    gap: 12,
  },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  catLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 140,
  },
  catName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000000',
  },
  trackContainer: {
    flex: 1,
  },
  trackBg: {
    height: 12,
    backgroundColor: BrutalTheme.colors.canvasMuted,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#000',
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: 4,
  },
  countPill: {
    minWidth: 24,
    alignItems: 'flex-end',
  },
  countText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#000000',
  },
  severityList: {
    gap: 10,
    marginTop: 10,
  },
  sevRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sevLabelCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 80,
  },
  sevDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000',
  },
  sevName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000000',
  },
  sevMeta: {
    flexDirection: 'row',
    gap: 4,
    width: 60,
    justifyContent: 'flex-end',
  },
  sevCount: {
    fontSize: 12,
    fontWeight: '900',
  },
  sevPct: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.5)',
    fontWeight: '700',
  },
  criticalAlertBox: {
    marginTop: 14,
    backgroundColor: '#FEE2E2',
    borderWidth: 1.5,
    borderColor: '#000000',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  criticalAlertText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '700',
  },
  spotlightCard: {
    marginBottom: 20,
  },
  spotlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  spotlightIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spotlightTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#000000',
  },
  spotlightDesc: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.65)',
    fontWeight: '600',
    marginTop: 1,
  },
});
