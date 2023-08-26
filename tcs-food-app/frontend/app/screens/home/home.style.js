import {StyleSheet} from 'react-native';

export const homeStyle = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  footer: {
    flexDirection: "row",
    position: 'absolute',left: 10, right: 0, bottom: 0,
    paddingBottom: 20,
    alignItems: 'center',
    marginHorizontal:20
  },
  baseText: {
    fontSize: 25,
    color: '#5cb25d',
  },
  button: {
    width:160,
    borderRadius:8
  }
});
