import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Platform,
  Linking,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import BrutalCard from '../../components/BrutalCard';
import {
  LEGAL_LAWS,
  STATE_COMPARISONS,
  AWARENESS_PROBLEMS,
  REMEDIATION_COSTS,
} from '../../constants/categories';
import { BrutalTheme } from '../../constants/brutalTheme';
import { Ionicons } from '@expo/vector-icons';

function TableCell({ cell, width }) {
  if (typeof cell === 'string') {
    return <Text style={[styles.tableTd, { width, paddingHorizontal: 6 }]}>{cell}</Text>;
  }

  const getIcon = () => {
    switch (cell.status) {
      case 'good':
        return <Ionicons name="checkmark-circle" size={13} color="#16A34A" style={{ marginRight: 3 }} />;
      case 'warning':
        return <Ionicons name="alert-circle" size={13} color="#D97706" style={{ marginRight: 3 }} />;
      case 'bad':
        return <Ionicons name="close-circle" size={13} color="#DC2626" style={{ marginRight: 3 }} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ width, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6 }}>
      {getIcon()}
      <Text style={[styles.tableTd, { flex: 1 }]}>{cell.text}</Text>
    </View>
  );
}

export default function RightsScreen() {
  const isFocused = useIsFocused();
  const [activeTab, setActiveTab] = useState('legal'); // 'legal' | 'awareness'
  const [expandedLawId, setExpandedLawId] = useState(null);
  const [expandedProblemId, setExpandedProblemId] = useState(null);
  const [showSources, setShowSources] = useState(false);

  const isWeb = Platform.OS === 'web';

  if (!isFocused && isWeb) {
    return null;
  }

  const toggleLaw = (id) => {
    setExpandedLawId((prev) => (prev === id ? null : id));
  };

  const toggleProblem = (idx) => {
    setExpandedProblemId((prev) => (prev === idx ? null : idx));
  };

  const openUrl = (url) => {
    if (url) Linking.openURL(url).catch(() => {});
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.responsiveWrapper}>
        {/* Top Segmented Switcher */}
        <View
          style={[
            styles.switcher,
            isWeb && { boxShadow: '3px 3px 0px #000000' },
          ]}
        >
          <Pressable
            style={[
              styles.switchBtn,
              activeTab === 'legal' && styles.activeSwitchBtn,
              isWeb && { cursor: 'pointer' },
            ]}
            onPress={() => {
              setActiveTab('legal');
              setExpandedLawId(null);
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name="scale-outline" size={16} color="#000000" />
              <Text style={[styles.switchText, activeTab === 'legal' && styles.activeSwitchText]}>
                Legal Protections
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.switchBtn,
              activeTab === 'awareness' && styles.activeSwitchBtn,
              isWeb && { cursor: 'pointer' },
            ]}
            onPress={() => {
              setActiveTab('awareness');
              setExpandedProblemId(null);
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name="construct-outline" size={16} color="#000000" />
              <Text style={[styles.switchText, activeTab === 'awareness' && styles.activeSwitchText]}>
                Housing Awareness
              </Text>
            </View>
          </Pressable>
        </View>

        {/* ══════════════════════════════════════════════════ */}
        {/* ── TAB 1: LEGAL PROTECTIONS ───────────────────── */}
        {/* ══════════════════════════════════════════════════ */}
        {activeTab === 'legal' && (
          <View>
            {/* Hero Card */}
            <BrutalCard
              backgroundColor="#EFF6FF"
              style={styles.heroCard}
              contentStyle={styles.heroContent}
            >
              <View style={styles.heroTagRow}>
                <Ionicons name="scale" size={18} color="#000000" />
                <View style={styles.heroPill}>
                  <Text style={styles.heroPillText}>STATUTORY KNOWLEDGE BASE</Text>
                </View>
              </View>
              <Text style={styles.heroTitle}>Your Rights as a Tenant & Buyer</Text>
              <Text style={styles.heroSubtitle}>
                A working knowledge of key federal and state housing laws is your most effective protection against illegal landlord conduct, undisclosed defects, and predatory builder practices.
              </Text>
              <Text style={styles.heroInstruction}>
                Tap any law below to expand full statutory rights, exceptions, and official citations.
              </Text>
            </BrutalCard>

            {/* Federal & State Laws Section */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>Federal & State Laws</Text>
              <Text style={styles.sectionCountBadge}>{LEGAL_LAWS.length} Acts</Text>
            </View>

            <View style={styles.cardsList}>
              {LEGAL_LAWS.map((law) => {
                const isExpanded = expandedLawId === law.id;
                return (
                  <BrutalCard key={law.id} style={styles.lawCard}>
                    <Pressable
                      onPress={() => toggleLaw(law.id)}
                      style={[styles.lawCardHeader, isWeb && { cursor: 'pointer' }]}
                    >
                      <View style={styles.lawHeaderLeft}>
                        <View style={styles.lawIconBox}>
                          <Ionicons name={law.iconName || 'shield'} size={20} color="#000" />
                        </View>
                        <View style={{ flex: 1 }}>
                          <View style={styles.lawMetaRow}>
                            <View style={styles.lawTagPill}>
                              <Text style={styles.lawTagText}>{law.tag}</Text>
                            </View>
                            <Text style={styles.lawAgencyText}>{law.agency}</Text>
                          </View>
                          <Text style={styles.lawTitle}>{law.title}</Text>
                          <Text style={styles.lawStatute}>{law.statute}</Text>
                        </View>
                      </View>
                      <View style={styles.expandChevron}>
                        <Ionicons
                          name={isExpanded ? 'chevron-up' : 'chevron-down'}
                          size={18}
                          color="#000000"
                        />
                      </View>
                    </Pressable>

                    {/* EXPANDED CONTENT */}
                    {isExpanded && (
                      <View style={styles.lawExpandedBody}>
                        <View style={styles.dashedSeparator} />

                        <Text style={styles.lawSummaryText}>{law.summary}</Text>

                        {law.warning && (
                          <View style={styles.warningBox}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6 }}>
                              <Ionicons name="warning" size={16} color="#DC2626" style={{ marginTop: 1 }} />
                              <Text style={styles.warningText}>{law.warning}</Text>
                            </View>
                          </View>
                        )}

                        <View style={styles.rightsSection}>
                          <Text style={styles.rightsHeading}>YOUR RIGHTS UNDER THIS LAW:</Text>
                          {law.rights.map((r, idx) => (
                            <View key={idx} style={styles.bulletItem}>
                              <Ionicons name="checkmark" size={14} color="#16A34A" style={{ marginTop: 2 }} />
                              <Text style={styles.bulletText}>{r}</Text>
                            </View>
                          ))}
                        </View>

                        {law.exceptions && (
                          <View style={styles.exceptionsSection}>
                            <Text style={styles.exceptionsHeading}>EXCEPTIONS & LIMITS:</Text>
                            {law.exceptions.map((ex, idx) => (
                              <View key={idx} style={styles.bulletItem}>
                                <Text style={styles.bulletDotSymbol}>•</Text>
                                <Text style={styles.exceptionText}>{ex}</Text>
                              </View>
                            ))}
                          </View>
                        )}

                        <Pressable
                          style={styles.sourceLinkBtn}
                          onPress={() => openUrl(law.sourceUrl)}
                        >
                          <Ionicons name="open-outline" size={14} color="#000" />
                          <Text style={styles.sourceLinkText}>
                            Read official source ({law.source})
                          </Text>
                        </Pressable>
                      </View>
                    )}
                  </BrutalCard>
                );
              })}
            </View>

            {/* State-by-State Comparison Table */}
            <View style={[styles.sectionHeaderRow, { marginTop: 24 }]}>
              <Text style={styles.sectionHeading}>State-by-State Protections</Text>
            </View>

            <BrutalCard style={styles.tableCard} contentStyle={{ padding: 12 }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.tableInner}>
                  {/* Table Header */}
                  <View style={styles.tableHeaderRow}>
                    <Text style={[styles.tableTh, { width: 140 }]}>Right / Standard</Text>
                    <Text style={[styles.tableTh, { width: 120 }]}>California</Text>
                    <Text style={[styles.tableTh, { width: 120 }]}>Texas</Text>
                    <Text style={[styles.tableTh, { width: 120 }]}>New York</Text>
                    <Text style={[styles.tableTh, { width: 120 }]}>Florida</Text>
                  </View>

                  {/* Table Rows */}
                  {STATE_COMPARISONS.map((row, i) => (
                    <View
                      key={i}
                      style={[
                        styles.tableTr,
                        i % 2 === 1 && { backgroundColor: BrutalTheme.colors.canvasMuted },
                      ]}
                    >
                      <Text style={[styles.tableTdBold, { width: 140 }]}>{row.right}</Text>
                      <TableCell cell={row.ca} width={120} />
                      <TableCell cell={row.tx} width={120} />
                      <TableCell cell={row.ny} width={120} />
                      <TableCell cell={row.fl} width={120} />
                    </View>
                  ))}
                </View>
              </ScrollView>
            </BrutalCard>
          </View>
        )}

        {/* ══════════════════════════════════════════════════ */}
        {/* ── TAB 2: HOUSING CRISIS & AWARENESS ──────────── */}
        {/* ══════════════════════════════════════════════════ */}
        {activeTab === 'awareness' && (
          <View>
            {/* Hero Card */}
            <BrutalCard
              backgroundColor="#FFF7ED"
              style={styles.heroCard}
              contentStyle={styles.heroContent}
            >
              <View style={styles.heroTagRow}>
                <Ionicons name="construct" size={18} color="#000000" />
                <View style={[styles.heroPill, { backgroundColor: '#FED7AA' }]}>
                  <Text style={styles.heroPillText}>HOUSING QUALITY CRISIS</Text>
                </View>
              </View>
              <Text style={styles.heroTitle}>Why This Application Exists</Text>
              <Text style={styles.heroSubtitle}>
                The residential construction market is in a structural crisis. Despite record-high prices, new builds skip foundational concrete curing, cut corners on waterproofing, and obscure catastrophic defects behind cosmetic finishes.
              </Text>
              <Text style={styles.heroInstruction}>
                HabitatLedger gives you an immutable, evidence-based ledger to document defects before builder warranties expire.
              </Text>
            </BrutalCard>

            {/* Core Problems Section */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>Systemic Defect Patterns</Text>
              <Text style={styles.sectionCountBadge}>{AWARENESS_PROBLEMS.length} Hazards</Text>
            </View>

            <View style={styles.cardsList}>
              {AWARENESS_PROBLEMS.map((prob, idx) => {
                const isExpanded = expandedProblemId === idx;
                const isCritical = prob.severity === 'critical';
                return (
                  <BrutalCard key={idx} style={styles.lawCard}>
                    <Pressable
                      onPress={() => toggleProblem(idx)}
                      style={[styles.lawCardHeader, isWeb && { cursor: 'pointer' }]}
                    >
                      <View style={styles.lawHeaderLeft}>
                        <View style={styles.lawIconBox}>
                          <Ionicons name={prob.iconName || 'alert-circle'} size={20} color="#000" />
                        </View>
                        <View style={{ flex: 1 }}>
                          <View style={styles.lawMetaRow}>
                            <View
                              style={[
                                styles.severityPill,
                                {
                                  backgroundColor: isCritical
                                    ? BrutalTheme.colors.coral
                                    : BrutalTheme.colors.yellow,
                                },
                              ]}
                            >
                              <Text style={styles.severityPillText}>
                                {prob.severity.toUpperCase()} RISK
                              </Text>
                            </View>
                          </View>
                          <Text style={styles.lawTitle}>{prob.title}</Text>
                        </View>
                      </View>
                      <View style={styles.expandChevron}>
                        <Ionicons
                          name={isExpanded ? 'chevron-up' : 'chevron-down'}
                          size={18}
                          color="#000000"
                        />
                      </View>
                    </Pressable>

                    {/* EXPANDED CONTENT */}
                    {isExpanded && (
                      <View style={styles.lawExpandedBody}>
                        <View style={styles.dashedSeparator} />
                        <Text style={styles.lawSummaryText}>{prob.detail}</Text>
                      </View>
                    )}
                  </BrutalCard>
                );
              })}
            </View>

            {/* Estimated Remediation Costs Table */}
            <View style={[styles.sectionHeaderRow, { marginTop: 24 }]}>
              <Text style={styles.sectionHeading}>Estimated Remediation Costs</Text>
            </View>

            <BrutalCard style={styles.tableCard} contentStyle={{ padding: 12 }}>
              <View style={styles.costsList}>
                {REMEDIATION_COSTS.map((c, i) => (
                  <View key={i} style={styles.costItemRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.costCategory}>{c.category}</Text>
                      <Text style={styles.costSigns}>{c.signs}</Text>
                    </View>
                    <View style={styles.costBadge}>
                      <Text style={styles.costText}>{c.cost}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </BrutalCard>

            {/* Zac Rios Documentary Investigation Spotlight */}
            <BrutalCard
              style={[styles.docuCard, { marginTop: 20 }]}
              contentStyle={styles.docuContent}
            >
              <Pressable
                onPress={() => openUrl('https://www.youtube.com/watch?v=w4Rr8tLHrpo')}
                style={isWeb ? { cursor: 'pointer' } : undefined}
              >
                <View style={styles.docuThumb}>
                  <View style={styles.playButton}>
                    <Ionicons name="play" size={24} color="#000" style={{ marginLeft: 3 }} />
                  </View>
                  <View style={styles.docuBadge}>
                    <Text style={styles.docuBadgeText}>YOUTUBE DOCUMENTARY</Text>
                  </View>
                </View>

                <View style={{ padding: 16 }}>
                  <Text style={styles.docuAuthor}>ZAC RIOS · 2025 INVESTIGATION</Text>
                  <Text style={styles.docuTitle}>
                    &quot;New Construction Homes Are Falling Apart&quot;
                  </Text>
                  <Text style={styles.docuDesc}>
                    Documents rushed framing timelines, skipped concrete curing, and builder obstruction of independent third-party inspections across the U.S.
                  </Text>
                </View>
              </Pressable>
            </BrutalCard>
          </View>
        )}

        {/* ── Collapsible Sources Dropdown ── */}
        <View style={styles.sourcesWrapper}>
          <Pressable
            style={[styles.sourcesToggleBtn, isWeb && { cursor: 'pointer' }]}
            onPress={() => setShowSources(!showSources)}
          >
            <Ionicons name="attach" size={16} color="#000" />
            <Text style={styles.sourcesToggleText}>
              Official Government & Legal Sources ({showSources ? 'Hide' : 'Show'})
            </Text>
            <Ionicons
              name={showSources ? 'chevron-up' : 'chevron-down'}
              size={14}
              color="#000"
            />
          </Pressable>

          {showSources && (
            <BrutalCard style={{ marginTop: 10 }}>
              <View style={styles.sourcesList}>
                <Text style={styles.sourcesNotice}>
                  All legal statutes compiled from EPA, HUD, CFPB, FTC, California Civil Code, Texas Property Code, and Florida Senate records.
                </Text>
                <Pressable
                  style={styles.sourceLink}
                  onPress={() => openUrl('https://www.epa.gov/lead')}
                >
                  <Text style={styles.sourceLinkTitle}>• EPA — Lead Hazard Disclosures (Title X)</Text>
                </Pressable>
                <Pressable
                  style={styles.sourceLink}
                  onPress={() => openUrl('https://www.hud.gov')}
                >
                  <Text style={styles.sourceLinkTitle}>• HUD — Fair Housing Act & Tenant Rights</Text>
                </Pressable>
                <Pressable
                  style={styles.sourceLink}
                  onPress={() => openUrl('https://www.consumerfinance.gov/data-research/hmda/')}
                >
                  <Text style={styles.sourceLinkTitle}>• CFPB — Home Mortgage Disclosure Act</Text>
                </Pressable>
                <Pressable
                  style={styles.sourceLink}
                  onPress={() => openUrl('https://consumer.ftc.gov/articles/warranties')}
                >
                  <Text style={styles.sourceLinkTitle}>• FTC — Magnuson-Moss Warranty Regulations</Text>
                </Pressable>
              </View>
            </BrutalCard>
          )}
        </View>

        {/* Disclaimer Footer */}
        <BrutalCard
          backgroundColor={BrutalTheme.colors.yellowLight}
          style={styles.disclaimerCard}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <Ionicons name="information-circle" size={16} color="#000000" />
            <Text style={styles.disclaimerTitle}>Legal Disclaimer</Text>
          </View>
          <Text style={styles.disclaimerText}>
            This dossier compiles key federal habitability mandates, statutory protections, and defect standards for evidence collection. It does not constitute formal attorney legal counsel. In active eviction or legal disputes, consult your local tenant union or legal aid bureau.
          </Text>
        </BrutalCard>
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
  switcher: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: BrutalTheme.borders.regular,
    borderColor: BrutalTheme.colors.black,
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
    ...Platform.select({
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0,
      },
    }),
  },
  switchBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeSwitchBtn: {
    backgroundColor: BrutalTheme.colors.yellow,
    borderWidth: 1.5,
    borderColor: '#000',
  },
  switchText: {
    fontSize: 13,
    fontWeight: '800',
    color: 'rgba(0,0,0,0.6)',
  },
  activeSwitchText: {
    color: '#000000',
    fontWeight: '900',
  },
  heroCard: {
    marginBottom: 18,
  },
  heroContent: {
    padding: 18,
  },
  heroTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  heroPill: {
    backgroundColor: '#BFDBFE',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  heroPillText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#000',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.75)',
    lineHeight: 19,
    fontWeight: '600',
    marginBottom: 10,
  },
  heroInstruction: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)',
    fontWeight: '700',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 6,
    paddingHorizontal: 2,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
    letterSpacing: -0.2,
  },
  sectionCountBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(0,0,0,0.55)',
  },
  cardsList: {
    gap: 12,
  },
  lawCard: {
    borderRadius: 18,
  },
  lawCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  lawHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  lawIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: BrutalTheme.colors.canvasMuted,
    borderWidth: 1.5,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  lawMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  lawTagPill: {
    backgroundColor: BrutalTheme.colors.yellow,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  lawTagText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#000',
  },
  lawAgencyText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.5)',
  },
  lawTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#000000',
    lineHeight: 20,
  },
  lawStatute: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.45)',
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  expandChevron: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#000',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lawExpandedBody: {
    marginTop: 10,
  },
  dashedSeparator: {
    height: 1,
    borderBottomWidth: 1.5,
    borderColor: '#000',
    borderStyle: 'dashed',
    marginBottom: 10,
  },
  lawSummaryText: {
    fontSize: 13,
    color: '#000000',
    lineHeight: 19,
    fontWeight: '600',
    marginBottom: 12,
  },
  warningBox: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  warningText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '800',
    lineHeight: 16,
  },
  rightsSection: {
    marginBottom: 12,
  },
  rightsHeading: {
    fontSize: 11,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 6,
  },
  bulletSymbol: {
    fontSize: 12,
    fontWeight: '900',
    color: '#16A34A',
    lineHeight: 18,
  },
  bulletDotSymbol: {
    fontSize: 14,
    fontWeight: '900',
    color: '#000',
    lineHeight: 18,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: '#000000',
    fontWeight: '600',
    lineHeight: 18,
  },
  exceptionsSection: {
    marginBottom: 12,
  },
  exceptionsHeading: {
    fontSize: 11,
    fontWeight: '900',
    color: 'rgba(0,0,0,0.5)',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  exceptionText: {
    flex: 1,
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
    fontWeight: '600',
    lineHeight: 17,
  },
  sourceLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: BrutalTheme.colors.yellow,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 4,
  },
  sourceLinkText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#000',
  },
  tableCard: {
    borderRadius: 18,
  },
  tableInner: {
    minWidth: 580,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#000',
    paddingBottom: 8,
    marginBottom: 4,
  },
  tableTh: {
    fontSize: 11,
    fontWeight: '900',
    color: '#000',
    paddingHorizontal: 6,
  },
  tableTr: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  tableTdBold: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000',
    paddingHorizontal: 6,
  },
  tableTd: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
  },
  severityPill: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  severityPillText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#000',
  },
  costsList: {
    gap: 8,
  },
  costItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  costCategory: {
    fontSize: 13,
    fontWeight: '900',
    color: '#000',
  },
  costSigns: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.55)',
    marginTop: 2,
  },
  costBadge: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  costText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#DC2626',
  },
  docuCard: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  docuContent: {
    padding: 0,
  },
  docuThumb: {
    height: 120,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: BrutalTheme.colors.yellow,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docuBadge: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    backgroundColor: '#000000',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  docuBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  docuAuthor: {
    fontSize: 10,
    fontWeight: '900',
    color: 'rgba(0,0,0,0.5)',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  docuTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
    marginBottom: 6,
  },
  docuDesc: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.65)',
    lineHeight: 17,
  },
  sourcesWrapper: {
    marginTop: 20,
  },
  sourcesToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  sourcesToggleText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000',
  },
  sourcesList: {
    gap: 8,
  },
  sourcesNotice: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 4,
  },
  sourceLink: {
    paddingVertical: 2,
  },
  sourceLinkTitle: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '700',
  },
  disclaimerCard: {
    marginTop: 18,
    marginBottom: 20,
  },
  disclaimerTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#000',
    marginBottom: 4,
  },
  disclaimerText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.7)',
    lineHeight: 17,
  },
});
