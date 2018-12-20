/*
*   This is the main page for a user to login if they are already registered
*/


import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  AsyncStorage,
  Button,
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
//import NavigationBar from 'react-native-navbar';
import LinearGradient from 'react-native-linear-gradient';
import { Keyboard } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Hash from 'sha256';
import { SERVER } from '../../config/server';
import styles from './styles/LoginStyles';

// For animations
import * as Animatable from 'react-native-animatable'

import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/userAction';


function mapStateToProps(state) {
  return {
    user: state.userReducer,
    spot: state.spotReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}


/*
let user = [
  {
  "name" : "",
  "firstName" : "",
  "lastName" : "",
  "email" : "",
  "imageUrl" : "",
},
];*/
/*
registerUser = () => {
  alert("User registered!");
}

const titleConfig = {
  title: 'Create Account',
  tintColor: 'white',
  style: {
    fontFamily: "Verdana",
  },
};
*/
class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nick: '',
      password: ''
    };
  }

  loginUser = () => {
    axios
      .post(SERVER + '/api/auth/authUser', {
        username: this.state.nick,
        password: this.state.password
      })
      .then(response => {
        //console.log(response.data.data.token);
        //AsyncStorage.setItem('user', response.data);
        if (response.data.status.status === 'success') {
          //alert("Correct!");
          //console.log("ID: ", response.data.data.user.id);
          //console.log(response.data);

          /*let user = {
            id: response.data.data.user.id,
            username: response.data.data.user.username,
            fullname: response.data.data.user.fullname,
          };*/

          let data = {
            token: response.data.data.token,
            user: {
              id: response.data.data.user.id,
              username: response.data.data.user.username,
              fullname: response.data.data.user.fullname
            }
          };

          console.log('Data array: ', data);

          this.props.userLogin(data);
          //this.props.setState({ token: response.data.data.token });
          //this.props.setState({ user: user });
          //Actions.userLogin(data);
          //Actions.userProfile(response.data.data.user.id);
          //Actions.setCurrentUser(user);
          //console.log(this.props.user);

          //console.log("This is state: ", this.state);

          AsyncStorage.setItem('userToken', response.data.data.token);

          const { navigate } = this.props.navigation;
          navigate('Main');
        } else if (response.data.status.status === 'error') {
          alert('Wrong username or password.');
        }
        //AsyncStorage.setItem('user', data);
      })
      .catch(function(error) {
        console.log('Could not log in: ', error);
        Alert.alert(
          'Whoops! 😅 ',
          'The username or password you entered is incorrect. Please enter the correct information to log in.'
        );
      });
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <LinearGradient
        start={{ x: 0.8, y: 0.3 }}
        colors={['#EAC149', '#E23025']}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}
      >

        {/* start centered view */}
        <View style={{flex:1, alignItems: 'center'}}>
          <StatusBar barStyle="light-content" />
          <Image
            style={styles.loginLogo}
            source={require('../../images/logo_highkey_login.png')}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View
              style={{
                flex: 0,
                flexDirection: 'column',
                marginTop: 40,
                alignItems: 'center'
              }}
            >
              <TextInput
                style={styles.textField}
                ref="nick"
                placeholder="USERNAME"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.nick}
                onChangeText={nick => this.setState({ nick })}
                placeholderTextColor="white"
                returnKeyType="next"
                onSubmitEditing={event => {
                  this.refs.password.focus();
                }}/>
              <TextInput
                style={styles.textField}
                ref="password"
                placeholder="PASSWORD"
                placeholderTextColor="white"
                autoCapitalize="none"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                autoCorrect={false}
                password={true}
                secureTextEntry={true}
                blurOnSubmit={true}
                returnKeyType="done"
                onSubmitEditing={this.loginUser}/>
            </View>
          </TouchableWithoutFeedback>

          {/* Login button */}
          { (this.state.nick.length >= 3) && (this.state.password.length >= 3) &&
            <Animatable.View
              animation='bounceIn'>
              <TouchableOpacity
                style={styles.button}
                onPress={this.loginUser}>
                <Text
                  style={styles.buttonText}>
                  LOG IN
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          }

          <View style={styles.middleTextContainer}>
            <Text style={styles.text}>Need an account?{' '}
              <Text
                style={styles.navigateText}
                onPress={() => navigate('SignUp')}
                >Sign up</Text>
              .
            </Text>
          </View>

          <View
            style={styles.bottomTextContainer}>
            <Text style={styles.subtext}>By signing up, you agree to the{' '}
                <Text
                  style={styles.linkText}
                  onPress={() => Linking.openURL('http://www.populic.com/terms-of-use.php')}
                  >Terms</Text>
              {' '}and{' '}
                <Text
                  style={styles.linkText}
                  onPress={() => Linking.openURL('http://www.populic.com/privacy-policy.php')}
                  >Privacy Policy</Text>.
            </Text>
          </View>
        </View>
        {/* end centered view */}
      </LinearGradient>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
