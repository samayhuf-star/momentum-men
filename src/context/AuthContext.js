import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const saved = await AsyncStorage.getItem('user');
      if (saved) setUser(JSON.parse(saved));
    } catch (e) {
      console.log('Auth load error', e);
    } finally {
      setLoading(false);
    }
  };

  const signInAsGuest = async () => {
    const guest = { id: 'guest', name: 'Guest', isGuest: true };
    await AsyncStorage.setItem('user', JSON.stringify(guest));
    setUser(guest);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInAsGuest, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
