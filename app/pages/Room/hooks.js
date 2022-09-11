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

    socket.on('gameStarted', (updRoom) => {
      setRoom(updRoom);
    });

    return unsub;
  }, [room]);

  return {
    room,
    setRoom,
  };
};
