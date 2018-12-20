import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/userAction';
import { IncreaseViews } from '../../modules/IncreaseViews';
import { SERVER } from '../../config/server';
import { ReportPost } from '../../modules/ReportPost';
import Spinner from 'react-native-spinkit';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { BlurView, VibrancyView } from 'react-native-blur';

//New
import PostImage from '../../components/map/PostImage';

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

var index = 0;

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fill: 0
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log("Image updated.");
    //console.log(nextProps);
    if(this.props.posts.posts == nextProps.Cdata) {
      return true;
    } else {
      return true;
    }
  }
  componentDidMount() {
    // prevent slide timer from going off when no content in the spot
    if(this.props.posts.posts.length > 0) {
      //this.changeSlide();
    } else {
      console.log('changeSlide not triggered, must be no content in spot.')
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getItemLayout = (data, index) => ({
    length: this.props.posts.posts.length,
    offset: width * index,
    index
  });

  changeSlide() {
    this.interval = setInterval(() => {
    this.scrollIndex();
    setTimeout(() => {
      //this.refs.circularProgress.performLinearAnimation(0, 100);

      this.setState({fill: 100});
    }, 4990);
    //this.setState({fill: 0});
    }, 5000);
  }

  scrollIndex = () => {
    //this.refs.circularProgress.performLinearAnimation(100, 5000);
     this.setState({fill: 0});
    index++;
    if (this.props.posts.posts.length == 0) {
      //alert("This spot doesn't have any images yet!");
      index = 0;
    } else if (index >= this.props.posts.posts.length) {
      index = 0;
      IncreaseViews(this.props.posts.posts[index].id, this.props);
      this.feedRef.scrollToIndex({ animated: false, index: 0 });
    } else {
      IncreaseViews(this.props.posts.posts[index].id, this.props);
      this.feedRef.scrollToIndex({ animated: false, index: index });
    }
  };

  scrollBack = () => {
    //IncreaseViews(this.props.posts.posts[index].id, this.props);
    index = index - 1;
    //IncreaseViews(this.props.posts.posts[index].id, this.props);
    //console.log(index);
    if (index == -1) {
      index = this.props.posts.posts.length - 1;
      IncreaseViews(this.props.posts.posts[index].id, this.props);
      this.feedRef.scrollToIndex({
        animated: false,
        index: this.props.posts.posts.length - 1
      });
      clearInterval(this.interval);
      //this.changeSlide();
    } else {
      IncreaseViews(this.props.posts.posts[index].id, this.props);
      this.feedRef.scrollToIndex({ animated: false, index: index });
      clearInterval(this.interval);
      //this.changeSlide();
    }
  };

  reportPost = (id) => {
    //console.log("Report: ", id);
    Alert.alert(
      'Report content',
      'Do you want to report this post?',
      [
        {text: 'Report', onPress: () =>
          ReportPost(id, this.props)
        },
        {text: 'Cancel', onPress: () => console.log("jkdfjklfg")},
      ],
      {cancelable: false}
    )
  }

//Wtf!
  // noSpots = () => {
  //   const { goBack } = this.props.navigation;
  //   Alert.alert (
  //     'No spots!',
  //     'Please post something on this spot!',
  //     [
  //       {text: 'Go Back', onPress: () => goBack()}
  //     ],
  //     {cancelable: false}
  //   )
  // }

  _renderItem = ({item}) => (
    <PostImage
      item={item}
      id={this.props.posts.posts[index].id}
      report={() => this.reportPost(item.id)}
      nextSlide={() => this.scrollIndex()}
      prevSlide={() => this.scrollBack()}
      fill={this.state.fill}
    />
  )

  render() {
    return (
      <View>
      {
        (this.props.posts.posts.length > 0)
        ?
        <View style={styles.blurred}>
          <BlurView blurType="dark" style={styles.blurred} blurAmount={15} />
          <Spinner style={styles.spinner} isVisible={true} size={80} type={'Bounce'} color={'#fff'}/>

          <FlatList
            ref={feed => {
              this.feedRef = feed;
            }}
            data={this.props.posts.posts}
            maxToRenderPerBatch={3}
            keyExtractor={item => item.id}
            getItemLayout={this.getItemLayout}
            shouldItemUpdate={(props,nextProps) =>
            {return props.item!==nextProps.item}}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            renderItem={this._renderItem}
            extraData={this.props.posts.posts}
            scrollEnabled={false}
            pinchGestureEnabled={false}
          />
        </View>
        :
          <Image
          style={styles.blurred}
          blurRadius={75}
          source={require('../../images/blurred.jpg')}/>
      }
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
