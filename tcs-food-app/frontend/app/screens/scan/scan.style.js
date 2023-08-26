import {StyleSheet} from 'react-native';
import {theme} from '../../../App.style';

export const scanStyle = StyleSheet.create({
  content: {
    backgroundColor: theme.colors.primary,
  },
  image: {
    width: 240,
    height: 240,
    borderColor: 'grey',
    borderWidth: 5,
    resizeMode: 'contain',
  },

  container: {
    backgroundColor: theme.colors.primary,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  marker: {
    borderColor: '#000',
    borderWidth: 3,
  },
  buttonText: {
    fontSize: 21,
    color: '#000',
    alignSelf: 'center',
  },

});
