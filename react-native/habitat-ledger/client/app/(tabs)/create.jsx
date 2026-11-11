import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import BrutalCard from '../../components/BrutalCard';
import BrutalButton from '../../components/BrutalButton';
import CategoryIcon from '../../components/CategoryIcon';
import { CATEGORIES, SEVERITIES } from '../../constants/categories';
import { BrutalTheme } from '../../constants/brutalTheme';
import { useIssues } from '../../context/IssueContext';
import { Ionicons } from '@expo/vector-icons';

export default function CreateIssueScreen() {
  const isFocused = useIsFocused();
  const router = useRouter();
  const { addIssue } = useIssues();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [severity, setSeverity] = useState('medium');
  const [media, setMedia] = useState([]);
  const [errors, setErrors] = useState({});

  const isWeb = Platform.OS === 'web';

  if (!isFocused && isWeb) {
    return null;
  }

  const pickFromGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera roll permissions are needed to attach photos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        setMedia((prev) => [
          ...prev,
          {
            id: 'med-' + Date.now(),
            url: asset.uri,
            type: 'image',
            name: asset.fileName || 'photo.jpg',
          },
        ]);
      }
    } catch (_e) {
      Alert.alert('Error', 'Could not open image picker.');
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera permission is required to capture photos.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        setMedia((prev) => [
          ...prev,
          {
            id: 'med-' + Date.now(),
            url: asset.uri,
            type: 'image',
            name: 'camera_capture.jpg',
          },
        ]);
      }
    } catch (_e) {
      Alert.alert('Error', 'Could not launch camera.');
    }
  };

  const removeMedia = (id) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSave = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Issue title is required';
    if (!category) newErrors.category = 'Please select a category';
    if (!description.trim()) newErrors.description = 'Please provide a detailed description';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert('Incomplete Form', 'Please fill in the required fields before submitting.');
      return;
    }

    addIssue({
      title: title.trim(),
      description: description.trim(),
      category,
      severity,
      media,
    });

    Alert.alert('Logged Successfully', 'The defect case has been documented in your ledger.', [
      { text: 'View Cases', onPress: () => router.push('/(tabs)') },
    ]);

    // Reset
    setTitle('');
    setDescription('');
    setCategory('');
    setSeverity('medium');
    setMedia([]);
    setErrors({});
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.responsiveWrapper}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.tagPill}>
            <Text style={styles.tagPillText}>NEW AUDIT ENTRY</Text>
          </View>
          <Text style={styles.headerTitle}>Document Defect</Text>
          <Text style={styles.headerSubtitle}>
            Create an unalterable timestamped case file for housing code violations.
          </Text>
        </View>

        {/* ── Title & Description Card ── */}
        <BrutalCard style={styles.sectionCard}>
          <Text style={styles.fieldLabel}>Defect Title *</Text>
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            placeholder="e.g. Water dripping under bathroom sink"
            placeholderTextColor="rgba(0,0,0,0.35)"
            value={title}
            onChangeText={(val) => {
              setTitle(val);
              if (errors.title) setErrors((e) => ({ ...e, title: '' }));
            }}
          />
          {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}

          <Text style={[styles.fieldLabel, { marginTop: 14 }]}>Detailed Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea, errors.description && styles.inputError]}
            placeholder="Describe the exact location, when it started, and landlord responses..."
            placeholderTextColor="rgba(0,0,0,0.35)"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={(val) => {
              setDescription(val);
              if (errors.description) setErrors((e) => ({ ...e, description: '' }));
            }}
          />
          {errors.description ? (
            <Text style={styles.errorText}>{errors.description}</Text>
          ) : null}
        </BrutalCard>

        {/* ── Category Picker Card ── */}
        <BrutalCard style={styles.sectionCard}>
          <Text style={styles.fieldLabel}>Defect Category *</Text>
          {errors.category ? <Text style={styles.errorText}>{errors.category}</Text> : null}
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <Pressable
                  key={cat.id}
                  style={[
                    styles.categoryBtn,
                    isSelected && styles.categoryBtnActive,
                    isWeb && {
                      boxShadow: isSelected ? '1px 1px 0px #000' : '2px 2px 0px #000',
                      cursor: 'pointer',
                    },
                  ]}
                  onPress={() => {
                    setCategory(cat.id);
                    if (errors.category) setErrors((e) => ({ ...e, category: '' }));
                  }}
                >
                  <CategoryIcon categoryId={cat.id} size={18} style={{ marginRight: 8 }} />
                  <Text style={[styles.catText, isSelected && styles.catTextActive]}>
                    {cat.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </BrutalCard>

        {/* ── Severity Level Card ── */}
        <BrutalCard style={styles.sectionCard}>
          <Text style={styles.fieldLabel}>Severity & Urgency</Text>
          <View style={styles.severityRow}>
            {SEVERITIES.map((sev) => {
              const isSelected = severity === sev.id;
              return (
                <Pressable
                  key={sev.id}
                  style={[
                    styles.severityBtn,
                    isSelected && {
                      backgroundColor: sev.id === 'critical' ? BrutalTheme.colors.coral : BrutalTheme.colors.yellow,
                    },
                    isWeb && {
                      boxShadow: isSelected ? '1px 1px 0px #000' : '2px 2px 0px #000',
                      cursor: 'pointer',
                    },
                  ]}
                  onPress={() => setSeverity(sev.id)}
                >
                  <Text style={[styles.sevText, isSelected && { fontWeight: '900' }]}>
                    {sev.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 6 }}>
            <Ionicons name="information-circle-outline" size={14} color="rgba(0,0,0,0.6)" />
            <Text style={styles.sevHint}>
              {SEVERITIES.find((s) => s.id === severity)?.hint}
            </Text>
          </View>
        </BrutalCard>

        {/* ── Photo Evidence Card ── */}
        <BrutalCard style={styles.sectionCard}>
          <Text style={styles.fieldLabel}>Photo Evidence ({media.length})</Text>
          <Text style={styles.hintText}>
            Attach photo proof of property damage or contractor notes.
          </Text>

          <View style={styles.mediaButtonsRow}>
            <BrutalButton
              variant="white"
              size="sm"
              style={{ flex: 1 }}
              onPress={takePhoto}
            >
              <Ionicons name="camera" size={16} color="#000" style={{ marginRight: 6 }} />
              <Text style={{ fontWeight: '800', fontSize: 13 }}>Camera</Text>
            </BrutalButton>

            <BrutalButton
              variant="white"
              size="sm"
              style={{ flex: 1 }}
              onPress={pickFromGallery}
            >
              <Ionicons name="images" size={16} color="#000" style={{ marginRight: 6 }} />
              <Text style={{ fontWeight: '800', fontSize: 13 }}>Gallery</Text>
            </BrutalButton>
          </View>

          {media.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.mediaThumbScroll}
            >
              {media.map((item) => (
                <View key={item.id} style={styles.thumbWrapper}>
                  <Image source={{ uri: item.url }} style={styles.thumbImage} />
                  <Pressable
                    style={styles.thumbRemove}
                    onPress={() => removeMedia(item.id)}
                  >
                    <Ionicons name="close" size={12} color="#fff" />
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          )}
        </BrutalCard>

        {/* ── Submit Button (Yellow 3D Button) ── */}
        <BrutalButton
          variant="yellow"
          size="lg"
          tilted
          tiltAngle="-1deg"
          style={styles.submitBtn}
          onPress={handleSave}
        >
          <Ionicons name="flash" size={18} color="#000" style={{ marginRight: 6 }} />
          <Text style={{ fontWeight: '900', fontSize: 16 }}>Submit to Case Ledger</Text>
        </BrutalButton>
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
  sectionCard: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 8,
  },
  hintText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.55)',
    marginBottom: 10,
  },
  input: {
    backgroundColor: BrutalTheme.colors.canvasMuted,
    borderWidth: BrutalTheme.borders.regular,
    borderColor: BrutalTheme.colors.black,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  textArea: {
    minHeight: 85,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: BrutalTheme.colors.coral,
    backgroundColor: '#FFF0F0',
  },
  errorText: {
    color: BrutalTheme.colors.coral,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 4,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  categoryBtn: {
    width: '48.5%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: BrutalTheme.borders.regular,
    borderColor: BrutalTheme.colors.black,
    ...Platform.select({
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
      },
    }),
  },
  categoryBtnActive: {
    backgroundColor: BrutalTheme.colors.yellow,
  },
  catIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  catText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000',
    flexShrink: 1,
  },
  catTextActive: {
    fontWeight: '900',
  },
  severityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  severityBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: BrutalTheme.borders.regular,
    borderColor: BrutalTheme.colors.black,
    ...Platform.select({
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
      },
    }),
  },
  sevText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000',
  },
  sevHint: {
    marginTop: 8,
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
    fontWeight: '600',
  },
  mediaButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  mediaThumbScroll: {
    gap: 10,
    paddingVertical: 6,
  },
  thumbWrapper: {
    position: 'relative',
    width: 72,
    height: 72,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    overflow: 'hidden',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  thumbRemove: {
    position: 'absolute',
    top: 3,
    right: 3,
    backgroundColor: '#000000',
    borderRadius: 8,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtn: {
    marginTop: 10,
    marginBottom: 20,
  },
});
