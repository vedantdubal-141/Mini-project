import React from 'react';
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import { BrutalTheme } from '../constants/brutalTheme';
import { useIssues } from '../context/IssueContext';
import { Ionicons } from '@expo/vector-icons';

/**
 * BrutalSummary — Metric Counter Boxes
 * Inspired by the countdown timer boxes in the reference: [ 1 ] : [ 15 ] : [ 32 ]
 * - White bordered boxes with 2px black border
 * - Solid 3D bottom-right drop shadow
 * - Heavyweight numbers with status indicators
 * - Tap to filter
 */
export default function BrutalSummary() {
  const { issues, selectedStatus, setSelectedStatus } = useIssues();
  const isWeb = Platform.OS === 'web';

  const counts = {
    total: issues.length,
    open: issues.filter((i) => i.status === 'open').length,
    in_progress: issues.filter((i) => i.status === 'in_progress').length,
    closed: issues.filter((i) => i.status === 'closed').length,
  };

  const criticalOpen = issues.filter(
    (i) => i.severity === 'critical' && i.status !== 'closed'
  ).length;

  const stats = [
    { key: '', label: 'TOTAL', count: counts.total, color: '#000000', bg: '#FFFFFF' },
    { key: 'open', label: 'OPEN', count: counts.open, color: BrutalTheme.colors.coral, bg: '#FFFFFF', alert: criticalOpen > 0 ? `${criticalOpen}` : null },
    { key: 'in_progress', label: 'ACTIVE', count: counts.in_progress, color: '#2563EB', bg: '#FFFFFF' },
    { key: 'closed', label: 'FIXED', count: counts.closed, color: BrutalTheme.colors.green, bg: '#FFFFFF' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {stats.map((item, idx) => {
          const isActive = selectedStatus === item.key;
          return (
            <React.Fragment key={item.label}>
              <Pressable
                style={styles.boxWrapper}
                onPress={() => setSelectedStatus(isActive ? '' : item.key)}
              >
                <View
                  style={[
                    styles.counterBox,
                    isActive && styles.activeBox,
                    isWeb && {
                      boxShadow: isActive
                        ? '0px 0px 0px #000000'
                        : '3px 3px 0px #000000',
                      transform: isActive
                        ? [{ translateY: 2 }, { translateX: 2 }]
                        : undefined,
                      cursor: 'pointer',
                    },
                  ]}
                >
                  <Text style={[styles.countNumber, { color: item.color }]}>
                    {item.count < 10 ? `0${item.count}` : item.count}
                  </Text>
                  {item.alert ? (
                    <View style={styles.alertSticker}>
                      <Ionicons name="warning" size={9} color="#FFFFFF" style={{ marginRight: 2 }} />
                      <Text style={styles.alertText}>{item.alert}</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={[styles.boxLabel, isActive && styles.activeLabel]}>
                  {item.label}
                </Text>
              </Pressable>
              {idx < stats.length - 1 && (
                <Text style={styles.separatorDot}>:</Text>
              )}
            </React.Fragment>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  counterBox: {
    width: '92%',
    height: 64,
    backgroundColor: '#FFFFFF',
    borderWidth: BrutalTheme.borders.regular,
    borderColor: BrutalTheme.colors.black,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
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
  activeBox: {
    backgroundColor: BrutalTheme.colors.yellow,
    borderColor: '#000000',
  },
  countNumber: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  boxLabel: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: 0.5,
  },
  activeLabel: {
    color: '#000000',
    textDecorationLine: 'underline',
  },
  separatorDot: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000000',
    paddingBottom: 20,
    opacity: 0.4,
  },
  alertSticker: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: BrutalTheme.colors.coral,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  alertText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
});
