import { Card, Icon, WingBlank } from "@ant-design/react-native"
import React from "react"
import {Avatar} from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler"
import { HomeStyles } from "../Common/HomeStyles";
import {View, Text, RefreshControl, ScrollView} from 'react-native'
import moment from 'moment'
import avatarimg from '../../assets/avatar.png'
import { getBids, } from "../../stores/modules/admin";
import { getMyBids } from "../../stores/modules/auth";
import { connect } from "react-redux";

export class MyBids extends React.Component{
    constructor(props:any){
        super(props)
        this.state={
            isFetching:false,
            has_fetched:false,
            data: [],
            error: null,
            adminView:false,
        }

    }

    componentDidMount(){
        console.log('mounted')
        console.log(this.props.route)

        this.fetchBids();
        // this.setState({data: testBids})
        // Fetch Notifications
    }

    

    componentDidUpdate(prevProps){
      console.log(prevProps)
      console.log(prevProps!=this.props)
      let { admin, auth, route} = this.props
      if(prevProps!=this.props){
        console.log('update?')
        if( route.params &&  route.params.listing_id){
          console.log('admin')
          console.log(admin)
          this.setState({data:admin.getBidsData, isFetching:false})
        }else{
          this.setState({data:auth.getMyBidsData, isFetching:false})
        }
      }
    }

    viewBid(data){
      console.log('tap')
      console.log("viewBid Data")
      console.log(data)
      // if(this.state.adminView){

      // }else{ 
      //   this.props.navigation.navigate("viewListing")
      // }
        
    }

    fetchBids(){
      if(this.props.route.params && this.props.route.params.listing_id){
        //this is fetching the bids of the listing id
        this.props.getBids(this.props.route.params.listing_id)

      }else{
        // this is probably us looking at our bids
        this.props.getMyBids();
      }
    }

    renderBidCard(data, index){
        let returnString = ""

        console.log(data)

        if(!this.props.route.params){
          returnString = `$${data.value} - ${data.listing.name} ${data.listing.make_of_vehicle} ${data.listing.model}`
        }else{
          returnString = `${data.user.firstname} ${data.user.lastname} has bid $${data.value} - ${data.listing.name} ${data.listing.make_of_vehicle} ${data.listing.model}`
        }

        return (
          <TouchableOpacity key={index}  onPress={() =>{
            console.log("tap")
          }}>
            <Card
            key={index}
            style={[
              HomeStyles.entryNotification,
              {
                backgroundColor: data.is_read ? '#FFF' : '#75d2fa',
                borderColor: data.is_read ? '#FFF' : '#75d2fa',
              },
            ]}>
            
              <Card.Header
                style={HomeStyles.notificationBody}
                title={
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    {/* <Avatar
                      rounded
                      containerStyle={{height: 35}}
                      source={returnObject}
                    /> */}
                    <Text
                      style={{
                        textAlign: 'justify',
                        marginRight: 30,
                        marginLeft: 10,
                        fontSize: 14,
                        fontWeight: '700',
                      }}>
                      {returnString}
                    </Text>
                  </View>
                }
              />
            
            <Text style={{alignSelf: 'flex-end', marginRight: 10}}>
              {moment(data.created_at).fromNow()}
            </Text>
          </Card>
          </TouchableOpacity>
        )
    }

    render(){

        return (  <View style={{borderTopColor: '#f7601b', borderColor: '#00000000', borderWidth: 3}}>
            <WingBlank style={{paddingTop: 15}}>
              <RefreshControl
                refreshing={this.state.isFetching}
                onRefresh={() => {
                  this.setState({isFetching: true});
                  this.fetchBids()
                }}
                style={HomeStyles.ScrollViewLimit}>
                <ScrollView style={HomeStyles.ScrollViewLimit}>
                  <View>
                    {this.state.data.map((entry:Object, index:number) =>
                      this.renderBidCard(entry, index),
                    )}
                    {this.state.data.length == 0 && (
                      <View style={{alignSelf: 'center', alignContent: 'center'}}>
                        <Text
                          style={{
                            fontSize: 30,
                            marginTop: '70%',
                            fontWeight: 'bold',
                          }}>
                          No Bids yet.
                        </Text>
                      </View>
                    )}
                  </View>
                </ScrollView>
              </RefreshControl>
            </WingBlank>
          </View>)
    }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  listing: state.listing,
  admin: state.admin,
})


const mapActionCteators = {
  getBids,
  getMyBids
}

export default connect(mapStateToProps, mapActionCteators)(MyBids)