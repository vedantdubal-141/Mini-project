import React from 'react';
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import { BrutalTheme } from '../constants/brutalTheme';
import { useIssues } from '../context/IssueContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TenantHeader() {
  const router = useRouter();
  const { issues } = useIssues();

  const isWeb = Platform.OS === 'web';

  return (
    <View style={styles.container}>
      {/* Left: Avatar & Tenant Details */}
      <View style={styles.leftRow}>
        <View style={styles.avatarCircle}>
          <Ionicons name="business-outline" size={22} color="#000000" />
        </View>

        <View style={styles.infoCol}>
          <Text style={styles.titleText}>Unit 4B · Tenant</Text>
          <Text style={styles.subtitleText}>HabitatLedger Audit</Text>
        </View>
      </View>

      {/* Right: Star Badge & Action */}
      <View style={styles.rightRow}>
        {/* Blue/Cyan Star Badge like in reference */}
        <View
          style={[
            styles.badgePill,
            isWeb && { boxShadow: '2px 2px 0px #000000' },
          ]}
        >
          <Ionicons name="star" size={13} color="#000" style={styles.starIcon} />
          <Text style={styles.badgeText}>{issues.length} Cases</Text>
        </View>

        {/* Small Yellow Circle Action Button with 3D shadow */}
        <Pressable
          style={[
            styles.pencilBtn,
            isWeb && { boxShadow: '2px 2px 0px #000000', cursor: 'pointer' },
          ]}
          onPress={() => router.push('/create')}
        >
          <Ionicons name="pencil" size={14} color="#000" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 4,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    borderWidth: BrutalTheme.borders.regular,
    borderColor: BrutalTheme.colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        boxShadow: '2px 2px 0px #000000',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
      },
    }),
  },
  avatarEmoji: {
    fontSize: 22,
  },
  infoCol: {
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 17,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -0.3,
  },
  subtitleText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.55)',
    marginTop: 1,
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#67E8F9', // Sky Cyan like in reference
    borderWidth: BrutalTheme.borders.regular,
    borderColor: BrutalTheme.colors.black,
    borderRadius: BrutalTheme.radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 4,
  },
  starIcon: {
    marginRight: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000000',
  },
  pencilBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BrutalTheme.colors.yellow,
    borderWidth: BrutalTheme.borders.regular,
    borderColor: BrutalTheme.colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
