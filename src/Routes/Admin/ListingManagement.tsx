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
import { getListings } from '../../stores/modules/admin';
import ItemList from '../Common/ItemList/ItemList';

const actions = [
  {
    text: "Create User",
    // icon: require("./images/ic_accessibility_white.png"),
    name: "createUser",
    position: 2
  },
];
class ListingManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isPending:false,
      isPublic:false,
      isEnded: false,
      input:null,
      isfetching:false,
    };
  }

  componentDidMount() {
    // this.setState({data:sampleData})
    this.props.getListings()
  }

  componentDidUpdate(prevProps){
    if(prevProps!=this.props){
      let {admin} = this.props
      if(admin.getListingsSuccess && admin.getListingsData){
        console.log("Setting data")
        console.log(admin.getListingsData)
          this.setState({data:admin.getListingsData.data, isfetching:false})
      }
      if(admin.getListingsError){

      }
    }
  }

  getData(){
    this.setState({isfetching:true})
    this.props.getListings()
  }

  floatingAction(action){
    if(action=="createUser"){
      this.props.navigation.navigate('createUser')
    }
  }

  onChangeCheckBoxes(type, value){
    this.setState({"":""})
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
                    <Checkbox checked={this.state.isPending}  onChange={(v)=>{this.onChangeCheckBoxes("isPending", v.target.checked)}}>Pending</Checkbox>
                    <Checkbox checked={this.state.isPublic} onChange={(v)=>this.setState({isPublic:v.target.checked})}>Public</Checkbox>
                    <Checkbox checked={this.state.isEnded} onChange={(v)=>this.setState({isPublic:v.target.checked})}>Has Ended</Checkbox>
                </View>
                <WhiteSpace size="lg"/>
                <View style={{borderRadius:15, borderWidth:1}}>
                <InputItem>Search</InputItem>
                </View>
                <WhiteSpace size="lg"/>
                {/* <ScrollView style={{height:'100%'}}>
                  
                <Text>AAA?? wtf</Text>
                  </ScrollView> */}
                  <ItemList itemList={this.state.data} navigation={this.props.navigation}/>
            </WingBlank>
        
          </ScrollView>
          </RefreshControl>
          {/* <FloatingAction 
              distanceToEdge={{vertical:80, horizontal:40}}
              actions={actions}
              onPressItem={obj =>{
                this.floatingAction(obj)
              }}
            /> */}
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
  getListings,
};

export default connect(mapStateToProps, mapActionCreators)(ListingManagement);

ListingManagement.propTypes = {};

// export default ListingManagement;
