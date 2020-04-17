import React, { useState } from 'react';
import Background from '~/components/Background';
import {
  Container, Content, SubmitButton,
  CameraContainer, StyledCamera, CaptureContainer,
  CameraCapButton,

} from './styles';
import api from '~/services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Toast from '~/components/Toast';
import ImageResizer from 'react-native-image-resizer';
import PropTypes from 'prop-types';

export default function ConfirmDelivery({ route, navigation }) {
  const [preview, setPreview] = useState(false);
  const [urlImage, setImageUrl] = useState('');
  const { delivery_id, deliveryman_id } = route.params;
  //console.tron.log(route.params);
  let camera;

  async function handleConfirm() {
    Toast.loading(true);
    const file = new FormData();
    //console.tron.log(urlImage, 'image');
    const resizedImage = await ImageResizer.createResizedImage(
      urlImage,
      500,
      300,
      'JPEG',
      100,
      0,
      null
    );
    file.append('file', { uri: resizedImage.uri, name: resizedImage.name, type: 'image/jpg' });

    const response = await api.put(`/deliveryman/${deliveryman_id}/deliveries_status/${delivery_id}`, file, {
      end_date: new Date()
    });
    console.tron.log(response, 'resp');
    Toast.loading(false);
    Toast.successIcon('Entrega confirmada!');
    navigation.navigate('Deliveries');
  }

  async function handleTakePicture() {
    try {
      if (camera) {
        const options = {
          quality: 0.5,
          base64: true,
          forceUpOrientation: true,
          fixOrientation: true,
          pauseAfterCapture: true,
        };
        const data = await camera.takePictureAsync(options);
        setPreview(true);
        Toast.successIcon('Foto salva com sucesso!');
        setImageUrl(data.uri);
        //console.tron.log(data.uri);
      }
    } catch (error) {
      console.tron.log(error);
    }
  }

  function handlePreview() {
    setPreview(false);
    camera.resumePreview();
  }

  return (
    <>
      <Background />
      <Container>
        <Content>
          <CameraContainer>
            <StyledCamera
              ref={ref => {
                camera = ref;
              }}
              //style={styles.preview}
              type={StyledCamera.Constants.Type.back}
              flashMode={StyledCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            />
            <CaptureContainer >
              {preview ? (
                <CameraCapButton onPress={handlePreview} >
                  <Icon name="close" size={40} color='#fff' />
                </CameraCapButton>
              ) : (
                  <CameraCapButton onPress={handleTakePicture} >
                    <Icon name="photo-camera" size={40} color='#fff' />
                  </CameraCapButton>
                )
              }
            </CaptureContainer>
          </CameraContainer>
        </Content>
        <SubmitButton onPress={handleConfirm}>Enviar</SubmitButton>
      </Container>
    </>
  );
}

ConfirmDelivery.propTypes = {
  navigation: PropTypes.shape().isRequired,
  route: PropTypes.shape().isRequired,
};
