import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import BrutalCard from '../../components/BrutalCard';
import BrutalButton from '../../components/BrutalButton';
import CloseIssueModal from '../../components/CloseIssueModal';
import { CATEGORIES, SEVERITIES, STATUSES } from '../../constants/categories';
import { BrutalTheme } from '../../constants/brutalTheme';
import { useIssues } from '../../context/IssueContext';
import { Ionicons } from '@expo/vector-icons';

export default function IssueDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { issues, updateStatus, closeIssue, togglePin, deleteIssue } = useIssues();

  const [showCloseModal, setShowCloseModal] = useState(false);
  const isWeb = Platform.OS === 'web';

  const issue = issues.find((i) => (i._id || i.id) === id);

  if (!issue) {
    return (
      <View style={styles.notFoundContainer}>
        <BrutalCard style={styles.notFoundCard}>
          <Text style={styles.notFoundIcon}>🔍</Text>
          <Text style={styles.notFoundTitle}>Case Not Found</Text>
          <Text style={styles.notFoundDesc}>
            This violation entry does not exist or may have been deleted.
          </Text>
          <BrutalButton
            variant="yellow"
            size="md"
            onPress={() => router.replace('/(tabs)')}
          >
            ← Return to Ledger
          </BrutalButton>
        </BrutalCard>
      </View>
    );
  }

  const cat = CATEGORIES.find((c) => c.id === issue.category);
  const sev = SEVERITIES.find((s) => s.id === issue.severity);
  const sta = STATUSES.find((s) => s.id === issue.status);

  const handleDelete = () => {
    Alert.alert(
      'Delete Violation Record?',
      'This will permanently delete this defect record and history from the ledger.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteIssue(issue._id || issue.id);
            router.replace('/(tabs)');
          },
        },
      ]
    );
  };

  const handleCloseConfirm = (note) => {
    closeIssue(issue._id || issue.id, note);
    setShowCloseModal(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.responsiveWrapper}>
        {/* Top Nav Bar */}
        <View style={styles.navBar}>
          <BrutalButton
            variant="white"
            size="sm"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={16} color="#000" style={{ marginRight: 4 }} />
            <Text style={{ fontWeight: '800', fontSize: 13 }}>Cases</Text>
          </BrutalButton>

          <Pressable
            style={[
              styles.pinBtn,
              isWeb && { boxShadow: '2px 2px 0px #000', cursor: 'pointer' },
            ]}
            onPress={() => togglePin(issue._id || issue.id)}
          >
            <Text style={styles.pinIcon}>{issue.pinned ? '⭐' : '☆'}</Text>
          </Pressable>
        </View>

        {/* ── Main Header Card ── */}
        <BrutalCard style={styles.headerCard}>
          <View style={styles.badgesRow}>
            {cat && (
              <View style={[styles.badge, { backgroundColor: cat.bg || '#F3F4F6' }]}>
                <Text style={styles.badgeText}>
                  {cat.icon} {cat.label}
                </Text>
              </View>
            )}
            {sev && (
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor:
                      sev.id === 'critical'
                        ? BrutalTheme.colors.coral
                        : BrutalTheme.colors.yellow,
                  },
                ]}
              >
                <Text style={styles.badgeText}>{sev.label.toUpperCase()}</Text>
              </View>
            )}
            {sta && (
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor:
                      sta.id === 'closed'
                        ? BrutalTheme.colors.green
                        : sta.id === 'in_progress'
                          ? BrutalTheme.colors.cyan
                          : '#FF8A8A',
                  },
                ]}
              >
                <Text style={styles.badgeText}>
                  {sta.icon} {sta.label.toUpperCase()}
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.title}>{issue.title}</Text>

          <View style={styles.datesRow}>
            <Text style={styles.dateText}>
              LOGGED: {new Date(issue.createdAt).toLocaleDateString()}
            </Text>
            {issue.closedAt && (
              <Text style={[styles.dateText, { color: BrutalTheme.colors.green, fontWeight: '900' }]}>
                RESOLVED: {new Date(issue.closedAt).toLocaleDateString()}
              </Text>
            )}
          </View>
        </BrutalCard>

        {/* ── Description Card ── */}
        <BrutalCard style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>DEFECT DESCRIPTION</Text>
          <Text style={styles.descriptionText}>{issue.description}</Text>
        </BrutalCard>

        {/* ── Resolution Record (if closed) ── */}
        {issue.status === 'closed' && issue.closureNote && (
          <BrutalCard
            backgroundColor={BrutalTheme.colors.greenLight}
            style={styles.sectionCard}
          >
            <View style={styles.resolvedHeader}>
              <Text style={styles.resolvedTitle}>✅ OFFICIAL RESOLUTION STAMP</Text>
            </View>
            <Text style={styles.resolvedNote}>{issue.closureNote}</Text>
          </BrutalCard>
        )}

        {/* ── Media Evidence (if any) ── */}
        {issue.media && issue.media.length > 0 && (
          <BrutalCard style={styles.sectionCard}>
            <Text style={styles.sectionLabel}>PHOTO EVIDENCE ({issue.media.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mediaScroll}>
              {issue.media.map((item, idx) => (
                <View key={item.id || idx} style={styles.mediaItem}>
                  <Image source={{ uri: item.url }} style={styles.mediaImage} resizeMode="cover" />
                </View>
              ))}
            </ScrollView>
          </BrutalCard>
        )}

        {/* ── Timeline Events ── */}
        <BrutalCard style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>AUDIT TIMELINE</Text>
          {issue.timeline && issue.timeline.length > 0 ? (
            <View style={styles.timelineList}>
              {issue.timeline.map((evt, i) => (
                <View key={evt.id || i} style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <View style={styles.timelineBody}>
                    <Text style={styles.timelineNote}>{evt.note}</Text>
                    <Text style={styles.timelineTime}>
                      {new Date(evt.timestamp).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyTimeline}>Initial report registered.</Text>
          )}
        </BrutalCard>

        {/* ── Actions Card ── */}
        <BrutalCard style={styles.actionsCard}>
          <Text style={styles.sectionLabel}>STATUS ACTIONS</Text>

          {issue.status !== 'closed' ? (
            <View style={styles.statusActionCol}>
              {issue.status !== 'in_progress' && (
                <BrutalButton
                  variant="white"
                  size="md"
                  onPress={() => updateStatus(issue._id || issue.id, 'in_progress')}
                >
                  <Ionicons name="play-forward" size={14} color="#2563EB" style={{ marginRight: 6 }} />
                  <Text style={{ fontWeight: '800', color: '#000' }}>Mark In Progress</Text>
                </BrutalButton>
              )}

              {issue.status === 'in_progress' && (
                <BrutalButton
                  variant="white"
                  size="md"
                  onPress={() => updateStatus(issue._id || issue.id, 'open')}
                >
                  <Ionicons name="refresh" size={14} color="#EA580C" style={{ marginRight: 6 }} />
                  <Text style={{ fontWeight: '800', color: '#000' }}>Return to Open</Text>
                </BrutalButton>
              )}

              <BrutalButton
                variant="green"
                size="md"
                onPress={() => setShowCloseModal(true)}
              >
                <Ionicons name="checkmark-circle" size={16} color="#000" style={{ marginRight: 6 }} />
                <Text style={{ fontWeight: '900', color: '#000' }}>Close & Mark Resolved</Text>
              </BrutalButton>
            </View>
          ) : (
            <View style={styles.statusActionCol}>
              <BrutalButton
                variant="white"
                size="md"
                onPress={() => updateStatus(issue._id || issue.id, 'open')}
              >
                <Ionicons name="refresh" size={14} color="#000" style={{ marginRight: 6 }} />
                <Text style={{ fontWeight: '800', color: '#000' }}>Reopen Defect Case</Text>
              </BrutalButton>
            </View>
          )}

          <Pressable style={styles.deleteBtn} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={14} color="#DC2626" style={{ marginRight: 6 }} />
            <Text style={styles.deleteBtnText}>Delete Record from Ledger</Text>
          </Pressable>
        </BrutalCard>
      </View>

      <CloseIssueModal
        visible={showCloseModal}
        onClose={() => setShowCloseModal(false)}
        onConfirm={handleCloseConfirm}
      />
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
    paddingBottom: 60,
    alignItems: 'center',
  },
  responsiveWrapper: {
    width: '100%',
    maxWidth: 580,
    paddingHorizontal: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  pinBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: BrutalTheme.borders.regular,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
      },
    }),
  },
  pinIcon: {
    fontSize: 18,
  },
  headerCard: {
    marginBottom: 14,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#000',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#000',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#000000',
    lineHeight: 28,
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  datesRow: {
    flexDirection: 'row',
    gap: 14,
    borderTopWidth: 1.5,
    borderTopColor: '#000000',
    borderStyle: 'dashed',
    paddingTop: 10,
  },
  dateText: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.6)',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  sectionCard: {
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  descriptionText: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 21,
    fontWeight: '600',
  },
  resolvedHeader: {
    marginBottom: 6,
  },
  resolvedTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: 0.5,
  },
  resolvedNote: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
    fontWeight: '600',
  },
  mediaScroll: {
    marginTop: 6,
  },
  mediaItem: {
    width: 130,
    height: 130,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#000',
    overflow: 'hidden',
    marginRight: 10,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  timelineList: {
    marginTop: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000000',
    marginTop: 6,
    marginRight: 10,
  },
  timelineBody: {
    flex: 1,
  },
  timelineNote: {
    fontSize: 13,
    color: '#000000',
    fontWeight: '700',
  },
  timelineTime: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.5)',
    fontWeight: '600',
    marginTop: 1,
  },
  emptyTimeline: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)',
  },
  actionsCard: {
    marginBottom: 20,
  },
  statusActionCol: {
    gap: 10,
    marginTop: 4,
    marginBottom: 12,
  },
  deleteBtn: {
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1.5,
    borderTopColor: '#000000',
    borderStyle: 'dashed',
    marginTop: 4,
  },
  deleteBtnText: {
    color: BrutalTheme.colors.coral,
    fontWeight: '900',
    fontSize: 13,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: BrutalTheme.colors.canvas,
  },
  notFoundCard: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    padding: 24,
  },
  notFoundIcon: {
    fontSize: 44,
    marginBottom: 12,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 6,
  },
  notFoundDesc: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.6)',
    textAlign: 'center',
    marginBottom: 18,
  },
});
