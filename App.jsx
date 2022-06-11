import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, View,
} from 'react-native';
import Room from './app/pages/Room';
import { useProvideRoom, roomContext } from './app/services/roomContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  const room = useProvideRoom();

  return (
    <roomContext.Provider value={room}>
      <View style={styles.container}>
        <StatusBar />
        <Room />
      </View>
    </roomContext.Provider>
  );
}
