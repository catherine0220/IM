import { Ionicons } from '@expo/vector-icons';
import { Stack, Link } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- 颜色定义 (从图片中提取) ---
const COLORS = {
  background: '#FFF9E8', // 屏幕的浅黄色
  headerbackground:'#FFD860',
  card: '#FFFFFF',       // 聊天卡片的白色
  textPrimary: '#222222', // 主要文字（姓名）
  textSecondary: '#999999', // 次要文字（消息、时间）
  badge: '#3B82F6',        // 蓝色角标
  avatarPlaceholder: '#E5E5E5', // 灰色头像背景
};

// --- 模拟数据 ---
// 注意: 'type' 用于区分单聊和群聊
// 'avatars' 数组用于群聊

type ChatItemType = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  type: 'single' | 'group';
  unreadCount: number;
  avatars: string[];
};

const DUMMY_DATA: ChatItemType[] = [
  {
    id: '1',
    name: '妈妈',
    lastMessage: '好的,去吧',
    time: '2:44 PM',
    type: 'single',
    unreadCount: 0,
    avatars: [],
  },
  {
    id: '2',
    name: '闺蜜',
    lastMessage: '对啊 哈哈',
    time: '2:44 PM',
    type: 'single',
    unreadCount: 0,
    avatars: [],
  },
  {
    id: '3',
    name: '姐姐',
    lastMessage: 'OK',
    time: '2:44 PM',
    type: 'single',
    unreadCount: 0,
    avatars: [],
  },
  {
    id: '4',
    name: '疯子群',
    lastMessage: '哈哈哈哈哈',
    time: '2:44 PM',
    type: 'group',
    unreadCount: 20,
    avatars: [
      'https://i.pravatar.cc/150?img=11',
      'https://i.pravatar.cc/150?img=12',
      'https://i.pravatar.cc/150?img=13',
      'https://i.pravatar.cc/150?img=14',
    ],
  },
  {
    id: '5',
    name: 'Leo',
    lastMessage: 'Noooooo',
    time: '2:44 PM',
    type: 'single',
    unreadCount: 0,
    avatars: [],
  },
  {
    id: '6',
    name: '家长群',
    lastMessage: '真好！',
    time: '2:44 PM',
    type: 'group',
    unreadCount: 2,
    avatars: [
      'https://i.pravatar.cc/150?img=21',
      'https://i.pravatar.cc/150?img=22',
      'https://i.pravatar.cc/150?img=23',
      'https://i.pravatar.cc/150?img=24',
    ],
  },
];

// --- 1. 单独的聊天项组件 (Chat Item) ---
const ChatItem = ({ item }: { item: ChatItemType }) => {
  // 1a. 渲染头像 (根据 'type' 切换)
  const renderAvatar = () => {
    if (item.type === 'group') {
      return (
        <View style={styles.groupAvatarContainer}>
          {item.avatars.slice(0, 4).map((url, index) => (
            <Image key={index} source={{ uri: url }} style={styles.groupAvatarImage} />
          ))}
        </View>
      );
    }
    // 默认是单聊
    return (
      <View style={styles.avatarPlaceholder}>
        <Ionicons name="person" size={30} color={COLORS.textSecondary} />
      </View>
    );
  };

  // 1b. 渲染未读角标
  const renderBadge = () => {
    if (item.unreadCount === 0) return null;
    
    // 动态调整角标宽度
    const badgeStyle = [
      styles.badgeContainer,
      item.unreadCount > 9 ? styles.badgeWide : styles.badgeNormal
    ];

    return (
      <View style={badgeStyle}>
        <Text style={styles.badgeText}>{item.unreadCount}</Text>
      </View>
    );
  };

  return (
    <Link href={`/${item.id}`} asChild>
      <TouchableOpacity>
        <View style={styles.chatItemContainer}>
          {/* 左侧：头像 + 角标 */}
          <View style={styles.avatarWrapper}>
            {renderAvatar()}
            {renderBadge()}
          </View>

          {/* 中间：姓名 + 消息 */}
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.messageText} numberOfLines={1}>{item.lastMessage}</Text>
          </View>

          {/* 右侧：时间 */}
          <View style={styles.metaContainer}>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

// --- 2. 聊天屏幕主组件 ---
export default function ChatListScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* 2a. 配置 Expo Router 导航栏 */}
      <Stack.Screen
        options={{
          headerShown: true,
          title: '唯会',
          headerStyle: { backgroundColor: COLORS.headerbackground },
          headerShadowVisible: false, // 隐藏底部分割线
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: COLORS.textPrimary,
            fontWeight: 'normal',
          },
        }}
      />

      {/* 2b. 搜索栏 */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
        <TextInput
          placeholder="搜索"
          placeholderTextColor={COLORS.textSecondary}
          style={styles.searchInput}
        />
      </View>

      {/* 2c. 聊天列表 */}
      <FlatList
        data={DUMMY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// --- 3. 样式表 ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // --- 搜索栏 ---
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 25,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 15,
    height: 45,
    // 阴影 (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    // 阴影 (Android)
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  // --- 列表 ---
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  // --- 聊天项 ---
  chatItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 12,
    marginBottom: 10,
    // 阴影 (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // 阴影 (Android)
    elevation: 3,
  },
  avatarWrapper: {
    marginRight: 12,
    position: 'relative', // 为了角标定位
  },
  // 单聊头像
  avatarPlaceholder: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: COLORS.avatarPlaceholder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 群聊头像
  groupAvatarContainer: {
    width: 55,
    height: 55,
    borderRadius: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden', // 确保子图片在圆角内
  },
  groupAvatarImage: {
    width: '50%',
    height: '50%',
  },
  // 未读角标
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLORS.badge,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.card, // 白色描边
  },
  badgeNormal: {
    width: 20,
    height: 20,
  },
  badgeWide: {
    height: 20,
    paddingHorizontal: 6, // 超过个位数时，给左右一点空间
  },
  badgeText: {
    color: COLORS.card,
    fontSize: 10,
    fontWeight: 'bold',
  },
  // 中间文字
  textContainer: {
    flex: 1, // 占据剩余空间
    justifyContent: 'center',
    marginRight: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  // 右侧时间
  metaContainer: {
    alignItems: 'flex-end',
    height: '100%', // 确保和头像等高
    paddingTop: 4, // 稍微下移一点
  },
  timeText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});