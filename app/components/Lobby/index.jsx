import { Text, View } from 'react-native';
import { useEffect, useMemo } from 'react';
import { useRoom } from '../../services/roomContext';
import socket from '../../../socket';

const Lobby = () => {
  const { room, setRoom } = useRoom();

  useEffect(() => {
    const unsub = () => {

    };

    socket.on('setActiveGame', (currentGameNumber) => {
      setRoom((prev) => ({
        ...prev,
        currentGameNumber,
      }));
    });

    return unsub;
  }, []);

  const currentGame = useMemo(() => {
    const { games, currentGameNumber } = room;

    const game = games.find((curGame) => curGame.id === currentGameNumber);
    return game;
  }, [room]);

  return (
    <View>
      <Text>{currentGame?.name}</Text>
    </View>
  );
};

export default Lobby;
