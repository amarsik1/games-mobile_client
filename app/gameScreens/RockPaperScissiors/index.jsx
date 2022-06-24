import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import socket from '../../../socket';
import RequestService from '../../services/RequestService';
import { useRoom } from '../../services/roomContext';

function RockPaperScissiors() {
  const { room } = useRoom();
  const [choise, setChoise] = useState(null);

  const handleClick = async (choise) => {
    const playerUuid = await AsyncStorage.getItem('uuid');
    await new RequestService('rooms/resend-action').post({
      roomName: room._id,
      eventName: 'RockPaperScissiors-choise',
      data: {
        choise,
        playerUuid,
      },
    });

    setChoise(choise);
  };

  useEffect(() => {
    const actionName = `${room._id}-RockPaperScissiors`;

    const unsub = () => {
      socket.off(actionName);
      socket.off(actionName);
    };

    if (!room) return unsub;

    socket.on(actionName, () => {

    });

    socket.on('RockPaperScissors-nextMove', () => {
      setChoise(null);
    });

    return unsub;
  }, [room]);

  return (
    <View>
      <Text>{choise}</Text>
      {!choise && (
        <>
          <Button title="paper" onPress={() => handleClick('paper')} />
          <Button title="rock" onPress={() => handleClick('rock')} />
          <Button title="scissiors" onPress={() => handleClick('scissiors')} />
        </>
      )}
    </View>
  );
}

export default RockPaperScissiors;
