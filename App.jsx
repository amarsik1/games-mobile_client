import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useEffect } from 'react';
import { v4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';
import Room from './app/pages/Room';
import { useProvideRoom, roomContext } from './app/services/roomContext';
import 'react-native-get-random-values';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  const room = useProvideRoom();
  const [, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    requestPermission();

    const handleSetUuid = async () => {
      const storageUuid = await AsyncStorage.getItem('uuid');
      if (storageUuid) return;

      const playerUuid = v4();
      await AsyncStorage.setItem('uuid', playerUuid);
    };

    handleSetUuid();
  }, []);

  // if (permition)

  return (
    <roomContext.Provider value={room}>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <Room />
      </SafeAreaView>
    </roomContext.Provider>
  );
}
