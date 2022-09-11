import { v4 } from 'uuid';
import {
  useState,
  useEffect,
  useCallback,
} from 'react';
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
import SetAvatar from '../../components/SetAvatar';

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
    color: 'white',
  },
  usernameForm: {
    padding: 20,
    width: '100%',
  },
});

const STEPS = {
  SCAN: 1,
  SET_USERNAME: 2,
  SET_AVATAR: 3,
  WAITING: 4,
  GAME_STARTED: 5,
};

const Room = () => {
  const { room, setRoom } = useGameRoom();
  const [step, setStep] = useState(STEPS.SCAN);
  const [roomId, setRoomId] = useState('');
  const [scanned, setScanned] = useState(true);
  const [username, setUsername] = useState(null);
  const [usernameInput, setUsernameInput] = useState(null);

  useEffect(() => {
    if (room?.gameStarted) setStep(STEPS.GAME_STARTED);
  }, [room]);

  const handleSendMessage = () => {
    setScanned(false);
  };

  const onScan = useCallback(async ({ data }) => {
    setScanned(true);

    try {
      const { roomId: scannedId } = JSON.parse(data);
      setRoomId(scannedId);
      setStep(STEPS.SET_AVATAR);
    } catch (e) {
      alert(e.message);
    }
  }, []);

  const handleConnect = useCallback(async (avatar) => {
    const storageUuid = await AsyncStorage.getItem('uuid');
    const playerUuid = storageUuid || v4();
    if (!storageUuid) await AsyncStorage.setItem('uuid', playerUuid);

    const [response] = await new RequestService(`rooms/connect/${roomId}`).post({
      avatar,
      username,
      uuid: playerUuid,
    });

    setRoom(response);
    setStep(STEPS.WAITING);

    socket.emit('joinToRoom', roomId);
  }, [username, roomId]);

  const onTakePhoto = (avatar) => {
    handleConnect(avatar);
  };

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
          value={usernameInput ?? ''}
          onChangeText={setUsernameInput}
        />
        <Button onPress={handleSaveusername} title="Зберегти" />
      </View>
    );
  }

  if (step === STEPS.SCAN) {
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
  }

  if (step === STEPS.SET_AVATAR) {
    return (
      <SetAvatar onTakePhoto={onTakePhoto} />
    );
  }

  if (step === STEPS.WAITING) return <WaitStartGame />;

  return <Lobby />;
};

export default Room;
