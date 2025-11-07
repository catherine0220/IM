import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

// 1. 图标名称映射 (方便管理)
const tabIcons = {
  home: {
    focused: 'chatbubble', // 对应图片中的聊天
    default: 'chatbubble-outline',
  },
  contacts: {
    focused: 'list-circle', // 对应图片中的列表/联系人
    default: 'list-circle-outline',
  },
  profile: {
    focused: 'person', // 对应图片中的用户
    default: 'person-outline',
  }
} as const;

// 2. 颜色定义 (从图片中提取)
const COLORS = {
  tabBarBackground: '#FFD860', // 标签栏黄色背景
  activeIcon: '#E8B200',      // 选中图标的黄色
  inactiveIcon: '#4A4A4A',    // 未选中图标的灰色
  white: '#FFFFFF',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // 隐藏文字标签
        tabBarStyle: styles.tabBarStyle, // 应用自定义样式
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName={tabIcons.home}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName={tabIcons.contacts}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName={tabIcons.profile}
            />
          ),
        }}
      />
    </Tabs>
  );
}

// 3. 自定义 TabIcon 组件
// (这实现了图片中的 "选中" 和 "未选中" 样式切换)

type TabIconProps = {
  focused: boolean;
  iconName: {
    focused: keyof typeof Ionicons.glyphMap;
    default: keyof typeof Ionicons.glyphMap;
  };
};

const TabIcon = ({ focused, iconName }: TabIconProps) => {
  if (focused) {
    // 选中的样式：白色浮动圆圈 + 黄色图标 + 白色小点
    return (
      <View style={styles.activeTabContainer}>
        <View style={styles.activeIconCircle}>
          <Ionicons
            name={iconName.focused}
            size={30}
            color={COLORS.activeIcon}
          />
        </View>
        <View style={styles.activeDot} />
      </View>
    );
  }

  // 未选中的样式：简单灰色图标
  // [!!] 修改点 1：添加 View 来居中
  return (
    <View style={styles.inactiveTabContainer}>
      <Ionicons
        name={iconName.default}
        size={26}
        color={COLORS.inactiveIcon}
      />
    </View>
  );
};

// 4. 样式表
const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute', // 使其可以悬浮
    left: 20,
    right: 20,
    height: 80,
    backgroundColor: COLORS.tabBarBackground,
    borderTopLeftRadius: 25, // 保持您原来的设置
    borderTopRightRadius: 25, // 保持您原来的设置
    borderTopWidth: 0,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  activeTabContainer: {
    alignItems: 'center',
    // 使用 Y 轴偏移让它"浮"上去
    transform: [{ translateY: -25 }], 
    // 确保阴影和上移的部分都可见
    width: 70, 
    height: 60, 
  },

  // [!!] 修改点 2：添加此样式以修复居中
  inactiveTabContainer: {
    width: 70,
    height: 70,
    marginTop:25,
    justifyContent: 'center', // 垂直居中
    alignItems: 'center', // 水平居中
  },

  activeIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30, // 完美的圆形
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    // 模拟图片中的白色背景和阴影
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.white,
    marginTop: 8, // 图标和小点之间的间距
  },
});