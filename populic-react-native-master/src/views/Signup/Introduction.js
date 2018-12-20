import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Animated,
  View
} from 'react-native';

//import AppIntro from 'react-native-app-intro';
import { NavigationActions } from 'react-navigation';

export const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },

  headImage: {
    flex: 1,
    height: height,
    width: width
  },

  nextButton: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: '#2293E3',
    width: 250,
    height: 50,
    borderRadius: 30,
    paddingTop: 10
  },

  btnText: {
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Avenir',
    fontWeight: 'bold'
  }
});

let index = 0;

const slides = [
  {
    id: 1,
    imgUrl: require('../../images/slide_1.png'),
    buttonText: 'Next'
  },
  {
    id: 2,
    imgUrl: require('../../images/slide_2.png'),
    buttonText: 'Next'
  },
  {
    id: 3,
    imgUrl: require('../../images/slide_3.png'),
    buttonText: 'Next'
  },
  {
    id: 4,
    imgUrl: require('../../images/slide_4.png'),
    buttonText: 'Finish'
  }
];

export default class Intoduction extends Component {
  constructor(props) {
    super(props);
  }

  nextButtonHandle = index => {
    alert(index);
  };

  scrollTo = () => {
    index++;
    if (index == 4) {
      console.log('The last slide.');
      const backAction = NavigationActions.back(null);
      this.props.navigation.dispatch(backAction);
    } else {
      let x = index * width;
      this.scrollView._component.scrollTo({
        x: x,
        animated: true
      });
    }
  };

  render() {
    return (
      <View style={styles.slide}>
        <Animated.ScrollView
          horizontal
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          pagingEnabled
          scrollEventThrottle={1}
        >
          {slides.map((item, index) => (
            <View
              key={item.id}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                style={styles.headImage}
                resizeMode="contain"
                source={item.imgUrl}
              />
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={() => this.scrollTo()}
                >
                  <Text style={styles.btnText}>{item.buttonText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}
