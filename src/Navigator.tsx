import * as React from 'react'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Routes/Login/Login'
import Menu from './Routes/Common/Menu'
import Register from './Routes/Register';
import Dashboard from './Routes/Common/Dashboard';
import Notifications from './Routes/Common/Notifications';
import Profile from './Routes/Common/Profile';
import ViewListing from './Routes/Common/ViewListing'
import { Icon, TabBar } from '@ant-design/react-native';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import AddListing from './Routes/Wholesaler/AddListing'
import CameraActivity from './Routes/Wholesaler/CameraActivity'
import Users from './Routes/Admin/Users';
import VinScan from './Routes/Common/VinScanner/VinScanViewer';
import MyBids from './Routes/Customer/MyBids'
import MyNotes from './Routes/Common/MyNotes';
import MainSettings from './Routes/Common/Settings/MainSettings';
import ListingManagement from './Routes/Admin/ListingManagement';
const test = false;

const Stack = createNativeStackNavigator();

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

const mapActionCreators = {};

export class Navigator extends React.Component {
  NavigationContainerRef: Object

  constructor(props: any) {
    super(props)
    this.NavigationContainerRef = React.createRef()
    this.state = {
      currentRoute: null,
    }
  }

  updateNavigation() {
    // console.log("Navigational Props")
    // console.log(this.props)
    this.setState({
      currentRoute: this.NavigationContainerRef.current.getCurrentRoute().name,
    });
  }

  componentDidMount() {
    // console.log("NAVIGATOR PROPS")
    // console.log(this.props)
  }

  render(): React.ReactNode {

    const barCustomer = (
      <TabBar barTintColor='#000'>
        <TabBar.Item
          title="Home"
          icon={<Icon name="home" />}
          selected={
            this.NavigationContainerRef.current &&
            this.NavigationContainerRef.current.getCurrentRoute().name ==
            'dashboard'
          }
          onPress={() => {
            this.NavigationContainerRef.current.navigate('dashboard');
            this.updateNavigation();
          }}
        />
        <TabBar.Item
          title="My Bids"
          icon={<Icon name="ordered-list" />}
          selected={
            this.NavigationContainerRef.current &&
            this.NavigationContainerRef.current.getCurrentRoute().name ==
            'myBids'
          }
          onPress={() => {
            this.NavigationContainerRef.current.navigate('myBids');
            this.updateNavigation();
          }}
        />
        <TabBar.Item
          title="Add!"
          iconStyle={{ marginBottom: 3 }}
          icon={<Icon name="plus-square" size="lg" style={{ alignSelf: 'center', }} />}
          selected={this.state.currentRoute == 'addlisting'}
          onPress={() => {
            this.NavigationContainerRef.current.navigate('addlisting');
            this.updateNavigation();
          }}
        />
        <TabBar.Item
          title="My Notes"
          icon={<Icon name="book" />}
          selected={
            this.NavigationContainerRef.current &&
            this.NavigationContainerRef.current.getCurrentRoute().name ==
            'mynotes'
          }
          onPress={() => {
            this.NavigationContainerRef.current.navigate('mynotes');
            this.updateNavigation();
          }}
        />
        <TabBar.Item
          title="Menu"
          iconStyle={{ marginBottom: 3 }}
          icon={<Icon name="profile" />}
          selected={this.state.currentRoute == 'menu'}
          onPress={() => {
            this.NavigationContainerRef.current.navigate('menu');
            this.updateNavigation();
          }}
        />
      </TabBar>
    );

    const { auth } = this.props

    return (<>
      <NavigationContainer ref={this.NavigationContainerRef}>
        <Stack.Navigator 
          initialRouteName="login"
          screenOptions={{
            headerStyle: {
              // borderBottomEndRadius: 15,
              // borderBottomLeftRadius: 15,
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              alignSelf: 'center',
              marginLeft: -40,
              alignContent: 'center',
              color: '#000',
              fontSize: 20,
              // textShadowColor: '#000',
              // textShadowRadius: 2,
            },
            headerTintColor: '#BBB',
          }}>
          {auth && auth.loginData && (
            <>
              <Stack.Screen
                name="dashboard"
                component={Dashboard}
                options={{ title: 'Dashboard', headerShown: false }}
              />
              <Stack.Screen
                name="notifications"
                component={Notifications}
                options={{ title: 'Notifications', headerShown: true, headerStyle: { backgroundColor: '#000' }, headerTitleStyle: { color: '#ddd' }}}
              />
              <Stack.Screen
                name="menu"
                component={Menu}
                options={{ title: 'Menu', headerShown: true, headerStyle: { backgroundColor: '#000' }, headerTitleStyle: { color: '#ddd' }}}
              />
              <Stack.Screen
                name="settings"
                component={MainSettings}
                options={{ title: 'Settings', headerShown: true, headerStyle: { backgroundColor: '#000' }, headerTitleStyle: { color: '#ddd' }}}
              />
              <Stack.Screen
                name="profile"
                component={Profile}
                options={{ title: 'View Profile', headerShown: true, headerStyle: { backgroundColor: '#000' }, headerTitleStyle: { color: '#ddd' }}}
              />
              <Stack.Screen
                name="viewListing"
                component={ViewListing}
                options={{ title: 'View Listing', headerShown: true, headerStyle: { backgroundColor: '#000' }, headerTitleStyle: { color: '#ddd' }}}
              />
              <Stack.Screen
              name="myBids"
              component={MyBids}
              options={{title:'Bids', headerShown:true, headerStyle: {backgroundColor: '#000'}, headerTitleStyle: {color: '#ddd'}}}
              />
              {/* Different sets of navs for wholesaler and customer. */}
              <Stack.Screen
              name="addCamera"
              component={CameraActivity}
              options={{title:'Take Pictures', headerShown:true, headerStyle: {backgroundColor: '#000'}, headerTitleStyle: {color: '#ddd'}}}
              />
              <Stack.Screen
              name="addlisting"
              component={AddListing}
              options={{title:'Create new Listing', headerShown:true, headerStyle: {backgroundColor: '#000'}, headerTitleStyle: {color: '#ddd'}}}
              />
              <Stack.Screen
              name="vinscan"
              component={VinScan}
              options={{title:'VIN Query', headerShown:true, headerStyle: {backgroundColor: '#000'}, headerTitleStyle: {color: '#ddd'}}}
              />
              <Stack.Screen
              name="mynotes"
              component={MyNotes}
              options={{title:'My Notes', headerShown:true, headerStyle: {backgroundColor: '#000'}, headerTitleStyle: {color: '#ddd'}}}
              />
              </>
              
          )}
          {auth && !auth.loginData && (
            <>
            <Stack.Screen
            name="login"
            component={Login}
            options={{ title: 'Login Screen', headerShown: false }}
          />
          </>
          )}
          <Stack.Screen
            name="usermanagement"
            component={Users}
            options={{ title: 'user management', headerShown: true }}
          />
                    <Stack.Screen
            name="listingmanagement"
            component={ListingManagement}
            options={{ title: 'Listing management', headerShown: true }}
          />
                    <Stack.Screen
            name="createUser"
            component={Register}
            options={{ title: 'Registration', headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {((this.props.auth && this.props.auth.accessToken) || (test)) && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            bottom: 1,
            zIndex: 2,
            height: 49,
            borderWidth: 3,
            borderTopColor: '#f7601b',
          }}>
          <>{barCustomer}</>
        </View>
      )}
    </>)
  }
}

export default connect(mapStateToProps, mapActionCreators)(Navigator);