import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Flex, Grid, Icon, Provider, WhiteSpace } from '@ant-design/react-native';
import Navigator from './src/Navigator'
import {Button} from '@ant-design/react-native'
import {PersistGate} from 'redux-persist/integration/react';
import React from 'react'
import * as Font from 'expo-font';
//redux
import {Provider as ReduxProvider} from 'react-redux';
import configureStore from './configureStore';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

// const _XHR = global.originalXMLHttpRequest
//   ? global.originalXMLHttpRequest
//   : global.XMLHttpRequest;
// global.FormData = global.originalFormData || global.FormData;

// XMLHttpRequest = _XHR;

class App extends React.Component {
  store:Object
  persistor:Object

  constructor(props:any){
    super(props)
    this.state = {
      theme: null,
      currentTheme:null,
      isReady: false,
    }
    const {persistor, store} = configureStore();
    this.persistor = persistor;
    this.store = store;

  }


  async componentDidMount() {
    await Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    );

    await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antfill.ttf')
    );
    // eslint-disable-next-line
    this.setState({ isReady: true });
  }

  render() {
    return (<>
    <ReduxProvider store={this.store}>
      <Provider>
      <PersistGate loading={null} persistor={this.persistor}>
        { this.state.isReady && <Navigator {...this.props}></Navigator>}
        <Toast/>
        </PersistGate>
      </Provider>
      </ReduxProvider>
      </>)
  }
}

export default App



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius:20,
    borderWidth: 3,
    width: 300,
    margin: 10,
    borderColor: '#000',
  },
  styleText:{
    fontSize:75,
    fontWeight:'400',
    marginLeft: 30,
    marginRight: 30
  },
  spacing: {
    margin: 50,
  },
  roundIcons: {
    textAlign:'center',
    textAlignVertical:'center',
    backgroundColor: '#BBB',
    borderColor: '#BBB',
    color:'000',
    height: 50,
    width: 50,
    borderRadius: 90,
    marginLeft: 10,
    marginRight: 10,
  }
});

