import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Image, Alert, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Theme } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '../components/GlassCard';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [facing, setFacing] = useState('back');

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  if (!permission) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centerContainer}>
        <GlassCard style={{ alignItems: 'center' }}>
          <Text style={styles.text}>We need your permission to show the camera</Text>
          <Pressable style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Grant Permission</Text>
          </Pressable>
        </GlassCard>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      setIsTakingPhoto(true);
      try {
        const photoData = await cameraRef.current.takePictureAsync();
        setPhoto({ ...photoData, time: new Date().toLocaleString() });
      } catch (error) {
        Alert.alert('Error', 'Failed to take photo');
      } finally {
        setIsTakingPhoto(false);
      }
    }
  };

  const deletePhoto = () => {
    Alert.alert('Delete Photo', 'Are you sure you want to delete this photo?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setPhoto(null) },
    ]);
  };

  const savePhoto = async () => {
    if (!mediaPermission?.granted) {
      const { status } = await requestMediaPermission();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'We need media library permissions to save photos.');
        return;
      }
    }

    try {
      setIsSaving(true);
      await MediaLibrary.createAssetAsync(photo.uri);
      Alert.alert('Saved!', 'Photo saved to your gallery.');
    } catch (error) {
      Alert.alert('Error', 'Failed to save photo.');
    } finally {
      setIsSaving(false);
    }
  };

  if (photo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photo.uri }} style={styles.preview} />
        <View style={styles.previewOverlay}>
          <GlassCard style={styles.photoInfoCard}>
            <Text style={styles.photoTimeText}>Captured: {photo.time}</Text>
          </GlassCard>
          <View style={styles.previewActions}>
            <Pressable style={styles.actionButton} onPress={() => setPhoto(null)}>
              <Ionicons name="refresh" size={24} color={Theme.colors.text} />
              <Text style={styles.actionText}>Retake</Text>
            </Pressable>
            
            <Pressable 
              style={styles.actionButton} 
              onPress={savePhoto}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color={Theme.colors.text} />
              ) : (
                <Ionicons name="save-outline" size={24} color={Theme.colors.text} />
              )}
              <Text style={styles.actionText}>Save</Text>
            </Pressable>

            <Pressable style={styles.actionButton} onPress={deletePhoto}>
              <Ionicons name="trash-outline" size={24} color={Theme.colors.text} />
              <Text style={styles.actionText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} facing={facing}>
        <View style={styles.cameraActions}>
          <Pressable style={styles.iconButton} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse-outline" size={32} color="#fff" />
          </Pressable>

          <Pressable style={styles.captureButton} onPress={takePicture} disabled={isTakingPhoto}>
            {isTakingPhoto ? (
              <ActivityIndicator color={Theme.colors.background} />
            ) : (
              <View style={styles.captureInner} />
            )}
          </Pressable>

          {/* Empty view to balance flex layout so capture button stays centered */}
          <View style={styles.iconButton} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
    padding: Theme.spacing.l,
  },
  text: {
    color: Theme.colors.text,
    textAlign: 'center',
    marginBottom: Theme.spacing.m,
  },
  button: {
    backgroundColor: Theme.colors.text,
    padding: Theme.spacing.m,
    borderRadius: Theme.borderRadius.s,
  },
  buttonText: {
    color: Theme.colors.background,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cameraActions: {
    padding: Theme.spacing.xl,
    paddingBottom: Theme.spacing.xl + 20, // Extra padding for tab bar
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  iconButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Theme.colors.text,
  },
  captureInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Theme.colors.text,
  },
  preview: {
    flex: 1,
    width: '100%',
  },
  previewOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Theme.spacing.l,
  },
  photoInfoCard: {
    marginBottom: Theme.spacing.m,
    alignItems: 'center',
    padding: Theme.spacing.s,
  },
  photoTimeText: {
    color: Theme.colors.text,
    fontSize: 12,
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: Theme.spacing.m,
    borderRadius: Theme.borderRadius.m,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    color: Theme.colors.text,
    fontWeight: 'bold',
  }
});
