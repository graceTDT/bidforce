import React, { Component } from 'react';
import {
  WhiteSpace,
  WingBlank,
  InputItem,
  Button,
  Checkbox,
  Icon,
  List,
} from '@ant-design/react-native';
import { View, Text, ScrollView, Image, ImageBackground, StyleSheet } from 'react-native';
import { logout } from '../../stores/modules/auth';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
// import {updateProfilePic} from '../../stores/modules/user';
// import RNFetchBlob from 'rn-fetch-blob';
// import {API_HOST} from '@env';
import { profileStyles, MAIN_COLOR } from './ProfileStyles';
import { HomeStyles } from './HomeStyles';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
const API_URL = 'http://165.22.48.133:3333';
import logo from './../../assets/bidforce.png';
class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      isLoggingIn: false,
      loginError: false,
      loginErrorDetails: '',
      connectionError: false,
      errorDialog: false,
      errorMessage: null,
      first_name: 'Mike',
      middle_name: 'Burn',
      last_name: 'Fire',
    };
  }

  componentDidMount() {
    let { loginData } = this.props.auth
    // console.log("Mounted")
    // console.log(this.props)
    this.setState({
      first_name:loginData.firstname,
      middle_name: loginData.middlename,
      last_name:loginData.lastname
    })
  }

  componentDidUpdate(props) {
    let { auth } = props;

    console.log("PROP UPDATE_MENU")
    console.log(props)

    if (auth.logoutSuccess) {
      this.props.navigation.replace('login');
    }
  }

  componentWillReceiveProps(props) {
    let { auth } = props;

    console.log("ASD?")

    if (auth.logoutSuccess) {
      this.props.navigation.replace('login');
    }
  }

  //   uploadProfilePic(data) {}

  render() {
    return (
      <>
        <View style={profileStyles.container}>
          <WingBlank>
            <View style={{flexDirection: 'row'}}>
              <Avatar
                avatarStyle={{
                  borderRadius: 90,
                  borderWidth: 3,
                  borderColor: '#000',
                }}
                // iconStyle={{ borderRadius: 45, borderWidth: 15 }}
                onPress={() => {
                  Toast.show({text1:"Avatar Picture currently not implemented", text2:'Probably on the next update', type:'error'})
                  // FilePickerManager.showFilePicker(null, async (response) => {
                  //   console.log('response');
                  //   console.log(response);

                  //   if (response.didCancel) {
                  //     console.log('Cancelled');
                  //   } else if (response.error) {
                  //     console.log('picker error');
                  //     console.log(response.error);
                  //   } else {
                  //     let data = {};
                  //     data.photo = await RNFetchBlob.fs
                  //       .readFile(`${response.uri}`, 'base64')
                  //       .then((dataX) => {
                  //         console.log('UPLOAD FILE PHOTO');
                  //         console.log(dataX);
                  //         data.photo = dataX;
                  //         data.fileType = /[.]/.exec(response.fileName)
                  //           ? /[^.]+$/.exec(response.fileName)[0]
                  //           : undefined;

                  //         // this.props.updateProfilePic(data);
                  //       });
                  //     // console.log('good');
                  //     // this.setState({selectedFile: response});
                  //     // console.log(response);
                  //   }
                  // });
                }}
                rounded
                size="xlarge"
                source={{
                  uri:
                    this.props.auth.loginData &&
                      this.props.auth.loginData.profile &&
                      this.props.auth.loginData.profile.picture
                      ? `${API_HOST}/${this.props.auth.loginData.profile.picture.path}`
                      : 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
                }}
              />
              <View>
                <View
                  style={{
                    marginTop: 30,
                    marginLeft: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      color: '#fff'
                    }}>
                    {this.state.last_name}
                  </Text>
                  <Text style={{ fontSize: 20, color: '#ccc' }}>
                    {this.state.first_name} {this.state.middle_name}
                  </Text>
                </View>
                {this.props.auth.loginData &&
                  this.props.auth.loginData.profile &&
                  this.props.auth.loginData.profile.is_company && (
                    <Text
                      style={{
                        fontSize: 16,
                        fontStyle: 'italic',
                        color: '#777',
                        marginLeft: 20,
                      }}>
                      {this.props.auth.loginData &&
                        this.props.auth.loginData.company.name}
                    </Text>
                  )}

              </View>
            </View>
            <WhiteSpace size="lg" />
            <View>
              <WhiteSpace size="lg" />
              {this.props.auth && this.props.auth.loginData && this.props.auth.loginData.user_type == "ADMIN" && (
                <>
                  <List.Item style={profileStyles.list}
                    onPress={() =>
                      this.props.navigation.navigate('usermanagement')
                    }
                    thumb={
                      <Icon name='profile' style={profileStyles.imageStyle} />

                    }>
                    <Text style={profileStyles.listItem}>User Management</Text>
                    <Text style={profileStyles.listItemSubtitle}>
                      Tap to create, edit, view or update Users.
                    </Text>
                  </List.Item>

                  <List.Item style={profileStyles.list}
                    onPress={() =>
                      this.props.navigation.navigate('listingmanagement')
                    }
                    thumb={
                      <Icon name='profile' style={profileStyles.imageStyle} />

                    }>
                    <Text style={profileStyles.listItem}>Listing Management</Text>
                    <Text style={profileStyles.listItemSubtitle}>
                      Tap to manage listings
                    </Text>
                  </List.Item>
                </>
              )}
              <List.Item style={profileStyles.list}
                onPress={() =>
                  this.props.navigation.navigate('profile')
                }
                thumb={
                  <Icon name='profile' style={profileStyles.imageStyle} />

                } >
                <Text style={profileStyles.listItem}>Profile</Text>
                <Text style={profileStyles.listItemSubtitle}>
                  Tap to view or set your profile
                </Text>
              </List.Item>

              <List.Item style={profileStyles.list}
                onPress={() =>
                  this.props.navigation.navigate('conversations')
                }
                thumb={
                  <Icon name='mail' style={profileStyles.imageStyle} />

                }>
                <Text style={profileStyles.listItem}>Inbox</Text>
                <Text style={profileStyles.listItemSubtitle}>
                  Tap to view your messages
                </Text>
              </List.Item>

              <List.Item style={profileStyles.list}
                onPress={() => this.props.navigation.navigate('settings')}
                thumb={
                  <Icon name='setting' style={profileStyles.imageStyle} />
                }>
                <Text style={profileStyles.listItem}>Settings</Text>
                <Text style={profileStyles.listItemSubtitle}>
                  Tap to view settings
                </Text>
              </List.Item>
              <List.Item style={profileStyles.list}
                onPress={() => this.props.logout()}
                thumb={
                  <Icon name='key' style={profileStyles.imageStyle} />
                }>
                <Text style={profileStyles.listItem}>Logout</Text>
                <Text style={profileStyles.listItemSubtitle}>
                  Tap to end your current session
                </Text>
              </List.Item>
              <WhiteSpace size="lg" />
            </View>

            {/* <Image
            source={imageLogo}
            style={{ height: 80, width: '100%', alignSelf: 'center' }}
            resizeMode="center"
          /> */}
            <WhiteSpace size="lg" />
          </WingBlank>
        </View>
        <View style={profileStyles.divimg}>
          <Image source={logo} style={profileStyles.bottomlogo}/>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  // user: state.user,
});

const mapActionCreators = {
  logout,
  //   updateProfilePic,
  // login,
};

export default connect(mapStateToProps, mapActionCreators)(MenuScreen);

MenuScreen.propTypes = {};

// export default MenuScreen;

