import React, { Component } from 'react';
import { View, Text, Navigator, StatusBar, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import NavigationBar from 'react-native-navbar';
import SettingsList from 'react-native-settings-list';

// resets the Navigation Stack (gets rid of old screens, navigates back to Landing screen)
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Landing'})
  ]
})

export default class App extends Component {
  constructor() {
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = { switchValue: true };
  }

  logoutUser = () => {
    console.log('logoutUser() called.')
    AsyncStorage.removeItem('userToken').then(() => {
      //const { navigate } = this.props.navigation;
      //navigate('Landing');
      this.props.navigation.dispatch(resetAction)
    });
  };

  render() {
    const { goBack } = this.props.navigation;
    const { navigate } = this.props.navigation;

    const doneConfig = {
      title: 'Done',
      tintColor: '#4da6ff',
      handler: () => goBack()
    };
    return (
      <View style={{ backgroundColor: '#262626', flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <NavigationBar
          title={{ title: 'Settings', tintColor: 'white' }}
          rightButton={doneConfig}
          tintColor="#404040"
        />
        <View style={{ backgroundColor: '#262626', flex: 1 }}>
          <SettingsList
            backgroundColor="#404040"
            borderColor="#595959"
            defaultTitleStyle={{ color: 'white' }}
            defaultItemSize={50}
          >
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item
              hasSwitch={true}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              hasNavArrow={false}
              title="Notifications"
            />
            <SettingsList.Item
              hasSwitch={false}
              hasNavArrow={true}
              onPress={() => navigate('AppInfo')}
              title="About"
            />
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item
              hasSwitch={false}
              hasNavArrow={false}
              title="Log out"
              onPress={this.logoutUser}
            />
          </SettingsList>
        </View>
      </View>
    );
  }
  onValueChange(value) {
    this.setState({ switchValue: value });
  }
}
