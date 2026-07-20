import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TextInput, 
  RefreshControl,
  Pressable,
  Alert
} from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '../../components/GlassCard';

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      setPermissionGranted(true);
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
        sort: Contacts.SortTypes.FirstName,
      });

      if (data.length > 0) {
        setContacts(data);
        setFilteredContacts(data);
      }
    } else {
      setPermissionGranted(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchContacts();
    setSearchQuery('');
    setRefreshing(false);
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = contacts.filter(c => {
        const nameMatch = c.name?.toLowerCase().includes(text.toLowerCase());
        const phoneMatch = c.phoneNumbers?.[0]?.number?.includes(text);
        return nameMatch || phoneMatch;
      });
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  };

  const copyToClipboard = async (number) => {
    await Clipboard.setStringAsync(number);
    Alert.alert('Copied', 'Phone number copied to clipboard!');
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const renderContact = ({ item }) => {
    const hasNumber = item.phoneNumbers && item.phoneNumbers.length > 0;
    const phoneNumber = hasNumber ? item.phoneNumbers[0].number : 'No Number';

    return (
      <GlassCard style={styles.contactCard}>
        <View style={styles.contactRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
          </View>
          
          <View style={styles.contactInfo}>
            <Text style={styles.contactName} numberOfLines={1}>{item.name}</Text>
            <Text style={[styles.contactPhone, !hasNumber && styles.noNumber]}>
              {phoneNumber}
            </Text>
          </View>

          {hasNumber && (
            <Pressable 
              style={styles.copyButton} 
              onPress={() => copyToClipboard(phoneNumber)}
            >
              <Ionicons name="copy-outline" size={20} color="rgba(0,0,0,0.6)" />
            </Pressable>
          )}
        </View>
      </GlassCard>
    );
  };

  if (!permissionGranted) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <GlassCard style={styles.emptyStateCard}>
          <Ionicons name="people-outline" size={48} color="rgba(0,0,0,0.5)" />
          <Text style={styles.emptyStateTitle}>Permission Denied</Text>
          <Text style={styles.emptyStateText}>We need access to your contacts to show them here.</Text>
          <Pressable style={styles.primaryButton} onPress={fetchContacts}>
            <Text style={styles.primaryButtonText}>Grant Permission</Text>
          </Pressable>
        </GlassCard>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>
        <Text style={styles.counter}>{filteredContacts.length} Contacts</Text>
      </View>

      <View style={styles.searchContainer}>
        <GlassCard style={styles.searchCard}>
          <Ionicons name="search" size={20} color="rgba(0,0,0,0.5)" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts..."
            placeholderTextColor="rgba(0,0,0,0.4)"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => handleSearch('')} style={styles.clearSearchButton}>
              <Ionicons name="close-circle" size={20} color="rgba(0,0,0,0.4)" />
            </Pressable>
          )}
        </GlassCard>
      </View>

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContact}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
        ListEmptyComponent={
          <GlassCard style={styles.emptyStateCard}>
            <Ionicons name="search-outline" size={48} color="rgba(0,0,0,0.5)" />
            <Text style={styles.emptyStateTitle}>No Contacts Found</Text>
            <Text style={styles.emptyStateText}>Try adjusting your search query.</Text>
          </GlassCard>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Transparent so the layout background shows through
  },
  centerContent: {
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  counter: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 16, // More pill-like
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
  },
  clearSearchButton: {
    padding: 4,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 120, // Space for the floating tab bar
  },
  contactCard: {
    marginBottom: 12,
    padding: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.6)',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
  },
  noNumber: {
    fontStyle: 'italic',
    color: 'rgba(0,0,0,0.4)',
  },
  copyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateCard: {
    alignItems: 'center',
    padding: 32,
    marginTop: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    textAlign: 'center',
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
