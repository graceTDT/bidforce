import { Card, Icon, WingBlank } from "@ant-design/react-native"
import React from "react"
import {Avatar} from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler"
import { HomeStyles } from "../HomeStyles"
import {View, Text, RefreshControl, ScrollView} from 'react-native'
import moment from 'moment'
import ItemCard from "./ItemCard";
import { getListings } from "../../../stores/modules/listing";

export default class ItemList extends React.Component{
    itemList:Array<Object>
    constructor(props:any){
        super(props)
        this.itemList = props.itemList;
        this.state={
            isFetching:false,
            has_fetched:false,
            itemList: [],
            error: null
        }
        // this.navigation = props.navigation

    }

    componentDidMount(){
        console.log('mounted-itemlist')
        this.setState({itemList: this.itemList})
    }

    componentDidUpdate(prevProps){
        console.log("placeholder")
        console.log("ITEMLIST - - NEW PROPS")

        console.log(this.props)
        if(this.props.itemList!=prevProps.itemList){
          this.setState({itemList:this.props.itemList})
        }
    }

    viewItem(entry){
      console.log('viewitem?')
      console.log(entry)
        this.navigation.navigate("viewListing", {data:entry})
    }

    render(){

        return (  <>
        {/* {this.state.itemList && <Text>Has items {this.state.itemList.length}</Text>} */}
        <View style={[HomeStyles.flexibleGrid, {height:'100%'}]}>
            {!this.state.itemList || this.state.itemList.length==0 && (
              <Text style={{
                alignSelf:'center',
                alignContent:'center',
                textAlign:'center',
                textAlignVertical:'center'
              }}>No Items</Text>
            )}
            {this.state.itemList && this.state.itemList.map((element, index) => {
                return <ItemCard {...this.props} key={index} style={{marginLeft:5, marginRight:5, marginBottom:5}} data={element} viewItemCallback={this.viewItem}  />
            })}
            </View>
          </>)
    }
}