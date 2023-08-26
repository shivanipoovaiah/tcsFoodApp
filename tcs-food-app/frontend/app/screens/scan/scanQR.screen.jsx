import React from 'react';

import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {scanStyle} from './scan.style';

const ScanQRScreen = ({navigation}) => {

  onSuccess = e => {
    console.log('QR code scanned!', e.data);
    navigation.navigate('QRResult', {
      data: e.data,
    });
  };
  return (
    <QRCodeScanner
      onRead={this.onSuccess}
      flashMode={RNCamera.Constants.FlashMode.torch}
      containerStyle={scanStyle.container}
      cameraStyle={scanStyle.qrCamera}
      cameraContainerStyle={scanStyle.qrCamera}
      showMarker={true}
      markerStyle={scanStyle.marker}
    />
  );
};

export default ScanQRScreen;
