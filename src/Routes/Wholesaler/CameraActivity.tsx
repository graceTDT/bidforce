import { ActivityIndicator, Button, Carousel, Icon, InputItem, Modal, Progress } from '@ant-design/react-native'
import React, { Ref } from 'react'
import { StretchyScrollView } from 'react-native-stretchy';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Camera, CameraType } from 'expo-camera'

var permission;
var cameraInstance;
export default class CameraActivity extends React.Component {
  camera: Ref<Camera>

  constructor(props: any) {
    super(props)
    this.state = {
      mode:CameraType.back,
      permissionError: null,
      cameraState: null,
    }
    this.camera = React.createRef()
  }


  componentDidMount() {
    this.setState({loaded: true })
    permission = Camera.requestCameraPermissionsAsync()
    // permission = Camera.useCameraPermissions();
    if(!permission){
      this.setState({permissionError: "NO PERMIT"})
    }
    // this.setState({cameraState: })
  }

  componentDidUpdate(props){
    console.log('compo update1')
    console.log(props)
    console.log('this')
    console.log(this)

    console.log(this.camera)
  }

  capture(){
    console.log(this.camera)
    console.log(cameraInstance)
    var vv = <Camera></Camera>
    console.log(vv)
    // let v = this.camera.takePictureAsync()
    // console.log(v)
  }

  afterchangeCallback(index) {
    console.log(index)
    // this.setState({ selectedIndex: index })
  }

  toggleCameraType(){
    let curr = this.state.mode;
    this.setState({mode: curr == CameraType.back ? CameraType.front : CameraType.back})
  }

  render() {
    return (
      <>
        <Camera ref={(ref)=> cameraInstance = ref} style={styles.camera} type={this.state.mode}>
          <View>
            {this.state.permissionError ? "No Permissions" : null}
            <TouchableOpacity onPress={()=> this.toggleCameraType()}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>

        <Button onPress={()=>this.capture()} >CaptureTest</Button>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});