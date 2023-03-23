import {
  ActivityIndicator,
  Button,
  Carousel,
  Flex,
  Icon,
  InputItem,
  Modal,
  Progress,
  Steps,
  WhiteSpace,
  WingBlank,
  Card,
  List
} from "@ant-design/react-native";
import React, { Ref } from "react";
import { StretchyScrollView } from "react-native-stretchy";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker"; // not react-image-picker
import { ImageGallery } from "@georstat/react-native-image-gallery";
import CardBody from "@ant-design/react-native/lib/card/CardBody";
import TextAreaItem from "@ant-design/react-native/lib/textarea-item";
import { postListing, statecleanup_listing } from "../../stores/modules/listing";
import { connect } from "react-redux";

var permission;
var cameraInstance;

const steps = [
  { title: 'Front Side', name: "images_front", type: "images", },
  { title: 'Driver Side', name: "images_driver", type: "images" },
  { title: 'Passenger Side', name: "images_passenger", type: "images" },
  { title: 'Back Side', name: "images_back", type: "images" },
  { title: 'Vehicle Interior', name: "images_interior", type: "images" },
  { title: 'Miscellaneous', name: "images_misc", type: "images" },
  { title: 'Vehicle Information', name: "vehicle_information", type: "information" },
  { title: 'Summary', name: "summary", type: "summary" },
];

const mediaProperties:ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  quality: .4,
  base64:true,
  allowsMultipleSelection:true,
}
export class CreateListing extends React.Component {
  camera: Ref<Camera>;

  constructor(props: any) {
    super(props);
    this.state = {
      mode: CameraType.back,
      permissionError: null,
      cameraState: null,
      // step: -1,
      step: -1,
      images_front: [],
      images_driver: [],
      images_passenger: [],
      images_back: [],
      images_interior: [],
      images_misc: [],
      viewGallery: false,

      isSubmittingData:false,

      make_of_vehicle:'test',
      name:'testname',
      year_of_vehicle:'2001',
      trim:'wtf',
      milage:'1000km',
      vin_number:'1122aabbccdd',
      disclaimers:'no theraputic claims',

    };
    this.camera = React.createRef();
  }

  componentDidMount() {
    this.setState({ loaded: true });
    permission = Camera.requestCameraPermissionsAsync();
    // permission = Camera.useCameraPermissions();
    if (!permission) {
      this.setState({ permissionError: "NO PERMIT" });
    }
    // this.setState({cameraState: })
  }

  navigateToDashboard(){
    this.props.statecleanup_listing()
    this.props.navigation.navigate('dashboard')
  }

  componentDidUpdate(prevProps) {
    if(prevProps!=this.props){
      let {listing} = this.props

      if(listing.postListingSuccess){
        this.setState({isSubmittingData:false})
        Modal.alert("Post Success!", 
        "Your Listing has been successfully uploaded and have yet to be reviewed by the admins. Check your notifications for updates.", 
        [{text:"OK", onPress:()=> this.navigateToDashboard() }], ()=> this.navigateToDashboard)
      }
    }
  }

  capture() {
    console.log(this.camera);
    console.log(cameraInstance);
    var vv = <Camera></Camera>;
    console.log(vv);
    // let v = this.camera.takePictureAsync()
    // console.log(v)
  }

  afterchangeCallback(index) {
    console.log(index);
    // this.setState({ selectedIndex: index })
  }

  toggleCameraType() {
    let curr = this.state.mode;
    this.setState({
      mode: curr == CameraType.back ? CameraType.front : CameraType.back,
    });
  }

  cameraCallBack(data) {
    console.log(data);
  }

  async launchCamera(type?) {
    let result = await ImagePicker.launchCameraAsync(mediaProperties);

    console.log(result);

    if (!result.cancelled) {
      console.log("Not cancelled?");
      // console.log(result);
      // console.log(type);

      if(type!=null){
        if(result.selected){ // If multiple images
          console.log('Group of pictures!')
          this.setState(state => {
            if(state[`${type.name}`].length==0) state[`${type.name}`] = result.selected
            else state[`${type.name}`].push(result.selected)
          })
        }else if(result){ // <- If image is single
          console.log('single image!')
          this.setState(state => {
            if(state[`${type.name}`].length==0) state[`${type.name}`] = [result]
            else state[`${type.name}`].push(result)
          })
        }

        this.setState({step:this.state.step})
      }
      // setImage(result.uri);
    }
  }

