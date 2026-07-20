import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Clipboard from 'expo-clipboard';
import { Theme } from '../constants/theme';
import GlassCard from '../components/GlassCard';
import { Ionicons } from '@expo/vector-icons';

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLocation = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      setLoading(false);
      return;
    }

    try {
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg('Failed to fetch location');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const copyToClipboard = async () => {
    if (location) {
      const text = `${location.coords.latitude}, ${location.coords.longitude}`;
      await Clipboard.setStringAsync(text);
      Alert.alert('Success', 'Location copied to clipboard');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Current Location</Text>
      
      <GlassCard style={styles.card}>
        {loading ? (
          <ActivityIndicator size="large" color={Theme.colors.primary} />
        ) : errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : location ? (
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Latitude</Text>
              <Text style={styles.value}>{location.coords.latitude.toFixed(5)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Longitude</Text>
              <Text style={styles.value}>{location.coords.longitude.toFixed(5)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Accuracy</Text>
              <Text style={styles.value}>± {location.coords.accuracy.toFixed(1)} m</Text>
            </View>
          </View>
        ) : null}
      </GlassCard>

      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={fetchLocation} disabled={loading}>
          <Ionicons name="refresh" size={24} color={Theme.colors.background} />
          <Text style={styles.actionText}>Refresh</Text>
        </Pressable>
        
        <Pressable 
          style={[styles.actionButton, !location && styles.actionButtonDisabled]} 
          onPress={copyToClipboard}
          disabled={!location}
        >
          <Ionicons name="copy-outline" size={24} color={Theme.colors.background} />
          <Text style={styles.actionText}>Copy Location</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: Theme.spacing.l,
    paddingTop: Theme.spacing.xl,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.l,
  },
  card: {
    padding: Theme.spacing.l,
    minHeight: 200,
    justifyContent: 'center',
  },
  infoContainer: {
    gap: Theme.spacing.m,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  label: {
    color: Theme.colors.textSecondary,
    fontSize: 16,
  },
  value: {
    color: Theme.colors.text,
    fontSize: 18,
    fontWeight: '500',
  },
  errorText: {
    color: Theme.colors.danger,
    textAlign: 'center',
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Theme.spacing.xl,
  },
  actionButton: {
    backgroundColor: Theme.colors.text,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.m,
    borderRadius: Theme.borderRadius.m,
    width: '48%',
    gap: 8,
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  actionText: {
    color: Theme.colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  }
});
