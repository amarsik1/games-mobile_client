import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../../socket';

export const roomContext = createContext({});

export const useRoom = () => useContext(roomContext);

export function useProvideRoom() {
  const [room, setRoom] = useState(null);
  const [myUuid, setMyUuid] = useState(null);

  useEffect(() => {
    (async () => {
      setMyUuid(await (AsyncStorage.getItem('uuid')));
    })();
  }, []);

  useEffect(() => {
    const unsub = () => {
      socket.off('setActiveGame');
    };

    if (!room) return unsub;

    socket.on('setActiveGame', (currentGameNumber) => {
      setRoom((prev) => ({
        ...prev,
        currentGameNumber,
      }));
    });

    return unsub;
  }, [room]);

  return {
    room,
    myUuid,
    setRoom,
  };
}
