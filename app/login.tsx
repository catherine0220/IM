import { Ionicons } from '@expo/vector-icons'; // 使用 Expo 的图标库
import { LinearGradient } from 'expo-linear-gradient'; // Expo版
import React, { useState } from 'react';
import { Link } from 'expo-router';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleLogin = async () => {
    if (!isChecked) {
      Alert.alert('提示', '请先阅读并同意隐私政策和服务协议');
      return;
    }
    if (!username || !password) {
      Alert.alert('错误', '请输入用户名和密码');
      return;
    }
    setIsLoading(true);
    try {
      console.log('Login attempt with:', username, password);
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('成功', '登录成功！');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('错误', '登录失败');
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = isLoading || !username || !password || !isChecked;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.bgShape1} />
      <View style={styles.bgShape2} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text style={styles.title}>登录</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="请输入用户名/手机号码"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            editable={!isLoading}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="请输入密码"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            editable={!isLoading}
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Ionicons 
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} 
              size={22} 
              color="#888" 
              style={styles.icon} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.linksContainer}>
          <Link href="/register" asChild>
          <TouchableOpacity>
            <Text style={styles.linkText}>注册账号</Text>
          </TouchableOpacity>
        </Link>
          <TouchableOpacity>
            <Text style={styles.linkText}>忘记密码？</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={isButtonDisabled}
          style={[styles.loginButtonWrapper, isButtonDisabled && styles.disabledButton]}
        >
          <LinearGradient
            colors={['#FDFDFD', '#EAEAEA']} 
            style={styles.loginButtonGradient}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? '登录中...' : '登录'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.agreementContainer}>
          <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={styles.checkbox}>
            <Ionicons 
              name={isChecked ? 'checkbox' : 'square-outline'} 
              size={18}
              color={isChecked ? '#007AFF' : '#888'} 
            />
          </TouchableOpacity>
          <Text style={styles.agreementText}>
            我已阅读并同意
            <Text style={styles.agreementLink}>《隐私政策和服务协议》</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f7ff',
  },
  bgShape1: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    top: -100,
    right: -120,
    transform: [{ rotate: '45deg' }],
  },
  bgShape2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    top: 50,
    left: -150,
    transform: [{ rotate: '30deg' }],
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    marginBottom: 20,
    paddingHorizontal: 20,
    shadowColor: '#B0C0E0',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  icon: {
    marginLeft: 10,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  linkText: {
    color: '#555',
    fontSize: 14,
  },
  loginButtonWrapper: {
    width: '100%',
    height: 55,
    borderRadius: 30,
    shadowColor: '#B0C0E0',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 10,
    overflow: 'hidden',
  },
  loginButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  loginButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.6,
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
    justifyContent: 'center',
  },
  checkbox: {
    padding: 5,
  },
  agreementText: {
    marginLeft: 8,
    color: '#888',
    fontSize: 13,
  },
  agreementLink: {
    color: '#007AFF',
  },
});

export default LoginScreen;
