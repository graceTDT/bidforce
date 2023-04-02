import {StyleSheet, Dimensions} from 'react-native';

export const MAIN_COLOR = '#061e69';

export const HomeStyles = StyleSheet.create({
  cancelledText: {
    color: '#999',
  },
  homeCards: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
    marginVertical: 10,
    borderWidth: 2,
    // borderColor: '#FFF',
    borderColor: '#999',
    borderRadius: 15,
    // backgroundColor: '#EEE',
  },
  flexibleGrid: {
    flex:1, 
    flexDirection:'row',
    flexWrap:'wrap',
  },
  flexibleRow:{
    flexDirection:'row'
  },
  listingCards:{
    marginLeft:10,
    fontWeight:'bold',
    color: '#ddd'
  },
  listingCardsDesc:{
    fontWeight:'normal',
    fontStyle:'italic',
  },
  entryCards: {
    marginTop: 5,
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  entryRating: {
    borderRadius: 15,
    shadowOpacity: 0.25,
    shadowRadius: 1,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#FFF',
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  entryHomepage: {
    marginTop: 5,
    borderRadius: 15,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#000',
  },
  entryNotification: {
    // marginTop: 5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
    marginVertical: 2,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  notificationBody: {
    marginTop: 5,
  },
  ScrollViewLimit: {
    marginBottom: 50,
    // marginBottom: 40
  },
  viewProfileLimit: {
    marginBottom: 50,
    // marginBottom: 40
  },
  listingTitle:{
    color:'#000',
    fontWeight:'bold',
    fontSize:20
  },
  listingManuf:{
    color:'#000',
    fontWeight:'bold',
    fontStyle:'italic',
    fontSize:20
  },
  listingYear:{
    fontStyle:'normal'
  }
});
