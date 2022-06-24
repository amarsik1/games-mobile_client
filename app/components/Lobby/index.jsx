import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from 'react';
import { useRoom } from '../../services/roomContext';
import { gameScreens } from '../../gameScreens/gameList';
import RequestService from '../../services/RequestService';

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});

const Lobby = () => {
  const { room } = useRoom();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(false);
  }, [room.currentGameNumber]);

  const gameItem = useMemo(() => (
    gameScreens.find((item) => item.id === room.currentGameNumber)
  ), [room]);

  const handleReady = async () => {
    if (!room) return;

    const playerUuid = await AsyncStorage.getItem('uuid');
    await new RequestService('rooms/set-player-ready').post({
      playerUuid,
      roomId: room._id,
    });
    setIsReady(true);
  };

  if (!isReady) {
    return (
      <>
        <Text style={styles.text}>{gameItem?.name}</Text>
        <Button
          title="Я готовий(а)"
          onPress={handleReady}
        />
      </>
    );
  }

  return (
    <View>
      {gameItem && (
        <gameItem.Component />
      )}
    </View>
  );
};

export default Lobby;
