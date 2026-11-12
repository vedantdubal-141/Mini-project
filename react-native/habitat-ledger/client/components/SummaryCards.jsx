import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import GlassCard from './GlassCard';
import { useIssues } from '../context/IssueContext';

export default function SummaryCards() {
  const { issues, selectedStatus, setSelectedStatus } = useIssues();

  const counts = {
    total: issues.length,
    open: issues.filter((i) => i.status === 'open').length,
    in_progress: issues.filter((i) => i.status === 'in_progress').length,
    closed: issues.filter((i) => i.status === 'closed').length,
  };

  const criticalOpen = issues.filter((i) => i.severity === 'critical' && i.status !== 'closed').length;

  const cards = [
    { key: '', label: 'Total Issues', count: counts.total, icon: '📋', color: '#1e293b', accent: 'rgba(30, 41, 59, 0.08)' },
    { key: 'open', label: 'Open', count: counts.open, icon: '🔴', color: '#dc2626', accent: 'rgba(220, 38, 38, 0.12)' },
    { key: 'in_progress', label: 'In Progress', count: counts.in_progress, icon: '🔵', color: '#2563eb', accent: 'rgba(37, 99, 235, 0.12)' },
    { key: 'closed', label: 'Resolved', count: counts.closed, icon: '✅', color: '#16a34a', accent: 'rgba(22, 163, 74, 0.12)' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {cards.map((card) => {
          const isActive = selectedStatus === card.key;
          return (
            <Pressable
              key={card.label}
              style={styles.cardWrapper}
              onPress={() => setSelectedStatus(isActive ? '' : card.key)}
            >
              <GlassCard
                style={[
                  styles.card,
                  isActive && { borderColor: card.color, borderWidth: 1.5 }
                ]}
                contentStyle={styles.cardContent}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardIcon}>{card.icon}</Text>
                  <Text style={[styles.cardCount, { color: card.color }]}>
                    {card.count}
                  </Text>
                </View>
                <Text style={styles.cardLabel}>{card.label}</Text>
                {card.key === 'open' && criticalOpen > 0 && (
                  <View style={styles.criticalBadge}>
                    <Text style={styles.criticalText}>🚨 {criticalOpen} critical</Text>
                  </View>
                )}
              </GlassCard>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48.5%',
    marginBottom: 12,
  },
  card: {
    minHeight: 100,
  },
  cardContent: {
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardIcon: {
    fontSize: 20,
  },
  cardCount: {
    fontSize: 28,
    fontWeight: '800',
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.65)',
  },
  criticalBadge: {
    marginTop: 6,
    backgroundColor: 'rgba(220, 38, 38, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  criticalText: {
    color: '#dc2626',
    fontSize: 11,
    fontWeight: '700',
  },
});
