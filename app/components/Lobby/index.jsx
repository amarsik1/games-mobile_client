import { useMemo } from 'react';
import Question from '../../gameScene/question';
import { useRoom } from '../../services/roomContext';

const components = {
  question: Question,
};

const Lobby = () => {
  const { room } = useRoom();

  const Component = useMemo(() => {
    if (!room) return null;

    return components[room.currentGameType];
  }, [room]);

  // if (room?.gameFinished) return <GameResults />;

  return (
    <Component />
  );
};

export default Lobby;
