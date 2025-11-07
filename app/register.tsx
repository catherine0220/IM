import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleRegister = async () => {
    if (!isChecked) {
      Alert.alert('提示', '请先阅读并同意隐私政策和服务协议');
      return;
    }
    if (!nickname || !username || !password || !confirmPassword) {
      Alert.alert('错误', '请填写所有必填项');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('错误', '两次输入的密码不一致');
      return;
    }
    setIsLoading(true);
    try {
      console.log('Register attempt with:', nickname, username, password);
      // 在这里替换为您的真实注册 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('成功', '注册成功！', [
        { text: 'OK', onPress: () => router.push('/login') },
      ]);
    } catch (error) {
      console.error('Register error:', error);
      Alert.alert('错误', '注册失败');
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = isLoading || !nickname || !username || !password || !confirmPassword || !isChecked;

  return (
         <LinearGradient
          colors={['#FFEFb0', '#FFF9E5']}  // 💛 上到下的渐变色
          style={styles.safeArea}
        >
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.bgShape1} />
      <View style={styles.bgShape2} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Image 
        source={require('../assets/images/logo.png')} 
        style={styles.logo} 
      />
      
      <Text style={styles.title}>注册</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="请输入昵称"
            value={nickname}
            onChangeText={setNickname}
            autoCapitalize="none"
            editable={!isLoading}
            placeholderTextColor="#999"
          />
        </View>

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

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="请再次输入密码"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!isConfirmPasswordVisible}
            editable={!isLoading}
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
            <Ionicons 
              name={isConfirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'} 
              size={22} 
              color="#888" 
              style={styles.icon} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.linksContainer}>
          <View /> 
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>已有户口</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <TouchableOpacity
          onPress={handleRegister}
          disabled={isButtonDisabled}
          style={[styles.loginButtonWrapper, isButtonDisabled && styles.disabledButton]}
        >
          <LinearGradient
            colors={['#FDFDFD', '#EAEAEA']} 
            style={styles.loginButtonGradient}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? '注册中...' : '注册'}
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
    </LinearGradient>
  );
};

// Using the same styles as LoginScreen
const styles = StyleSheet.create({
  logo: {
    width: 180,
    height: 100,
    marginBottom: 30,
  },
  safeArea: {
    flex: 1,
    // backgroundColor: '#f4f7ff',
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 25,
    paddingTop:80,
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

export default RegisterScreen;