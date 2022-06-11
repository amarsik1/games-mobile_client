import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

export const useAccelerometer = () => {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    Accelerometer.setUpdateInterval(100);
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      }),
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return data;
};
