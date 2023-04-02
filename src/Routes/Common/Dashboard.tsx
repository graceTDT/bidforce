import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, RefreshControl } from 'react-native';
import { Button, WhiteSpace, Flex, Icon, WingBlank, Drawer, List, Tabs, } from '@ant-design/react-native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import {Badge} from 'react-native-elements';
import ItemList from './ItemList/ItemList';
import { getListings } from '../../stores/modules/listing';
import { connect } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import logo from './../../assets/bidforce.png';
export class Dashboard extends React.Component {


  constructor(props: any) {
    super(props)
    this.state = {
      drawerOpen: false,
      bdages: 0,
      items: [],
      isLoading:false,
    }
  }

  componentDidMount(){
    console.log("mounted-dashboard")
    console.log(this.props)

    this.props.getListings();

    Toast.show({text1:'Welcome Back!', text2:'Currently in development. Bugs may appear'})
  }

  componentDidUpdate(prevProps){
    let { listing } = this.props

    console.log(listing)
    if(prevProps!=this.props){
      if(listing.getListingError){
        this.setState({isLoading:false})
      }
      if(listing.getListingData){
        console.log(listing.getListingData)
        if(listing.getListingData.data)
        this.setState({items:listing.getListingData.data, isLoading:false})
      }
    }
  }


  render() {
    const tabs = [
      {title: 'Listings'},
      {}
    ]
    const sidebar = (<ScrollView>
      <List>
        <List.Item>
          Settings
        </List.Item>
      </List>
    </ScrollView>)
    return (<SafeAreaView>
      <View>
        <Image source={logo} style={styles.logoimg}/>
      </View>
      <View
          style={{
            backgroundColor: '#000',
            borderWidth: 3,
            borderBottomColor: '#f7601b',
            marginTop:30,
            height: 56,
            flexDirection: 'row',
            justifyContent: 'space-between',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              marginLeft: 10,
              elevation: 5,
            }}>
            {/* <Image source={logo} style={{height: 40, width: 40}} /> */}
            <Text
              style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                color: "#ddd",
                fontSize: 25,
                marginLeft: 20,
              }}>
              WholeSale
            </Text>
          </View>
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginRight: 10,
            }}>
            <Icon
              name="bell"
              style={{alignSelf: 'center'}}
              size="lg"
              onPress={() => this.props.navigation.navigate('notifications')}
            />
            {this.state.badges != 0 && (
              <Badge
                value={this.state.badges != 0 ? this.state.badges : null}
              />
            )}
            {this.state.badges == 0 && <View style={{marginRight: 18}} />}
          </View>
        </View>
        {/* <Button onPress={() => this.props.navigation.navigate('notifications')} ></Button> */}
        <WingBlank>
          <WhiteSpace size="lg"/>
          <Text style={{fontSize:20, fontWeight:'bold', backgroundColor: '#000', padding: 10, color: '#eee'}}>What's New?</Text>
          <WhiteSpace size="lg"/>
          <RefreshControl refreshing={this.state.isLoading} onRefresh={()=>{
            this.setState({isLoading:true})
            this.props.getListings()}}>
            <ScrollView style={{paddingTop: 10, backgroundColor: '#000'}}>
              <ItemList itemList={this.state.items} navigation={this.props.navigation}/>
            </ScrollView>
          </RefreshControl>
            <Image source={logo} style={styles.bottomlogo}/>
        </WingBlank>
    </SafeAreaView>)
  }
}

const styles = StyleSheet.create({
  safeArea: {
    marginTop: 24,
    paddingTop: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#AAA',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  logoimg:{
    aspectRatio: 4,
    resizeMode: 'contain',
    marginBottom: -30,
    height: 30,
  },
  bottomlogo: {
    resizeMode: 'stretch',
    width: 330,
    height: 110,
    opacity: 0.5,
    padding: 0
  },
  button: {
    borderRadius: 20,
    borderWidth: 3,
    width: 300,
    margin: 10,
    borderColor: '#000',
  },
  styleText: {
    fontSize: 75,
    fontWeight: '400',
    marginLeft: 30,
    marginRight: 30
  },
  spacing: {
    margin: 50,
  },
  roundIcons: {
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#BBB',
    borderColor: '#BBB',
    color: '000',
    height: 50,
    width: 50,
    borderRadius: 90,
    marginLeft: 10,
    marginRight: 10,
  }
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  listing: state.listing
})


const mapActionCteators = {
  getListings
}

export default connect(mapStateToProps, mapActionCteators)(Dashboard)