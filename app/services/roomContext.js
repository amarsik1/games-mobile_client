import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import socket from '../../socket';

export const roomContext = createContext({});

export const useRoom = () => useContext(roomContext);

export function useProvideRoom() {
  const [room, setRoom] = useState(null);

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
    setRoom,
  };
}
