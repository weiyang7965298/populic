import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import Video from 'react-native-video';
//import Icon from 'react-native-vector-icons/FontAwesome';
import IconCustom from '../../config/icons';
//import Moment from 'react-moment';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/userAction';
import { IncreaseViews } from '../../modules/IncreaseViews';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import styles from './styles';

export const { height, width } = Dimensions.get('window');

function mapStateToProps(state) {
  return {
    token: state.userReducer.token,
    user: state.userReducer.user,
    spot: state.locationReducer,
    posts: state.postReducer,
    markers: state.locationReducer.locs,
    locContent: state.userReducer.imageVideo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class PostImage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onBuffer = this.onBuffer.bind(this);

    //this.fill = 0;
  }
  componentDidMount() {

  }
  componentWillUnmount() {
    //this.fill = 0;
    //this.refs.circularProgress.performLinearAnimation(100, 5000);
  }

  onLoad(data) {
    this.setState({ duration: data.duration });
  }


  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  render() {
    //() => this.props.report(item.id)
    //console.log("Element item.");
    var end = moment(new Date());
    console.log(this.props.id == this.props.item.id);
    return (
          <View key={this.props.item.id} style={{ flex: 1, alignItems: 'center', zIndex: 100}}>
            <View>
              {this.props.item.type == "video" && this.props.id == this.props.item.id ? (
                <Video
                  source={{ uri: this.props.item.image_video_url }}
                  style={{ flex: 1, width: width, height: height }}
                  ref={(ref: Video) => { this.video = ref }}
                  resizeMode="cover"
                  muted={false}
                  playInBackground={false}
                  playWhenInactive={false}
                  paused={false}
                  rate={1}
                  onEnd={this.props.nextSlide}
                  repeat={false}
                />
              ) : (
                <Image
                  source={{ uri: this.props.item.image_video_url }}
                  resizeMethod={'resize'}
                  style={{ flex: 1, width: width, height: height }}
                />
              )}
            </View>
            <View style={{ position: 'absolute', top: 65, right: 15 }}>
              <Text style={{
              fontFamily: 'Avenir-Medium',
              color: 'white',
              backgroundColor: 'transparent',
              fontSize: 16,
              textAlign: 'right',
              textShadowRadius: 3,
              textShadowOffset: { width: 1, height: 1 },
              textShadowColor: 'black' }}>
              @{this.props.item.username}
              </Text>
            </View>
            <View style={{ position: 'absolute', bottom: 30, left: 15 }}>
            { moment.duration(end.diff(this.props.item.created_at)).asHours() < 20 &&
               <Text style={{
                fontFamily: 'Avenir-Medium',
                color: 'white',
                backgroundColor: 'transparent',
                fontSize: 16,
                textAlign: 'left',
                textShadowRadius: 3,
                textShadowOffset: { width: 1, height: 1 },
                textShadowColor: 'black' }}>
                {moment(this.props.item.created_at).fromNow()}
              </Text>
            }
            </View>
            <View style={{ position: 'absolute', bottom: 15, right: 15 }}>
              <TouchableOpacity onPress={this.props.report} style={{padding: 15}}>
                <IconCustom
                  name="Flag-Icon"
                  size={25}
                  color="#FFFFFF"
                  style={styles.pinButton}
                />
              </TouchableOpacity>
            </View>


            <TouchableOpacity
              style={styles.nextButton}
              onPress={this.props.nextSlide}
            />
            <TouchableOpacity
              style={styles.backButton}
              onPress={this.props.prevSlide}
            />
          </View>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostImage);
