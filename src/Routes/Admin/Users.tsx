import React, {Component} from 'react';
import {FloatingAction} from 'react-native-floating-action'
import {
  WhiteSpace,
  WingBlank,
  InputItem,
  Button,
  Checkbox,
  Icon,
  List,
} from '@ant-design/react-native';
import {View, Text, ScrollView, Image, ImageBackground, RefreshControl} from 'react-native';
import {logout} from '../../stores/modules/auth';
import {connect} from 'react-redux';
import {Avatar} from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
// import {updateProfilePic} from '../../stores/modules/user';
// import RNFetchBlob from 'rn-fetch-blob';
// import {API_HOST} from '@env';
import {profileStyles, MAIN_COLOR} from './ProfileStyles';
import { HomeStyles } from '../../Routes/Common/HomeStyles';
import { getUsers } from '../../stores/modules/admin';

const sampleData = [
    {    email: '1234@abc.co',
    user_id: 1,
    firstname: 'Mike',
    middlename: 'Burn',
    lastname: 'Fire',
    phone_number: '09123456789',
    address: 'Blk 1234, Dummy St. SA LA, CountryName',
    companyaddress: '1st Door, Floor 3, Dummy Bldg, Blk 5678 ave. CountryName'},
    {    email: '1234@abc.co',
    user_id: 1,
    firstname: 'Mike',
    middlename: 'Burn',
    lastname: 'Fire',
    phone_number: '09123456789',
    address: 'Blk 1234, Dummy St. SA LA, CountryName',
    companyaddress: '1st Door, Floor 3, Dummy Bldg, Blk 5678 ave. CountryName'},
    {    email: '1234@abc.co',
    user_id: 1,
    firstname: 'Mike',
    middlename: 'Burn',
    lastname: 'Fire',
    phone_number: '09123456789',
    address: 'Blk 1234, Dummy St. SA LA, CountryName',
    companyaddress: '1st Door, Floor 3, Dummy Bldg, Blk 5678 ave. CountryName'},
    {    email: '1234@abc.co',
    user_id: 1,
    firstname: 'Mike',
    middlename: 'Burn',
    lastname: 'Fire',
    phone_number: '09123456789',
    address: 'Blk 1234, Dummy St. SA LA, CountryName',
    companyaddress: '1st Door, Floor 3, Dummy Bldg, Blk 5678 ave. CountryName'},
]

const actions = [
  {
    text: "Create User",
    // icon: require("./images/ic_accessibility_white.png"),
    name: "createUser",
    position: 2
  },
];
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isUser:false,
      isWholesaler:false,
      isAdmin:false,
      input:null,
      isfetching:false,
    };
  }

  componentDidMount() {
    this.setState({data:sampleData})
    this.props.getUsers()
  }

  componentDidUpdate(prevProps){
    if(prevProps!=this.props){
      let {admin} = this.props
      if(admin.getUsersSuccess && admin.getUsersData){
        console.log("HA")
        console.log(admin.getUsersData)
          this.setState({data:admin.getUsersData, isfetching:false})
      }
      if(admin.getUsersError){

      }
    }
  }

  getData(){
    this.setState({isfetching:true})
    this.props.getUsers()
  }

  floatingAction(action){
    if(action=="createUser"){
      this.props.navigation.navigate('createUser')
    }
  }

//   uploadProfilePic(data) {}

  render() {
    return (
      <>
        <RefreshControl refreshing={this.state.isfetching} onRefresh={()=> this.getData()} >
          <ScrollView style={[HomeStyles.ScrollViewLimit, {height: '100%'}]}>
            <WhiteSpace size="lg" />
            <WingBlank>
                <View style={{flex:1, flexDirection:'row'}}>
                    <Checkbox checked={this.state.isUser}  onChange={(v)=>{this.setState({isUser:v.target.checked})}}>User</Checkbox>
                    <Checkbox checked={this.state.isWholesaler} onChange={(v)=>this.setState({isWholesaler:v.target.checked})}>Wholesaler</Checkbox>
                    <Checkbox checked={this.state.isAdmin} onChange={(v)=>this.setState({isAdmin:v.target.checked})}>Admin</Checkbox>
                </View>
                <WhiteSpace size="lg"/>
                <View style={{borderRadius:15, borderWidth:1}}>
                <InputItem>Search</InputItem>
                </View>
                <WhiteSpace size="lg"/>
                {this.state.data && this.state.data.length >0 && this.state.data.map((data, index) => {
                    return (<List.Item onPress={()=> this.props.navigation.navigate("profile", data)}>
                        <Text>{data.firstname} {data.lastname}</Text>
                    </List.Item>)
                })}
            </WingBlank>
        
          </ScrollView>
          </RefreshControl>
          <FloatingAction 
              distanceToEdge={{vertical:80, horizontal:40}}
              actions={actions}
              onPressItem={obj =>{
                this.floatingAction(obj)
              }}
            />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  admin: state.admin,
});

const mapActionCreators = {
  logout,
  getUsers,
};

export default connect(mapStateToProps, mapActionCreators)(Users);

Users.propTypes = {};

// export default Users;
