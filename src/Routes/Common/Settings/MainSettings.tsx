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
import { View, Text, ScrollView, Image, ImageBackground } from 'react-native';
import { logout } from '../../../stores/modules/auth';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
// import {updateProfilePic} from '../../stores/modules/user';
// import RNFetchBlob from 'rn-fetch-blob';
// import {API_HOST} from '@env';
import { profileStyles, MAIN_COLOR } from '../ProfileStyles';
import { HomeStyles } from '../HomeStyles';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
class MainSettings extends Component {
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
    // let { first_name, middle_name, last_name } = this.state
    return (
      <View>
        <ScrollView style={[HomeStyles.ScrollViewLimit, { height: '100%' }]}>
            <WingBlank>
            <View style={profileStyles.listOptions}>
              <WhiteSpace size="lg" />
              
              <List.Item
                // onPress={() =>
                //   this.props.navigation.navigate('profile')
                // }
                thumb={
                  <Icon name='profile' style={profileStyles.imageStyle} />

                }>
                <Text style={profileStyles.listItem}>Account Linking</Text>
                <Text style={profileStyles.listItemSubtitle}>
                  Link your profile to a Google Account
                  (inop)
                </Text>
              </List.Item>

              <WhiteSpace size="lg" />
              </View>


            <WhiteSpace size="lg" />
            
          </WingBlank>
        </ScrollView>
      </View>
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

export default connect(mapStateToProps, mapActionCreators)(MainSettings);

MainSettings.propTypes = {};

// export default MainSettings;
