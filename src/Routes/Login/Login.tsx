import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import { Button, WhiteSpace, Flex, Icon, InputItem, Modal, ActivityIndicator,List } from '@ant-design/react-native';
import { StatusBar } from 'expo-status-bar';
// import {API_URL} from '@env';
import { login } from '../../stores/modules/auth';
import { connect } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import loginlogo from './../../assets/bidforce.png';
const API_URL = 'http://165.22.48.133:3333';
export class Login extends React.Component{
    constructor(props){
      super(props)
      
      this.state = {
        isLoginPressed: false,
        email: null,
        password: null,
        isLoggingIn:false,
        // error: null,
      }
    }

    componentDidMount(){
      console.log(API_URL)
      console.log(this.props)
    }

    componentDidUpdate(props, props2){
      let { auth } = this.props
      console.log('prop update')
      console.log(props)
      console.log('propaa2')
      console.log(props2)

      if(props!=this.props){
        if(auth.loginSuccess){
          this.setState({isLoggingIn:false, error:null})
          Toast.show({text1:"Welcome back"})
          // this.props.navigation.replace("dashboard")
        }
        if(auth.loginError){
          this.setState({isLoggingIn:false, error: auth.loginError})
        }
      }
    }

    login(){
      this.props.login({email:this.state.email, password:this.state.password})
      this.setState({isLoggingIn:true})
    }
    
    render(){
        return (<View style={styles.container}>
            <StatusBar style="auto" />
            <Image source={loginlogo} style={styles.logoimg}/>
            {!this.state.isLoginPressed && (
              <>
              <Button style={styles.button} onPress={()=>this.setState({isLoginPressed:true})}><Text style={styles.btnText}>Login</Text></Button>
              {/* <Button style={styles.button} onPress={()=>this.props.navigation.navigate('register')}>Create Account</Button> */}
              <WhiteSpace size='lg'/>
              <WhiteSpace size='lg'/>
              <Flex style={{flexDirection:'row'}}>
                <Button style={styles.roundIcons}><Icon style={{color:'#555'}} name='facebook'/></Button>
                <Button style={styles.roundIcons}><Icon style={{color:'#555'}} name="twitter"/></Button>
                <Button style={styles.roundIcons}><Icon style={{color:'#555'}} name='google-plus'/></Button>
              </Flex>
              </>
              
            )}

            {this.state.isLoginPressed && (
              <>
              <View class="logindiv" style={styles.logindiv}>
                <Text style={styles.title}>Login</Text>
                <Text style={{color: '#ccc'}}>Sign in to continue</Text>

                <InputItem type='email-address' value={this.state.email} labelNumber={2} style={styles.input} onChangeText={(v)=> this.setState({email:v})} >
                  <Icon style={{color:'#fff',width: 30}} name='user'/>
                  {/* <Text style={styles.label}>Username:</Text> */}
                </InputItem>
                <Text style={styles.label}>Username</Text>  
                <InputItem type='password' value={this.state.password} labelNumber={2} style={styles.input} onChangeText={(v)=> this.setState({password:v})} >
                  <Icon style={{color:'#fff'}} name='lock'/>
                  {/* <Text style={styles.label}>Password:</Text>   */}
                </InputItem>
                <Text style={styles.label}>Password</Text>  
                <WhiteSpace/>
                <Text>{this.state.error }</Text>
                <Button loading={this.state.isLoggingIn} onPress={()=>this.login()} style={styles.button}><Text style={styles.btnText}>Login</Text></Button>

                <WhiteSpace/>
                <WhiteSpace/>
                <Text style={{color: '#ccc',fontSize: 17}} onPress={()=>this.setState({isLoginPressed:false, error:null,})}>Back</Text>
              </View>
              <View style={{height: 237}}></View>
            </>
            )}

            <Modal transparent popup visible={this.state.isLoggingIn}>
              <Text><ActivityIndicator/>     Logging in...</Text>
              </Modal>

          </View>)
    }
}

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: '#fa7c42',
      fontSize: 30,
      fontWeight: '900'
    },
    logoimg: { 
      aspectRatio: 0.7,
      resizeMode: 'contain',
      height: 500,
    },
    button: {
      alignSelf:'center',
      borderRadius:20,
      width: 300,
      margin: 10,
      backgroundColor: '#f7601b',
    },
    buttonLogin: {
      alignSelf:'center',
      borderRadius:20,
      borderWidth: 3,
      width: 200,
      margin: 20,
      borderColor: '#000',
    },
    input: {
      color: 'white',
      paddingLeft: 0,
      left: 0,
    },
    label: {
      color: 'white',
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
    },
    btnText: {
      color: 'white',
    },
    logindiv: {
      padding: 15,
      alignItems: 'center',
      backgroundColor: '#000',
      position: 'absolute',
      bottom: 0,
      width: width,
      height: '50%',
      minHeight: 300,
      borderTopEndRadius: 10,
      borderTopStartRadius: 10,
      transition: '1s'
    }
  });
  

  const mapStateToProps = (state) => ({
    auth: state.auth
  })

  const mapActionCteators = {
    login
  }

  export default connect(mapStateToProps, mapActionCteators)(Login)