  async launchImagePicker(type?) {
    console.log('imagepicker')
    console.log(type)
    let result = await ImagePicker.launchImageLibraryAsync(mediaProperties);

    console.log(result);

    if (!result.cancelled) {
      console.log("Not cancelled?");
      // console.log(result);
      // console.log(type);

      if(type!=null){
        if(result.selected){ // If multiple images
          console.log('Group of pictures!')
          this.setState(state => {
            if( !state[`${type.name}`] || state[`${type.name}`].length==0) state[`${type.name}`] = result.selected
            else state[`${type.name}`].push(result.selected)
          })
        }else if(result.base64){ // <- If image is single
          console.log('single image!')
          this.setState(state => {
            if(state[`${type.name}`].length==0) state[`${type.name}`] = [result]
            else state[`${type.name}`].push(result)
          })
        }

        this.setState({step:this.state.step})
      }
      // setImage(result.uri);
    }
  }

  submitData() {
    let { name, description, make_of_vehicle, model, year_of_vehicle, trim, mileage, vin_number, disclaimers, accidents } = this.state
    var data = {
      name, description, make_of_vehicle, model, year_of_vehicle, trim, mileage, vin_number, disclaimers, accidents,
      images: []
    }

    steps.map(entry =>{
      if(entry.type == 'images'){
        this.state[`${entry.name}`].map(entry2=>{
          data.images.push({type:entry.name, data:entry2})
        })
      }
    })

    // this.setState({isSubmittingData:true})
    this.props.postListing(data)
  }

  setImagesCallback(arrayname: string) {
    // this.setState({[arrayname]:})
  }
  // launchCamera(null, this.cameraCallBack)

  removeImage(index, state){
    console.log(index)
    console.log(state)
    this.setState(mainState=>{
      var k = mainState[`${state}`]
      k.splice(index, 1)
      mainState[`${state}`] = k
      return mainState
    })
  }

  listingEntryTemplate = (props) => {

    return (<Card>
      <Card.Header title="Listing Information"  />
      <CardBody>
        <List>
          <List.Item>
            <InputItem onChangeText={(v) => this.setState({name:v})} value={this.state.name} >Name</InputItem>
            <List.Item>Description</List.Item>
            <TextAreaItem autoHeight onChangeText={(v) => {this.setState({description:v})}} value={this.state.description} ></TextAreaItem>
            <InputItem onChangeText={(v) => this.setState({make_of_vehicle:v})} value={this.state.make_of_vehicle} >Make</InputItem>
            <InputItem onChangeText={(v) => this.setState({model:v})} value={this.state.model} >Model</InputItem>
            <InputItem onChangeText={(v) => this.setState({year_of_vehicle:v})} value={this.state.year_of_vehicle} >Year</InputItem>
            <InputItem onChangeText={(v) => this.setState({trim:v})} value={this.state.trim} >Trim</InputItem>
            <InputItem onChangeText={(v) => this.setState({mileage:v})} value={this.state.mileage} >Mileage</InputItem>
            <InputItem onChangeText={(v) => this.setState({vin_number:v})} value={this.state.vin_number} >VIN Number</InputItem>
            <List.Item>Disclaimers</List.Item>
            <TextAreaItem autoHeight onChangeText={(v) => {this.setState({disclaimers:v})}} value={this.state.disclaimers} ></TextAreaItem>
            <List.Item>Accidents</List.Item>
            <TextAreaItem autoHeight onChangeText={(v) => {this.setState({accidents:v})}} value={this.state.accidents} ></TextAreaItem>
          </List.Item>
        </List>
      </CardBody>
    </Card>)
  }

