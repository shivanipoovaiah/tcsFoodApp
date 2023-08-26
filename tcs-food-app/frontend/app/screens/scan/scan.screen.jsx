import React, {useRef, useContext} from 'react';
import {Linking, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import { Context } from '../../components/global_context/globalContext';
import { useIsFocused } from '@react-navigation/native'

export const ScanScreen = ({navigation}) => {
  const globalContext = useContext(Context);
  const {userObj, setImage, domain} = globalContext;
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused()
  const camera = useRef(null);
  console.log("userid: " + userObj.pk)
  React.useEffect(() => {
    requestCameraPermission();
  }, []);
  const requestCameraPermission = React.useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') await Linking.openSettings();
  }, []);

  // get the photo from the photo, callback function
  const getPhoto = React.useCallback(async () => {
    const snapshot = await camera.current.takeSnapshot({
      quality: 85,
      skipMetadata: true,
    });

    console.log(snapshot);
    // set the image and put the image and userID in the upload data
    setImage(snapshot.path);
    const uploadData = new FormData();
    uploadData.append('user', userObj.pk); // add user id

    uploadData.append('image', {
      uri: 'file://' + snapshot.path,
      type: 'image/jpg',
      name: 'food_photo.jpg',
    });

    // send the data to back-end
    console.log(uploadData);
    fetch(`${domain}/backend/createRecord`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: uploadData,
    })
      .then(response => {
        if(response.ok) {
          console.log(response)
          return response.json();
        }
      }
      ).then(
        data => {
          console.log(data)
          navigation.navigate('Result', {
            record_id: data.record_id
          });
        }
      )
      .catch(error => {
        console.log("Something wrong...", error);
      });
  }, []);

  function renderCamera() {
    if (device == null) {
      return (
        <View>
          <Text>Opening Camera...</Text>
        </View>
      );
    } else {
      // console.log(device);
      return (
        <View style={{flex: 1}}>
          <Camera
            ref={camera}
            style={{flex: 1}}
            device={device}
            isActive={isFocused}
            enableZoomGesture
            photo={true}
          />
          <View
            style={{
              position: 'absolute',
              alignItems: 'center',
              bottom: 50,
              left: 0,
              right: 0,
            }}>
            <IconButton
              icon="camera"
              iconColor="white"
              containStyle={{
                height: 70,
                width: 70,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}
              style={{
                width: 60,
                height: 60,
              }}
              size={50}
              onPress={getPhoto}
            />
          </View>
        </View>
      );
    }
  }
  return renderCamera();
};
