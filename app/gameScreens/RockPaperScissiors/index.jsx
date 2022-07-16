import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import { LinearProgress } from 'react-native-elements';
import socket from '../../../socket';
import { getColorFromValueFromZeroToOne, getRandomNumberFromTo } from '../../helpers';
import RequestService from '../../services/RequestService';
import { useRoom } from '../../services/roomContext';

import PaperIcon from './icons/PaperIcon';
import RockIcon from './icons/RockIcon';
import RandomIcon from './icons/RandomIcon';
import ScissorsIcon from './icons/ScissorsIcon';

const choises = [
  {
    name: 'paper',
    Icon: PaperIcon,
  },
  {
    name: 'rock',
    Icon: RockIcon,
  },
  {
    name: 'scissors',
    Icon: ScissorsIcon,
  },
];

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  progressBar: {
    position: 'absolute',
    height: '100%',
  },
  button: {
    width: 80,
    height: 80,
  },
  buttonsView: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    height: 100,
    padding: 0,
  },
});

function RockPaperScissiors() {
  const { room, myUuid } = useRoom();
  const [choise, setChoise] = useState(null);
  const [hp, setHp] = useState(5);

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

  console.log(hp);

  const handleRandomChoise = () => {
    const randomChoiseNum = getRandomNumberFromTo(0, 2);

    const { name } = choises[randomChoiseNum];
    handleClick(name);
  };

  useEffect(() => {
    const actionName = `${room?._id}-RockPaperScissiors`;
    const unsub = () => {
      socket.off(actionName);
      socket.off(actionName);
    };

    if (!room) return unsub;

    socket.on('RockPaperScissors-nextMove', (winnerUuid) => {
      if (winnerUuid !== myUuid) {
        Vibration.vibrate();
        setHp((prev) => prev - 1);
      }
      setChoise(null);
    });

    return unsub;
  }, [room]);

  const progressBarValue = useMemo(() => hp / 5, [hp]);

  return (
    <View style={styles.view}>
      <LinearProgress color={`${getColorFromValueFromZeroToOne(progressBarValue)}50`} style={styles.progressBar} value={progressBarValue} variant="determinate" />
      {!choise && (
        <View style={styles.buttonsView}>
          {choises.map(({ name, Icon }) => (
            <TouchableOpacity
              key={name}
              style={{ ...styles.button }}
              onPress={() => handleClick(name)}
            >
              <Icon />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={{ ...styles.button }} onPress={handleRandomChoise}>
            <RandomIcon />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default RockPaperScissiors;
