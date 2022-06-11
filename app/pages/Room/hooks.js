import { useEffect } from 'react';
import socket from '../../../socket';
import { useRoom } from '../../services/roomContext';

export const useGameRoom = () => {
  const { room, setRoom } = useRoom();

  useEffect(() => {
    const unsub = () => {
      socket.off('gameStarted');
    };

    if (!room) return unsub;

    socket.on('gameStarted', () => {
      setRoom((prev) => ({
        ...prev,
        gameStarted: true,
      }));
    });

    return unsub;
  }, [room]);

  return {
    room,
    setRoom,
  };
};
