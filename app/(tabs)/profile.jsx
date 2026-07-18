import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import GlassCard from '../../components/GlassCard';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('jane.doe@example.com');

  // Temporary state for editing so we can cancel without saving
  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);

  // Generate initials (up to 2 characters)
  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const handleSave = () => {
    setName(editName);
    setEmail(editEmail);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(name);
    setEditEmail(email);
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerText}>Profile</Text>

      <GlassCard style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{getInitials(isEditing ? editName : name)}</Text>
          </View>
        </View>

        {isEditing ? (
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={editName}
                onChangeText={setEditName}
                placeholder="Enter your name"
                placeholderTextColor="rgba(0,0,0,0.3)"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={editEmail}
                onChangeText={setEditEmail}
                keyboardType="email-address"
                placeholder="Enter your email"
                placeholderTextColor="rgba(0,0,0,0.3)"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.actionRow}>
              <Pressable style={styles.cancelButton} onPress={handleCancel}>
                <Ionicons name="close" size={20} color="rgba(0,0,0,0.6)" />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>

              <Pressable style={styles.saveButton} onPress={handleSave}>
                <Ionicons name="checkmark" size={20} color="rgba(0,0,0,0.8)" />
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.infoContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.emailText}>{email}</Text>

            <Pressable style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Ionicons name="pencil" size={18} color="rgba(0,0,0,0.7)" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </Pressable>
          </View>
        )}
      </GlassCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 130, // Space for tab bar
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
  profileCard: {
    padding: 24,
    alignItems: 'center',
    width: '100%',
  },
  avatarContainer: {
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginLeft: 35, // Manually nudging the circle to the right to center it
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.7)',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 100, // Matches circle height for perfect vertical centering
  },
  infoContainer: {
    alignItems: 'center',
    width: '100%',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.9)',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 24,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    gap: 8,
  },
  editButtonText: {
    color: 'rgba(0,0,0,0.8)',
    fontWeight: 'bold',
    fontSize: 16,
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 12,
    padding: 16,
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    gap: 4,
  },
  cancelButtonText: {
    color: 'rgba(0,0,0,0.6)',
    fontWeight: 'bold',
    fontSize: 15,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  saveButtonText: {
    color: 'rgba(0,0,0,0.8)',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
