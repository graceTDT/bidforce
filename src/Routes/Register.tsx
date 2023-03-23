import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button, WhiteSpace, Flex, Icon, WingBlank, List, InputItem, Picker } from '@ant-design/react-native';
import { StatusBar } from 'expo-status-bar';
import Input from '@ant-design/react-native/lib/input-item/Input';
import { ScrollView } from 'react-native-gesture-handler';
import { createUser } from '../stores/modules/admin';
import { connect } from 'react-redux';
export class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email:null,
      password:null,
      passwordconfirm:null,
      user_type:null,
      firstname:null,
      middlename:null,
      lastname:null,
      company_address: null,
      address:null,
      phone_number:null,
      isLoading:false,
    }
  }

  componentDidUpdate(){

  }

  submitUserData(){
    this.setState({isLoading:true})
  }

    render(){
        return (<>
        <ScrollView>
            <WingBlank>
            <WhiteSpace size="lg"/>
            <WhiteSpace size="lg"/>
            <Text>User Credentials</Text>
              <List>
                <List.Item>E-Mail
                  <InputItem onChangeText={(v) => this.setState({email:v})} value={this.state.email} type='email-address'></InputItem>
                </List.Item>
                <List.Item>Password
                  <InputItem onChangeText={(v) => this.setState({password:v})} value={this.state.password} type='password'></InputItem>
                </List.Item>
                <List.Item>Re-type Password
                  <InputItem onChangeText={(v) => this.setState({passwordconfirm:v})} value={this.state.passwordconfirm} type='password'></InputItem>
                </List.Item>
                <List.Item>User Type
                  <Picker 
                    data={[
                      {value:"ADMIN", label:"Admin"},
                      {value:"CUSTOMER", label:"Customer"},
                      {value:"WHOLESALER", label:"Wholesaler"},
                    ]}
                    value={this.state.user_type}
                    cols={1}
                    onChange={(v)=>this.setState({user_type:v})}
                    onOk={(v)=>console.log(v)}
                  >
                    <List.Item>
                      Select User Type
                    </List.Item>
                  </Picker>
                </List.Item>
              </List>
              <WhiteSpace size="lg"/>
              <WhiteSpace size="lg"/>
              <Text>Personal Information</Text>
              <List>
                <List.Item>First Name
                  <InputItem onChangeText={(v) => this.setState({firstname:v})} value={this.state.firstname} type='text'></InputItem>
                </List.Item>
                <List.Item>Middle Name
                <InputItem onChangeText={(v) => this.setState({middlename:v})} value={this.state.middlename} type='text'></InputItem>
                </List.Item>
                <List.Item>Last Name
                <InputItem onChangeText={(v) => this.setState({lastname:v})} value={this.state.lastname} type='text'></InputItem>
                </List.Item>
                <List.Item>Phone Number
                <InputItem onChangeText={(v) => this.setState({phone_number:v})} value={this.state.phone_number} type='text'></InputItem>
                </List.Item>
                <List.Item>Address
                <InputItem onChangeText={(v) => this.setState({address:v})} value={this.state.address} type='text'></InputItem>
                </List.Item>
                <List.Item>Company Address
                <InputItem onChangeText={(v) => this.setState({company_address:v})} value={this.state.company_address} type='text'></InputItem>
                </List.Item>
              </List>

              <WhiteSpace size="lg"/>
              <List>
                <Button type="primary" loading={this.state.isLoading}  onPress={()=> this.submitUserData()}>Create User</Button>
              </List>
            </WingBlank>
            </ScrollView>
          </>)
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      borderRadius:20,
      borderWidth: 3,
      width: 300,
      margin: 10,
      borderColor: '#000',
    },
    styleText:{
      fontSize:75,
      fontWeight:'400',
      marginLeft: 30,
      marginRight: 30
    },
    spacing: {
      margin: 50,
    },
    roundIcons: {
      textAlign:'center',
      textAlignVertical:'center',
      backgroundColor: '#BBB',
      borderColor: '#BBB',
      color:'000',
      height: 50,
      width: 50,
      borderRadius: 90,
      marginLeft: 10,
      marginRight: 10,
    }
  });
  
const mapStateToProps = (state:any) => ({
  admin: state.admin,
  // user: state.user,
  // auth: state.auth,
});

const mapActionCreators = {
  createUser
};

// export default 

export default connect(mapStateToProps, mapActionCreators)(Register);
