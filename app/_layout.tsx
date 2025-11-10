
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{  title: '设置' }} /> */}
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ title: '设置' }} />
    </Stack>
  );
}
