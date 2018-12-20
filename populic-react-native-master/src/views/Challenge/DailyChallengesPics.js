import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    ImagePickerIOS,
    SegmentedControlIOS,
    AsyncStorage,
    StyleSheet,
    View,
    ListView,
    TouchableHighlight,
    ImageBackground,
    TouchableWithoutFeedback,
    Animated} from 'react-native';

import Swiper from 'react-native-swiper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles'

const SAMPLE = "Sample"


export default class DailyChallengesPics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            challengeSample: this.props.challengeSample,
            finishedChallenge: this.props.finishedChallenge,
        }
    }

    jumpToCamera = () =>{
        const { navigate } = this.props.navigation;
        navigate('Camera',{
            // CompetitorUserName:this.state.username,
            // CompetitorNickName:this.state.competitor,
            // myNickName:this.state.me,
            // userUserName: this.state.myUsername
        });
        this.props.displayCallback()
    }

    thumbsUp = () =>{
        alert("thumbsUp")
    }

    thumbsDown = () =>{
        alert("thumbsdown")
    }

    render() {
        return (
                 <Swiper
                     loop = {false}
                     showsButtons = {true}
                     paginationStyle = { styles.paginationStyle}
                     dot={<View style={ styles.dotStyle}/>}
                     activeDot = {<View style={ styles.activeDot}/>}
                 >
                     {this.finishedPics()}

                 </Swiper>
        );
    }

    finishedPics(){
        console.log("challengeSample: " + this.state.challengeSample);

        if( this.state.finishedChallenge.length != 0 &&  this.state.challengeSample != null ){
            let content = [];

            //sample pics
            content.push(
                <ImageBackground
                    style = {styles.slideSample}
                    source={{uri: this.state.challengeSample}}
                >
                    <Text style = { styles.sampleStyle}>{SAMPLE}</Text>
                    {/*--------- camera icon ---------*/}
                    <View style = { styles.sampleiconView}>
                        <TouchableOpacity
                            onPress={() => this.jumpToCamera()}>
                            <IonIcon
                                style = {styles.sampleCameraView}
                                name="ios-camera-outline"
                                size={60}

                            />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            )

            // finished Pics
            for( let address of this.state.finishedChallenge ){
                content.push(

                    <ImageBackground
                        style = {styles.slideFinished}
                        source={{uri: address.uri}}
                    >
                        <TouchableOpacity
                            onPress={()=> {this.props.displayCallback()}}
                        >
                            <IonIcon
                                style = {styles.backBtn}
                                name="ios-arrow-back"
                                size={50}

                            />
                        </TouchableOpacity>

                        <View style = {styles.picDetails }>
                            <View style = {styles.picOwner}>
                                <Text style = {styles.picInfo}>@{address.name}</Text>
                                <Text style = {styles.picInfo}>{address.time}</Text>
                            </View>

                            {/*--------- camera icon ---------*/}
                            <View style = { styles.iconView}>
                                <TouchableOpacity
                                    onPress={() => this.jumpToCamera()}>
                                    <IonIcon
                                        style = {styles.cameraView}
                                        name="ios-camera-outline"
                                        size={60}

                                    />
                                </TouchableOpacity>

                                {/*--------- thumbs icon ---------*/}
                                <View style = { styles.likeView}>

                                        <ImageBackground
                                            style = { styles.thumbsBackground}
                                        >
                                            <TouchableOpacity
                                                onPress = { () => this.thumbsDown()}
                                            >
                                            <FontAwesome
                                                style = {styles.likeBtmStyle}
                                                name="thumbs-down"
                                                size={30}
                                            />
                                            </TouchableOpacity>
                                        </ImageBackground>

                                        <ImageBackground style = { styles.thumbsBackground}>
                                            <TouchableOpacity
                                                onPress = { () => this.thumbsUp()}
                                            >
                                            <FontAwesome
                                                style = {styles.likeBtmStyle}
                                                name="thumbs-up"
                                                size={30}
                                            />
                                            </TouchableOpacity>
                                        </ImageBackground>

                                </View>

                            </View>
                        </View>
                    </ImageBackground>
                )
            }
            return content;
        }
    }

}