  cardViewTemplate = (props) => {
    let { setData, images, state } = props;
    console.log('carviewPropUpdate')
    console.log(props)
    if (images && images.length > 0) {
      return (
        <WingBlank>
          <Carousel style={{ height: 200 }}>
            {images.map((entry, index) => (
              <View style={{ height: "100%" }}>
                <ImageBackground
                  style={{ height: 200 }}
                  source={{
                    uri: entry.uri
                  }}
                >
                  <Icon name="delete" onPress={()=>this.removeImage(index,state)}></Icon>
                </ImageBackground>
              </View>
            ))}
          </Carousel>
        </WingBlank>
      );
    } else {
      return (
        <WingBlank>
          <View style={{ height: 200 }}>
            <Text
              style={{
                height: 200,
                width: "100%",
                alignContent: "stretch",
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              Add an image to get started
            </Text>
          </View>
        </WingBlank>
      );
    }
  };

  render() {
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
    ];
    const loader = (
      <>
        <ActivityIndicator />
        <Text>Loading...</Text>
      </>
    );
    return (
      <>
        <ScrollView>
          {/* <Modal transparent={false}  visible={this.state.viewGallery} onClose={()=>this.setState({viewGallery:false})}> */}
          {/* <View> */}
          <ImageGallery
            close={() => this.setState({ viewGallery: false })}
            isOpen={this.state.viewGallery}
            images={images}
          />
          <WingBlank>
            <WhiteSpace size="lg" />
            <Button onPress={()=>console.log(this.state)}>Debug Log</Button>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              In order to validate your entry, we require you to at least submit
              the required information of each category.{" "}
            </Text>
            <WhiteSpace size="lg" />

            <ScrollView horizontal>
              <Steps
                size="small"
                direction="horizontal"
                current={this.state.step}
              >
                <Steps.Step title={"Front Side"} />
                <Steps.Step title={"Driver Side"} />
                <Steps.Step title={"Passenger Side"} />
                <Steps.Step title={"Back Side"} />
                <Steps.Step title={"Vehicle Interior"} />
                <Steps.Step title={"Miscellaneous"} />
                <Steps.Step title={"Information"} />
                <Steps.Step title={"Summary"} />
              </Steps>
            </ScrollView>

            <Text style={{textAlign:'center',fontWeight:'bold', fontSize:18}} >{steps[this.state.step+1].title}</Text>

            {steps.map((entry, index) => {
              console.log(entry)
              if (entry.type == "images" && index - 1 == this.state.step) {
                return (
                  <this.cardViewTemplate
                    state={entry.name}
                    images={this.state[`${entry.name}`]}
                  ></this.cardViewTemplate>
                );
              }else if( index-1 == this.state.step && entry.type === "information"){
                console.log('what')
                return (<this.listingEntryTemplate/>)
              }
            })}

            <WhiteSpace size="lg"/>
            <WhiteSpace size="lg"/>

            { this.state.step+1 < steps.length && steps[this.state.step+1].type=='images' && (
              <Flex>
              <Flex.Item>
                <Button onPress={() => this.launchImagePicker(steps[this.state.step+1])}>
                  Add Image(s)
                </Button>
              </Flex.Item>
              <Flex.Item>
                <Button onPress={() => this.launchCamera(steps[this.state.step+1])}>
                  Take a picture
                </Button>
              </Flex.Item>
            </Flex>
            ) }

            <WhiteSpace size="lg"/>
            <WhiteSpace size="lg"/>

            <View style={{ alignContent: "flex-end" }}>
              <Flex>
                <Flex.Item>
                  <Button
                    type="ghost"
                    disabled={this.state.step == -1}
                    onPress={() => {
                      if (this.state.step - 1 >= -1)
                        this.setState((state) => {
                          state.step = state.step - 1;
                          return state;
                        });
                    }}
                  >
                    Back
                  </Button>
                </Flex.Item>
                <Flex.Item>
                  {this.state.step < 6 && (
                    <Button
                      type="primary"
                      onPress={() => {
                        if (this.state.step < 6)
                          this.setState((state) => {
                            state.step = state.step + 1;
                            return state;
                          });
                      }}
                    >
                      Next
                    </Button>
                  )}
                  {this.state.step >= 6 && (
                    <Button
                      type="primary"
                      onPress={() => {
                        Modal.alert("Ready to Submit", "Ready to submit data?", [
                          { text: "OK", onPress: () => this.submitData() },
                          { text: "Not yet." },
                        ]);
                      }}
                    >
                      Submit
                    </Button>
                  )}
                </Flex.Item>
              </Flex>
            </View>

          </WingBlank>
          {/* <Button onPress={()=>this.capture()} >CaptureTest</Button> */}
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
                        {/* Modal Area */}
                        <Modal visible={this.state.isSubmittingData} closable={false} ><Text><ActivityIndicator/> Submitting Data...</Text></Modal>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  listing: state.listing
})


const mapActionCteators = {
  postListing,
  statecleanup_listing
}

export default connect(mapStateToProps, mapActionCteators)(CreateListing)