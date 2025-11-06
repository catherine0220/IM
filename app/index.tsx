
import { Redirect } from 'expo-router';

// 当用户访问应用的根路径时，自动重定向到登录页面
export default function StartPage() {
  return <Redirect href="/login" />;
}
