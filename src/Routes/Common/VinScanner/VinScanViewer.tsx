import React, {Component} from 'react';
import {
  WhiteSpace,
  WingBlank,
  InputItem,
  Button,
  Checkbox,
  ActivityIndicator,
  Icon,
  List,
  Card,
} from '@ant-design/react-native';
import moment from 'moment';
import {Rating} from 'react-native-elements';
import {View, Text, ScrollView, Image} from 'react-native';
// import {
//   getCustomer,
//   getCompanyEmployee,
//   getWholesaler,
// } from '../../stores/modules/user';
// import {connect} from 'react-redux';
// import imageLogo from '../../logo.png';
import {Avatar} from 'react-native-elements';
// import {API_HOST} from '@env';
import {RefreshControl} from 'react-native';
import { HomeStyles } from '../HomeStyles';
import ItemList from './ItemList/ItemList';
const dateFormat = 'MM/DD/YYYY';

const userDataDummy = {
    email: '1234@abc.co',
    user_id: 1,
    firstname: 'Mike',
    middlename: 'Burn',
    lastname: 'Fire',
    phone_number: '09123456789',
    address: 'Blk 1234, Dummy St. SA LA, CountryName',
    companyaddress: '1st Door, Floor 3, Dummy Bldg, Blk 5678 ave. CountryName'
}

export default class VinScanViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
      mode: 'default'
    };
  }

  componentDidMount() {
    console.log('VINSCAN');
  }

  processMode() {
    if (this.props.route.params && this.props.route.params.id) {
      this.setState({isLoading: true});
      if (this.props.route.params.type == 'customer') {
        // this.props.getCustomer(this.props.route.params.id);
        // this.setState({mode: 'customer'});
      }
      if (this.props.route.params.type == 'wholesaler') {
        // this.setState({mode: 'freelanceemployer'});
        // this.props.getWholesaler(this.props.route.params.id);
      }
    }
  }

  componentDidUpdate(prevProps) {
    let {user} = this.props;
  }

  render() {
    // let { first_name, middle_name, last_name } = this.state
    return (
      <RefreshControl
        refreshing={this.state.isLoading}
        onRefresh={() => {
          this.setState({isLoading: true});
          // this.props.getCustomer(this.props.route.params.id);
          this.processMode();
        }}>
        <ScrollView style={HomeStyles.viewProfileLimit}>
          <WhiteSpace size="lg" />
          <WingBlank>
           <Text>Vin Scan Query Screen. Inoperable / Under Development.</Text>
           {this.state.isLoading && (<ActivityIndicator></ActivityIndicator>)}
          </WingBlank>
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
        </ScrollView>
      </RefreshControl>
    );
  }
}

// const mapStateToProps = (state) => ({
//   user: state.user,
//   auth: state.auth,
// });

// const mapActionCreators = {
// //   getCustomer,
// //   getCompanyEmployee,
// //   getWholesaler,
// };

// export default 

// export default ViewProfile;
