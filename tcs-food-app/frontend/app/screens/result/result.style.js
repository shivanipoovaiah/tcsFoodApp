import {StyleSheet} from 'react-native';
import {theme} from '../../../App.style';

export const resultStyle = StyleSheet.create({
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  view: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  QRview: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop:40
  },
  headerRectangleShape: {
    marginTop: 14,
    height: 48,
    width: '85%',
    justifyContent: 'center',
    backgroundColor: theme.colors.tertiary,
  },

  headerText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },

  imageContainer: {
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    alignItems: 'center',
  },
  image: {
    height: 350,
    borderRadius: 15,
  },
  qrimage: {
    height: 250,
    width: 250,
    borderRadius: 15,
  },
  imageFlex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    width: '80%',
  },
  icon: {
    height: 30,
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    paddingRight: 10,
    width: '10%',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
    paddingLeft: 10,
    width: '10%',
  },
  leftTop: {
    marginBottom: 105,
    alignSelf: 'flex-start',
  },
  leftBottom: {
    paddingTop: 105,
    alignSelf: 'flex-end',
  },
  rightTop: {
    marginBottom: 105,
    alignSelf: 'flex-start',
  },
  rightBottom: {
    paddingTop: 105,
    alignSelf: 'flex-end',
  },
  resultRectangleShape: {
    marginTop: 8,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: theme.colors.secondary,
  },

  resultQRShape: {
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: theme.colors.secondary,
  },

  resultHeader: {
    height: 30,
    width: '30%',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: theme.colors.primary,
  },
  resultText: {
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Cochin',
    fontSize: 35,
    alignSelf: 'center',
  },
  days: {
    paddingTop: 5,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'column',
    borderColor: 'lightgray',
    borderWidth: 2,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    marginBottom: 30,
  },
  qrinfo: {
    display: 'flex',
    flexDirection: 'column',
    borderColor: 'lightgray',
    borderWidth: 2,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    marginBottom: 10,
  },
  baseText: {
    fontFamily: 'Cochin',
    fontSize: 15,
  },
  qrbaseText: {
    marginHorizontal: 10,
    marginVertical: 5,
    fontFamily: 'Cochin',
    fontSize: 15,
  },
  qrTitleText: {
    marginLeft: 45,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressText: {
    color: 'black',
    fontWeight: '700',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
