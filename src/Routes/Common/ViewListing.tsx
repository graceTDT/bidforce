import { ActivityIndicator, Button, Card, Carousel, Flex, Grid, Icon, InputItem, Modal, Progress, WhiteSpace, WingBlank } from '@ant-design/react-native'
import React from 'react'
import { StretchyScrollView } from 'react-native-stretchy';
import {View, Text, StyleSheet, ScrollView, Image, ImageBackground, RefreshControl} from 'react-native'
// import LinearGradient from 'react-native-linear-gradient';
import ParallaxScrollView from '../../assets/utils/parallax-scroll-view/ParallaxScrollView'
import { ImageGallery, ImageObject } from '@georstat/react-native-image-gallery';
import { TouchableOpacity } from 'react-native';
import { getListing } from '../../stores/modules/listing';
import { connect } from 'react-redux';
import { getBids } from '../../stores/modules/admin';
import { HomeStyles } from './HomeStyles';
import { bid,statecleanup_bid } from '../../stores/modules/listing';
// import {API_URL} from '@env';
const API_URL = 'http://165.22.48.133:3333';
import { actionListing } from '../../stores/modules/admin';

var selectedInd = 0;

const GRADIENT_COLORS = [	
    'rgba(0, 0, 0, 0.9)',	
    'rgba(0, 0, 0, 0.5)',	
    'rgba(0, 0, 0, 0.9)',	
  ];

  const sampleItem = {
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
    lastBid: 1000,
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
  }

  const images = [
    {
      id: 1,
      url: "https://images.pexels.com/photos/2347011/pexels-photo-2347011.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/2387877/pexels-photo-2387877.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/1624360/pexels-photo-1624360.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    },
  ]
export class ViewListing extends React.Component {
    carousel: null | Carousel
    constructor(props:any){
        super(props)
        this.state = {
            selectedIndex: 0,
            loaded:false,
            refreshing: false,
            data: {},
            bidDialogue:false,
            bidValue: 0,
            lastBidValue: 0,
            isBidding:false,
            viewGallery:false,
            images:[],
            fetchingBids:false,
            bidData:null,
        }
    }
            

    componentDidMount(){
        this.setState({data: sampleItem, images:images})
        console.log('navigation props')
        console.log(this.props.navigation)
        if(this.props.route.params && this.props.route.params.data){
          this.props.getListing(this.props.route.params.data.id)

          if(this.props.auth && this.props.auth.loginData && this.props.auth.loginData.user_type == "ADMIN"){
            this.setState({fetchingBids:true})
            this.props.getBids(this.props.route.params.data.id)
          }
        }
    }

    componentDidUpdate(prevProps){
      if(this.props!=prevProps){
        let {listing, admin} = this.props

        if(listing.bidError){
          this.setState({isBidding:false, bidValue:0,})
          Modal.alert("Error", listing.bidError, [{text:"OK"}])
          this.props.statecleanup_bid()
        }

        if(listing.getItemSuccess && listing.getItemData){
          this.setState( state=> {
            let {data} = state
            let images = listing.getItemData.attachments
            let images2 = []
            if(images && images.length > 0){ images.map(entry => {
              entry.url = `${API_URL}/${entry.uri_path}`
              images2.push(entry)
            })}
            
            data.attachments = undefined;
            state.data = listing.getItemData
            state.images = images2
            state.loaded = true
            state.refreshing = false;
            
            return state
          })
        }
        if(admin.getBidsData){
          console.log(admin.getBidsData)
          this.setState({bidData: admin.getBidsData, fetchingBids:false})
        }
        if(admin.timeProp!=prevProps.admin.timeProp && admin.actionListingSuccess){
          this.props.getListing(this.props.route.params.data.id)
        }
        if(listing.bidSuccess && listing.bidData && listing.bidData.value == this.state.bidValue){
          this.setState({isBidding:false, bidValue:0,})
          Modal.alert("Success", "Bid Success.")
        }
      }
    }

    componentWillUnmount(){
      this.props.statecleanup_bid()
    }

    afterchangeCallback(index){
        selectedInd = index;
    }

    renderItemdata(data){
        return (
            <></>
        )
    }

    actionListingLocal(action){
      let data = {
        id: this.state.data.id,
        action: action
      }

      this.props.actionListing(data)
    }

    bid(){
      console.log("Bid")
      console.log(this.state.bidValue)

      this.setState({isBidding:true, bidDialogue:false})

      let request = {
        bid_value: this.state.bidValue,
        listing_id:this.state.data.id
      }

      this.props.bid(request)
    }

    renderFooterComponent = (image: ImageObject, currentIndex: number) => {
      console.log(image)
      console.log(currentIndex)
      return <>
        <Text>Footer</Text>
      </>
    }


    render() {
      var isWholesaler = (this.props.auth && this.props.auth.loginData && this.props.auth.loginData.user_type == "WHOLESALER")
      var isAdmin = (this.props.auth && this.props.auth.loginData && this.props.auth.loginData.user_type == "ADMIN")
      var isUser = (this.props.auth && this.props.auth.loginData && this.props.auth.loginData.user_type == "USER")
      var listingStatus;

      if(this.state.data.hidden){
        listingStatus = "Hidden";
      }
      if(!this.state.data.hidden){
        listingStatus = "Active";
      }
      if(this.state.data.has_ended){
        listingStatus = "Ended";
      }

        return (
        
          <RefreshControl
            refreshing = {this.state.refreshing}
            onRefresh={()=>{
              this.setState({refreshing:true})
              this.props.getListing(this.props.route.params.data.id)
            }}
          >
            <ScrollView>
                  <Carousel
        style={styles.wrapper}
        selectedIndex={this.state.selectedIndex}
        
        autoplay
        infinite
        afterChange={this.afterchangeCallback}
        ref={(ref) => (this.carousel = ref)}>
        {this.state.images.map(entry=>{
          console.log(entry)
          return (<TouchableOpacity style={{height:'100%'}} onPress={()=>{
            console.log('click')
            this.setState({viewGallery:true})}}><ImageBackground source={{uri:entry.url}}><View style={{height:'100%'}}>
            </View></ImageBackground></TouchableOpacity>)
        })}
      </Carousel>
          <WingBlank>

      {!this.state.loaded && (
        <View style={{height:'100%', marginTop:100,alignContent:'center'}}><ActivityIndicator/><Text style={{textAlign:'center'}}>Loading...</Text></View>
      )}

      {this.state.loaded && (
          <>
          <WhiteSpace size={'lg'}/>
          <Text style={HomeStyles.listingTitle}>{this.state.data.name}</Text>
          <Text style={HomeStyles.listingManuf}>{this.state.data.make_of_vehicle}<Text style={HomeStyles.listingYear}> {this.state.data.model} ({this.state.data.year_of_vehicle})</Text> </Text>
          <Text>{this.state.data.hidden && "This listing is currently hidden."}</Text>
          <Text>{this.state.data.has_ended && "This listing has ended."}</Text>
        <WhiteSpace size={'lg'}/>
         <Flex>
           <Flex.Item><View><Button  disabled={ this.props.auth.loginData && this.props.auth.loginData.id == this.state.data.user_id} type='primary' onPress={()=> this.setState({bidDialogue:true})}>{this.props.auth.loginData.id == this.state.data.user_id ? "You can't bid here" : "Bid Now"}</Button></View></Flex.Item>
           <Flex.Item><View><Button type='ghost' onPress={()=> this.props.navigation.navigate('vinscan', {data: this.state.data})}>Query VIN</Button></View></Flex.Item>
         </Flex>
          <WhiteSpace size='lg'/>
          {!isWholesaler && (
            <>
          <Text>Address:</Text>
          <Text>{this.state.data.address}</Text>
          <WhiteSpace size='lg'/>
            </>
          )}
          
          <Text>Description:</Text>
          <Text>{this.state.data.description}</Text>
          <WhiteSpace size='lg'/>

          <Text>Milage:</Text>
          <Text>{this.state.data.mileage}</Text>
          <WhiteSpace size='lg'/>

          <Text>Trim:</Text>
          <Text>{this.state.data.trim}</Text>
          <WhiteSpace size='lg'/>

          <Text>Disclaimers:</Text>
          <Text>{this.state.data.disclaimers}</Text>
          <WhiteSpace size='lg'/>
          {/* <Text>{this.state.data.name}</Text> */}

          <WhiteSpace size='lg'/>
          <View><Button>Add Notes</Button></View>
          </>
      )}

      {isAdmin && (
        <>
        <WhiteSpace size='lg'/>
          <Card>
            <Card.Header title="Admin Corner"></Card.Header>
            <Card.Body>
              {this.state.fetchingBids && (
                <View><Text style={{alignSelf:'center'}}><ActivityIndicator/>  Fetching Bids...</Text></View>
              )}
              {this.state.bidData &&  !this.state.fetchingBids && (
                <View style={{marginLeft:10}}>
                <Text>Listing Status: {listingStatus}</Text>
                <Text>Total Bids: {this.state.bidData.length}</Text>
                <Text>Current Bid Amount: {this.state.bidData.length > 0 ? '$' + this.state.bidData[0].value : "None"}</Text>
                </View>
              )}
            </Card.Body>
            <Button onPress={()=>this.props.navigation.navigate("myBids",{listing_id:this.state.data.id})}>View Bids</Button>
            {this.state.data.has_ended ? (<Button onPress={()=>this.actionListingLocal("OPEN")}>Open Listing</Button>) 
              : (<Button onPress={()=>this.actionListingLocal("CLOSE")}>Close Listing</Button>)}
            {!this.state.data.hidden ? (<Button onPress={()=>this.actionListingLocal("HIDE")}>Hide Listing</Button>) : (<Button onPress={()=>this.actionListingLocal("SHOW")}>Show Listing</Button>)}
            

            
            
          </Card>

        </>
      )}

        <Modal footer={[
          {text:"Cancel", onPress:()=> this.setState({bidDialogue:false})},
          {text:"Bid!", onPress:()=> this.bid()}
      ]} visible={this.state.bidDialogue} popup transparent >
          <View>
            <Text>How much do you bid?</Text>
            <Text>Minimum: ${this.state.data.lastBid}</Text>
            <InputItem type='number' onChangeText={(val)=>this.setState({bidValue:val})} />
          </View>
        </Modal>

      <Modal transparent popup visible={this.state.isBidding}>
        <Text><ActivityIndicator/>    Bidding...</Text>
      </Modal>
      <ImageGallery 
        initialIndex={selectedInd} 
        close={()=>{this.setState({viewGallery:false})}} 
        isOpen={this.state.viewGallery} 
        images={this.state.images}
        renderFooterComponent={this.renderFooterComponent}
        />
      </WingBlank>
      
      <WhiteSpace size="lg"/>
      <WhiteSpace size="lg"/>
      <WhiteSpace size="lg"/>
      <WhiteSpace size="lg"/>
      </ScrollView>
      </RefreshControl>
      )
    }
}

const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: '#fff',
      width: '100%',
      height: 300,
    },
    container:{
        flex:1
    },
    containerHorizontal: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 150,
    },
    containerVertical: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 150,
    },
    text: {
      color: '#fff',
      fontSize: 36,
    },
    foregroundContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
      },
      subtitle: {
        color: '#FFF',
        fontSize: 12,
      },
  })


const mapStateToProps = (state:any) => ({
  // user: state.user,
  listing: state.listing,
  auth: state.auth,
  admin: state.admin,
});

const mapActionCreators = {
  getListing,
  getBids,
  bid,
  statecleanup_bid,
  actionListing
};

// export default 

export default connect(mapStateToProps, mapActionCreators)(ViewListing);
