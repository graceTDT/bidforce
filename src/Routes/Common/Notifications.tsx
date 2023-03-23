import { Card, Icon, WingBlank } from "@ant-design/react-native"
import React from "react"
import {Avatar} from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler"
import { HomeStyles } from "./HomeStyles"
import {View, Text, RefreshControl, ScrollView} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux';
import avatarimg from '../../assets/avatar.png'
import { getNotifications, } from "../../stores/modules/auth";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const testNotifications = [
    {user_id: 1, listing_id: 1, bid_id: 1, message: "Sample Message 1", notification_type: "ok", is_read:true},
    {user_id: 1, listing_id: 1, bid_id: 1, message: "Sample Message 2", notification_type: "bad"},
    {user_id: 1, listing_id: 1, bid_id: 1, message: "Sample Message 3", notification_type: "ok"},
]

export class Notifications extends React.Component{
    constructor(props:any){
        super(props)
        this.state={
            isFetching:false,
            has_fetched:false,
            notificationData: [],
            error: null
        }

    }

    componentDidMount(){
        console.log('mounted')
        this.setState({isFetching:true})
        this.props.getNotifications()
        
    }

    componentDidUpdate(prevProps){
        console.log("placeholder")
        if(prevProps!=this.props){
          console.log(this.props)
          this.setState({isFetching:false})

          let {GetNotificationsData} = this.props.auth

          if(GetNotificationsData.data && GetNotificationsData.data.length>0){
            this.setState({notificationData: GetNotificationsData.data})
          }
        }

        // Update notificationData
    }

    processNotification(entry){
        Toast.show({text1:'Notification Redirection currently not implemented yet.', text2:'Next update.'})
        // Call read noti
        // Switch Statement based on notification type
        // Navigate or mark as read.
    }

    renderNotificationCard(data, index){
        let returnString = ""
        let returnObject = {
            
            uri:  require('../../assets/avatar.png')
            // 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        }

        console.log("ASD")
        console.log(data)

        switch (data.notification_type){
            case "": returnString = "State 1"
                returnString= "I'm an unread notif"
                break;
            case "ok": 
                // returnObject = <Icon name="check-circle" size="lg" />;
                returnString= "I'm a read notif"
                break
            // case "bad": returnObject = <Icon name="close-circle" size="lg" />;
            default: returnString = data.message
                break
        }

        return (
            <Card
            key={index}
            style={[
              HomeStyles.entryNotification,
              {
                backgroundColor: data.is_read ? '#FFF' : '#75d2fa',
                borderColor: data.is_read ? '#FFF' : '#75d2fa',
              },
            ]}>
            <TouchableOpacity onPress={() => this.processNotification(data)}>
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
            </TouchableOpacity>
            <Text style={{alignSelf: 'flex-end', marginRight: 10}}>
              {moment(data.created_at).fromNow()}
            </Text>
          </Card>
        )
    }

    render(){

        return (  <>
            <WingBlank>
              <RefreshControl
                refreshing={this.state.isFetching}
                onRefresh={() => {
                  this.setState({is_fetching: true});
                  this.props.getNotifications();
                }}
                style={HomeStyles.ScrollViewLimit}>
                <ScrollView style={[HomeStyles.ScrollViewLimit, {height:'100%'}]}>
                  <Text
                    // onPress={() => this.props.readAll()}
                    style={{
                      alignSelf: 'flex-end',
                      marginVertical: 5,
                      color: '#06F',
                    }}>
                    Mark everything as read
                  </Text>
                  <View>
                    {this.state.notificationData.map((entry:Object, index:number) =>
                      this.renderNotificationCard(entry, index),
                    )}
                    {this.state.notificationData.length == 0 && (
                      <View style={{alignSelf: 'center', alignContent: 'center'}}>
                        <Text
                          style={{
                            fontSize: 30,
                            marginTop: '70%',
                            fontWeight: 'bold',
                          }}>
                          No Notifications yet...
                        </Text>
                      </View>
                    )}
                  </View>
                </ScrollView>
              </RefreshControl>
            </WingBlank>
          </>)
    }
}


const mapStateToProps = (state) => ({
  // user: state.user,
  auth: state.auth,
});

const mapActionCreators = {
  getNotifications
};

// export default 

export default connect(mapStateToProps, mapActionCreators)(Notifications);
