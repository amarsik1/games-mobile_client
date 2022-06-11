import v4 from 'uuid';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet, View, Button, TextInput, Text,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import socket from '../../../socket';
import RequestService from '../../services/RequestService';
import { useGameRoom } from './hooks';
import WaitStartGame from '../../components/WaitStartGame';
import Lobby from '../../components/Lobby';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 1,
    width: '100%',
    paddingLeft: 10,
  },
  usernameForm: {
    padding: 20,
    width: '100%',
  },
});

const Room = () => {
  const { room, setRoom } = useGameRoom();
  const [scanned, setScanned] = useState(true);
  const [username, setUsername] = useState(null);
  const [usernameInput, setUsernameInput] = useState(null);

  const handleSendMessage = () => {
    setScanned(false);
  };

  const onScan = useCallback(async ({ data }) => {
    setScanned(true);
    try {
      const { roomId } = JSON.parse(data);
      const storageUuid = await AsyncStorage.getItem('uuid');
      const playerUuid = storageUuid || v4();
      if (!storageUuid) await AsyncStorage.setItem('uuid', playerUuid);

      const response = await new RequestService('rooms/connect').post({
        roomId,
        username,
        uuid: playerUuid,
      });

      setScanned(true);
      setRoom(response);

      socket.emit('joinToRoom', roomId);
    } catch (e) {
      alert(e.message);
    }
  }, [username]);

  useEffect(() => {
    if (username) return;

    const getPlayerName = async () => {
      const storageUsername = await AsyncStorage.getItem('username');
      if (storageUsername) setUsername(storageUsername);
    };

    getPlayerName();
  }, [username]);

  const handleSaveusername = useCallback(async () => {
    await AsyncStorage.setItem('username', usernameInput);
    setUsername(usernameInput);
  }, [usernameInput]);

  if (!username) {
    return (
      <View style={styles.usernameForm}>
        <Text>Ваше ім&apos;я?</Text>
        <TextInput
          placeholder="Приклад: amarsik1"
          style={styles.textInput}
          value={usernameInput}
          onChangeText={setUsernameInput}
        />
        <Button onPress={handleSaveusername} title="Зберегти" />
      </View>
    );
  }

  if (room && !room.gameStarted) return <WaitStartGame />;

  if (room?.gameStarted) return <Lobby />;

  return (
    <View style={styles.container}>
      {!scanned && (
        <BarCodeScanner
          onBarCodeScanned={onScan}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {scanned && (
        <Button onPress={handleSendMessage} title="Сканувати код" />
      )}
    </View>
  );
};

export default Room;
