import { StyleSheet, Dimensions } from 'react-native';

export const MAIN_COLOR = '#fff';

export const profileStyles = StyleSheet.create({
    listItem: {
        fontSize: 20,
        fontWeight: 'bold',
        color: MAIN_COLOR
    },
    listBorder: {
        borderColor: '#000'
    },
    listIcon: {
        paddingRight: 20
    },
    listItemSubtitle: {
        fontStyle: "italic",
        color: '#ccc'
    },
    imageStyle: {
        maxHeight: 25, maxWidth: 25, marginHorizontal: 15
    },
    bottomlogo: {
      aspectRatio: 1,
      resizeMode: 'contain',
      marginTop: -90,
      height: 300,
      opacity: 0.5
    },
    divimg: {
      height: 100,
      display: 'flex',
      alignItems: 'center',
    },
    container: {
      backgroundColor: 'black',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      paddingTop: 17
    },
    list: {
        backgroundColor: '#000',
    }
});
