import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import socket from '../../../socket';

const styles = StyleSheet.create({

});

function RockPaperScissiors() {
  const handleClick = (choise) => {
    socket.emit('RockPaperScissiors-choise', choise);
  };

  return (
    <View>
      <Button title="paper" onPress={() => handleClick('paper')} />
      <Button title="rock" onPress={() => handleClick('rock')} />
      <Button title="scissiors" onPress={() => handleClick('scissiors')} />
    </View>
  );
}

export default RockPaperScissiors;
