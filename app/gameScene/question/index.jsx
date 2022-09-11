import { useEffect, useState, useCallback } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import socket from '../../../socket';
import LookAtTheTVScreen from '../../components/LookAtTheTVScreen';
import RequestService from '../../services/RequestService';
import { useRoom } from '../../services/roomContext';

const Question = () => {
  const { room, myUuid } = useRoom();
  const [currQuestion, setCurrQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    socket.on('setQuestion', (question) => {
      setCurrQuestion(question);
      setAnswer(null);
    });

    return () => {
      socket.off('setQuestion');
    };
  }, []);

  const handleSetAnswer = useCallback(async (value) => {
    const [res] = await new RequestService(`question/set-answer/${room._id}/${currQuestion.contentType}`).post({
      author: myUuid,
      value,
    });

    setAnswer(res);
  }, [room, currQuestion]);

  return (
    <View>
      {(!currQuestion || answer) ? (
        <LookAtTheTVScreen />
      ) : (
        <View>
          <Text>
            {currQuestion.title}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {room.players.map((player) => (
              <TouchableOpacity onPress={() => handleSetAnswer(player.uuid)} key={player.uuid} style={{ width: 150, height: 200, backgroundColor: 'red' }}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  source={{ uri: player.avatar }}
                />
                <Text style={{ color: 'white' }}>
                  {player.username}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default Question;
