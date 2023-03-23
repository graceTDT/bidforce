import { Card, Icon, WingBlank } from "@ant-design/react-native"
import React from "react"
import {Avatar} from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler"
import { HomeStyles } from "../Common/HomeStyles";
import {View, Text, RefreshControl, ScrollView} from 'react-native'
import moment from 'moment'
import avatarimg from '../../assets/avatar.png'

const testBids = [
    {user_id: 1, listing_id:1, value: 1000, listing: {
        name: "Test Item 2",
        description: "Item test aaa",
        address: "item address",
        make_of_vehicle: "Mitsuboshi",
        year_of_vehicle: "2009",
        model: "L123",
        trim: "AB",
        mileage: "1000",
        disclaimers: "wtf",
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        attachments: [
            {
                filename: "test.jpg",
                path: "public/test",
                type: "listing",
                uploaded_by: 1,
                message_id: null,
                listing_id: 1,
                created_at: new Date(),
                updated_at: new Date()
        },
        ]
    }},
    {user_id: 1, listing_id:1, value: 1000, listing: {
        name: "Test Item 2",
        description: "Item test aaa",
        address: "item address",
        make_of_vehicle: "Mitsuboshi",
        year_of_vehicle: "2009",
        model: "L123",
        trim: "AB",
        mileage: "1000",
        disclaimers: "wtf",
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        attachments: [
            {
                filename: "test.jpg",
                path: "public/test",
                type: "listing",
                uploaded_by: 1,
                message_id: null,
                listing_id: 1,
                created_at: new Date(),
                updated_at: new Date()
        },
        ]
    }},
]

export default class MyNotes extends React.Component{
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
        this.setState({notificationData: testBids})
        // Fetch Notifications
    }

    viewBid(data){
        this.props.navigation.navigate("viewListing")
    }

    renderBidCard(data, index){
        let returnString = ""
        let returnObject = {
            
            uri:  require('../../assets/avatar.png')
            // 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        }

        switch (data.notification_type){
            case "": returnString = "State 1"
            returnString= "I'm an unread notif"
                break;
            case "ok": 
                returnObject = <Icon name="check-circle" size="lg" />;
                returnString= "I'm a read notif"
                break
            case "bad": returnObject = <Icon name="close-circle" size="lg" />;
            default: returnString = data.name
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
            <TouchableOpacity onPress={() => this.viewBid(data)}>
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
            <WingBlank style={{paddingTop: 15}}>
              <RefreshControl
                refreshing={this.state.is_fetching}
                onRefresh={() => {
                  this.setState({is_fetching: true});
                  this.props.getBids();
                }}
                style={HomeStyles.ScrollViewLimit}>
                <ScrollView style={HomeStyles.ScrollViewLimit}>
                  <View>
                    {this.state.notificationData.map((entry:Object, index:number) =>
                      this.renderBidCard(entry, index),
                    )}
                    {this.state.notificationData.length == 0 && (
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
          </>)
    }
}