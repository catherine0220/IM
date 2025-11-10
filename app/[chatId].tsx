
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- 颜色定义 ---
const COLORS = {
  background: '#FFF9E8',
  header: '#FDEFB2',
  textPrimary: '#222',
  textSecondary: '#888',
  white: '#FFFFFF',
  bubbleSent: ['#4A4A4A', '#2B2B2B'],
  bubbleReceived: ['#5A5A5A', '#3C3C3C'],
  avatarPlaceholder: '#E5E5E5',
  actionPanel: '#F4F4F4',
  sendButton: '#FFD860',
} as const;

// --- 初始模拟消息数据 ---
const INITIAL_MESSAGES: ChatListItem[] = [
  {
    id: '4',
    type: 'message',
    text: '好的妈妈',
    isSent: true,
    user: { name: 'Me' },
  },
  {
    id: '3',
    type: 'message',
    text: '记得早点回家',
    isSent: false,
    user: { name: '妈妈' },
  },
  {
    id: '2',
    type: 'timestamp',
    time: '12分钟前',
  },
  {
    id: '1',
    type: 'message',
    text: '我出门了',
    isSent: true,
    user: { name: 'Me' },
  },
];

// --- 类型定义 ---
type Message = {
  id: string;
  type: 'message';
  text: string;
  isSent: boolean;
  user: { name: string };
};

type Timestamp = {
  id: string;
  type: 'timestamp';
  time: string;
};

type ChatListItem = Message | Timestamp;

type Action = {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type MessageBubbleProps = {
  message: Message;
};

type ActionPanelModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

// --- 1. 聊天气泡组件 (无变动) ---
const MessageBubble = ({ message }: MessageBubbleProps) => {
  const { isSent, text } = message;
  const containerStyle = isSent ? styles.sentContainer : styles.receivedContainer;
  const gradientColors = isSent ? COLORS.bubbleSent : COLORS.bubbleReceived;

  return (
    <View style={containerStyle}>
      {!isSent && (
        <View style={styles.avatarPlaceholder}>
          <Ionicons name="person" size={20} color={COLORS.textSecondary} />
        </View>
      )}
      <LinearGradient colors={gradientColors} style={styles.bubble}>
        <Text style={styles.bubbleText}>{text}</Text>
      </LinearGradient>
      {isSent && (
        <View style={styles.avatarPlaceholder}>
          <Ionicons name="person" size={20} color={COLORS.textSecondary} />
        </View>
      )}
    </View>
  );
};

// --- 2. 动作面板 (无变动) ---
const ActionPanelModal = ({ isVisible, onClose }: ActionPanelModalProps) => {
  const actions: Action[] = [
    { name: '照片', icon: 'image' },
    { name: '视频', icon: 'videocam' },
    { name: '通话', icon: 'call' },
    { name: '视频通话', icon: 'camera' },
    { name: '文件', icon: 'document' },
    { name: '个人名片', icon: 'person' },
    { name: '群名片', icon: 'people' },
  ];

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={onClose}>
        <View style={styles.actionPanelContainer}>
          <View style={styles.actionGrid}>
            {actions.map((action) => (
              <TouchableOpacity key={action.name} style={styles.actionButton}>
                <View style={styles.actionIconBg}>
                  <Ionicons name={action.icon} size={24} color={COLORS.textPrimary} />
                </View>
                <Text style={styles.actionText}>{action.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// --- 3. 聊天屏幕主组件 ---
export default function ChatScreen() {
  const { chatId } = useLocalSearchParams();
  const [messages, setMessages] = useState<ChatListItem[]>(INITIAL_MESSAGES);
  const [messageText, setMessageText] = useState('');
  const [isActionPanelVisible, setIsActionPanelVisible] = useState(false);

  // [!!] 新增：发送消息的函数
  const handleSendMessage = () => {
    if (messageText.trim().length === 0) return; // 不发送空消息

    const newMessage: Message = {
      id: Math.random().toString(), // 临时用随机ID
      type: 'message',
      text: messageText.trim(),
      isSent: true,
      user: { name: 'Me' },
    };

    setMessages(prevMessages => [newMessage, ...prevMessages]); // 将新消息添加到列表顶部
    setMessageText(''); // 清空输入框
  };

  const renderItem = ({ item }: { item: ChatListItem }) => {
    if (item.type === 'timestamp') {
      return (
        <View style={styles.timestampContainer}>
          <Text style={styles.timestampText}>{item.time}</Text>
        </View>
      );
    }
    return <MessageBubble message={item as Message} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: `与 ${chatId} 的聊天`,
          headerStyle: { backgroundColor: COLORS.header },
          headerShadowVisible: false,
          headerTitleStyle: { color: COLORS.textPrimary },
          headerTintColor: COLORS.textPrimary,
        }}
      />
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          style={styles.chatList}
          data={messages} // [!!] 修改：使用 state 中的 messages
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          inverted
        />
        {/* [!!] 修改：底部输入栏，带发送按钮切换逻辑 */}
        <View style={styles.inputBarContainer}>
          <TouchableOpacity>
            <Ionicons name="mic-outline" size={26} color={COLORS.textSecondary} style={styles.inputIcon} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder=""
            value={messageText}
            onChangeText={setMessageText}
            multiline
          />
          <TouchableOpacity>
            <Ionicons name="happy-outline" size={26} color={COLORS.textSecondary} style={styles.inputIcon} />
          </TouchableOpacity>
          
          {messageText.trim().length > 0 ? (
            // 如果有文字，显示发送按钮
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Text style={styles.sendButtonText}>发送</Text>
            </TouchableOpacity>
          ) : (
            // 如果没文字，显示加号按钮
            <TouchableOpacity onPress={() => setIsActionPanelVisible(true)}>
              <Ionicons name="add-circle-outline" size={26} color={COLORS.textSecondary} style={styles.inputIcon} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
      <ActionPanelModal
        isVisible={isActionPanelVisible}
        onClose={() => setIsActionPanelVisible(false)}
      />
    </SafeAreaView>
  );
}

// --- 4. 样式表 ---
const styles = StyleSheet.create({
  flex1: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  chatList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  timestampContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  timestampText: {
    backgroundColor: '#00000010',
    color: COLORS.textSecondary,
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  sentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
    alignItems: 'center',
  },
  receivedContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 5,
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.avatarPlaceholder,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  bubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 15,
  },
  bubbleText: {
    color: COLORS.white,
    fontSize: 16,
  },
  inputBarContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#00000010',
    backgroundColor: COLORS.background,
  },
  textInput: {
    flex: 1,
    minHeight: 35,
    maxHeight: 120,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    marginHorizontal: 8,
  },
  inputIcon: {
    padding: 5,
    marginBottom: 5,
  },
  // 新增发送按钮样式
  sendButton: {
    backgroundColor: COLORS.sendButton,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  sendButtonText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  actionPanelContainer: {
    backgroundColor: COLORS.actionPanel,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:"center",
    justifyContent: 'flex-start',
    paddingLeft:30,
  },
  actionButton: {
    width: Dimensions.get('window').width / 4 - 20,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  actionIconBg: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
