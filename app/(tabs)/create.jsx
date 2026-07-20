import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '../../components/GlassCard';
import { useSurvey } from '../../context/SurveyContext';

import { useRouter } from 'expo-router';

export default function CreateSurveyScreen() {
  const router = useRouter();
  const { addSurvey } = useSurvey();
  const [form, setForm] = useState({
    siteName: '',
    clientName: '',
    description: '',
    priority: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = () => {
    if (!form.siteName || !form.clientName || !form.priority) {
      Alert.alert('Validation Error', 'Please fill in all required fields (Site, Client, Priority).');
      return;
    }
    
    // Route to Preview Screen
    router.push({
      pathname: '/survey/preview',
      params: { surveyData: JSON.stringify(form) }
    });
  };

  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync();
    if (text) {
      setForm({ ...form, description: form.description ? `${form.description}\n${text}` : text });
    }
  };

  const handleClearClipboard = async () => {
    await Clipboard.setStringAsync('');
    Alert.alert('Cleared', 'Clipboard data has been cleared.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerText}>New Survey</Text>
      
      <GlassCard>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Site Name *</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Downtown Plaza"
            placeholderTextColor="rgba(0,0,0,0.3)"
            value={form.siteName}
            onChangeText={(text) => setForm({...form, siteName: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Client Name *</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Acme Corp"
            placeholderTextColor="rgba(0,0,0,0.3)"
            value={form.clientName}
            onChangeText={(text) => setForm({...form, clientName: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Description</Text>
            <Pressable onPress={handlePaste} style={styles.pasteButton}>
              <Ionicons name="clipboard-outline" size={16} color="rgba(0,0,0,0.6)" />
              <Text style={styles.pasteText}>Paste Notes</Text>
            </Pressable>
          </View>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            placeholder="Survey details..."
            placeholderTextColor="rgba(0,0,0,0.3)"
            multiline
            numberOfLines={3}
            value={form.description}
            onChangeText={(text) => setForm({...form, description: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Priority (High/Med/Low) *</Text>
          <TextInput 
            style={styles.input} 
            placeholder="High"
            placeholderTextColor="rgba(0,0,0,0.3)"
            value={form.priority}
            onChangeText={(text) => setForm({...form, priority: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <TextInput 
            style={styles.input} 
            value={form.date}
            editable={false}
          />
        </View>

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Review Survey</Text>
        </Pressable>

        <Pressable style={styles.clearButton} onPress={handleClearClipboard}>
          <Ionicons name="trash-outline" size={18} color="rgba(0,0,0,0.5)" />
          <Text style={styles.clearButtonText}>Clear Clipboard Data</Text>
        </Pressable>
      </GlassCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Transparent — wallpaper from _layout shows through
  },
  content: {
    padding: 24,
    paddingTop: 32,
    paddingBottom: 130,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    // Translucent input fields — not solid white
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 12,
    padding: 16,
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pasteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  pasteText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.7)',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 12,
    gap: 6,
  },
  clearButtonText: {
    color: 'rgba(0,0,0,0.5)',
    fontWeight: '500',
    fontSize: 14,
  }
});
