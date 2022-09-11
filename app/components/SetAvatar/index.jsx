import { useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import {
  Button,
  Pressable,
  View,
} from 'react-native';

const SetAvatar = ({ onTakePhoto }) => {
  const cameraRef = useRef(null);
  const [openCamera, setOpenCamera] = useState(false);
  const [cameraHeight, setCameraHeight] = useState(0);

  const handleTakePhoto = async () => {
    const res = await cameraRef.current.takePictureAsync();
    const base64 = await FileSystem.readAsStringAsync(res.uri, { encoding: 'base64' });
    onTakePhoto(`data:image/jpg;base64,${base64}`);
  };

  if (!openCamera) {
    return (
      <Button title="Зробити фото" onPress={() => setOpenCamera(true)} />
    );
  }

  return (
    <View
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setCameraHeight((width / 3) * 4);
      }}
      style={{
        flex: 1, width: '100%', maxWidth: '100%', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',
      }}
    >
      <Camera
        ref={cameraRef}
        style={{
          flex: 1, aspectRatio: 3 / 4, maxWidth: '100%', height: cameraHeight, maxHeight: cameraHeight,
        }}
        type={CameraType.front}
        ratio="3:4"
        pictureSize="600:800"
      />
      <Pressable
        onPress={handleTakePhoto}
        style={{
          backgroundColor: 'white', width: 50, height: 50, borderRadius: 50, marginTop: 20, borderWidth: 1, borderColor: 'black',
        }}
      />
    </View>
  );
};

export default SetAvatar;
