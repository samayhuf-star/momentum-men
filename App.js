import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ProgressProvider } from './src/context/ProgressContext';
import { ProProvider } from './src/context/ProContext';
import { initOneSignal } from './src/lib/onesignal';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import WorkoutScreen from './src/screens/WorkoutScreen';
import PaywallScreen from './src/screens/PaywallScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import GeneratorScreen from './src/screens/GeneratorScreen';
import CreditsScreen from './src/screens/CreditsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function tabIcon(name) {
  return function TabBarIcon({ color, size }) {
    return <Ionicons name={name} color={color} size={size} />;
  };
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#18181b', borderTopColor: '#27272a' },
        tabBarActiveTintColor: '#a3e635',
        tabBarInactiveTintColor: '#a1a1aa',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: tabIcon('home'), tabBarButtonTestID: 'tab-home' }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{ tabBarIcon: tabIcon('stats-chart'), tabBarButtonTestID: 'tab-progress' }}
      />
      <Tab.Screen
        name="Generator"
        component={GeneratorScreen}
        options={{ tabBarIcon: tabIcon('shuffle'), tabBarButtonTestID: 'tab-generator' }}
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#a3e635" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Workout" component={WorkoutScreen} />
            <Stack.Screen name="Paywall" component={PaywallScreen} />
            <Stack.Screen name="Credits" component={CreditsScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  useEffect(() => {
    initOneSignal();
  }, []);
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ProgressProvider>
          <ProProvider>
            <RootNavigator />
          </ProProvider>
        </ProgressProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
