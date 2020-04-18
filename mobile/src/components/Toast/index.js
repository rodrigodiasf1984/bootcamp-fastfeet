import Toast from 'react-native-tiny-toast';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: '#E74040',
    fontWeight: 'bold',
  },
  erroText: {
    color: '#fff',
  },
  successContainer: {
    backgroundColor: '#11aa11',
    fontWeight: 'bold',
  },
  successIconContainer: {
    backgroundColor: '#11aa11',
    height: 120,
    width: 120,
  },
});

export const successIcon = (msg) => {
  Toast.showSuccess(msg, {
    showSuccess: true,
    containerStyle: styles.successIconContainer,
    duration: 2000,
    shadow: true,
  });
};

export const success = (msg) =>
  Toast.show(msg, {
    position: Toast.position.center,
    containerStyle: styles.successContainer,
    textStyle: styles.erroText,
    imgStyle: {},
    mask: false,
    maskStyle: {},
    duration: 2000,
    animation: true,
  });

export const error = (msg) =>
  Toast.show(msg, {
    position: Toast.position.TOP,
    containerStyle: styles.errorContainer,
    textStyle: styles.erroText,
    imgStyle: {},
    mask: false,
    maskStyle: {},
    duration: 2000,
    animation: true,
  });

export function loading(status) {
  if (status) {
    Toast.showLoading('Carregando...');
  } else {
    Toast.hide();
  }
}
