import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
} from 'react-native';
import BrutalCard from './BrutalCard';
import BrutalButton from './BrutalButton';
import { BrutalTheme } from '../constants/brutalTheme';

export default function CloseIssueModal({ visible, onClose, onConfirm }) {
  const [note, setNote] = useState('');

  const handleConfirm = () => {
    onConfirm(note.trim() || 'Resolved and inspected by tenant.');
    setNote('');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.centerContainer}>
          <BrutalCard
            style={styles.modalCard}
            contentStyle={styles.cardContent}
          >
            {/* Header Badge */}
            <View style={styles.badgePill}>
              <Text style={styles.badgeText}>OFFICIAL RESOLUTION</Text>
            </View>

            <Text style={styles.title}>Close Defect Case</Text>
            <Text style={styles.subtitle}>
              Enter resolution notes (e.g. contractor name, invoice #, date repaired) for your audit trail.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. Plumber replaced P-trap joint and tested water flow..."
              placeholderTextColor="rgba(0,0,0,0.35)"
              multiline
              numberOfLines={4}
              value={note}
              onChangeText={setNote}
            />

            <View style={styles.buttonRow}>
              <BrutalButton
                variant="white"
                size="md"
                style={{ flex: 1 }}
                onPress={onClose}
              >
                Cancel
              </BrutalButton>

              <BrutalButton
                variant="green"
                size="md"
                style={{ flex: 1 }}
                onPress={handleConfirm}
              >
                ✓ Mark Resolved
              </BrutalButton>
            </View>
          </BrutalCard>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  centerContainer: {
    width: '100%',
    maxWidth: 480,
  },
  modalCard: {
    borderRadius: 24,
  },
  cardContent: {
    padding: 24,
  },
  badgePill: {
    alignSelf: 'flex-start',
    backgroundColor: BrutalTheme.colors.green,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.6)',
    lineHeight: 18,
    marginBottom: 16,
  },
  input: {
    backgroundColor: BrutalTheme.colors.canvasMuted,
    borderWidth: BrutalTheme.borders.regular,
    borderColor: BrutalTheme.colors.black,
    borderRadius: 14,
    padding: 12,
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    minHeight: 90,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
