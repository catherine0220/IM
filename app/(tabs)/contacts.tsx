import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Contact {
  id: number;
  name: string;
}

const ContactsLayout: React.FC = () => {
  const contacts: Contact[] = Array(15)
    .fill(null)
    .map((_, i) => ({ id: i, name: '用友' }));
  
  const alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>通讯录</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="搜索"
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIcon}>
            <Text style={styles.iconText}>👤</Text>
          </View>
          <Text style={styles.actionLabel}>新的朋友</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIcon}>
            <Text style={styles.iconText}>👥</Text>
          </View>
          <Text style={styles.actionLabel}>仅人群聊</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIcon}>
            <Text style={styles.iconText}>💬</Text>
          </View>
          <Text style={styles.actionLabel}>我的好友</Text>
        </TouchableOpacity>
      </View>

      {/* Contacts List */}
      <View style={styles.listContainer}>
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>通讯</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          {contacts.map((contact, index) => (
            <TouchableOpacity
              key={contact.id}
              style={[
                styles.contactItem,
                index % 4 === 0 ? {} : {},
              ]}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>👥</Text>
              </View>
              <Text style={styles.contactName}>{contact.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Alphabet Index */}
        <View style={styles.alphabetIndex}>
          {alphabet.map((letter) => (
            <TouchableOpacity key={letter} style={styles.alphabetItem}>
              <Text style={styles.alphabetText}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  actionButtons: {
    backgroundColor: '#FEF3C7',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconText: {
    fontSize: 24,
  },
  actionLabel: {
    fontSize: 12,
    color: '#374151',
  },
  listContainer: {
    flex: 1,
    position: 'relative',
  },
  sectionHeader: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  sectionHeaderText: {
    fontSize: 12,
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: '#9CA3AF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  contactName: {
    fontSize: 16,
    color: '#374151',
  },
  alphabetIndex: {
    position: 'absolute',
    right: 4,
    top: '25%',
    alignItems: 'center',
  },
  alphabetItem: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  alphabetText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
});

export default ContactsLayout;