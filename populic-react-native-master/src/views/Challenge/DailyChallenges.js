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
    Alert,
    Modal,
    Dimensions,
    ImageBackground,
    TouchableWithoutFeedback,
    Animated} from 'react-native';
import DailyChallengesPics from './DailyChallengesPics';
import IonIcon from 'react-native-vector-icons/Ionicons';
import styles from './styles'


var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
var ScreenScale = Dimensions.get('window').scale;
export default class DailyChallenges extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showPics : false,
            dailyChallengeTitle: "oops! you can not connect the server",
            dailyChallengePic: "",// daily challenge pictures uri
            challengeContent: "", // upcoming challnge pictures uri
            finishedChallenge: "",// other users pictures uri
            challengeSample: "",// sample uri
            dislikeBtn: "",//thumbsDown array
            likeBtn: "",// thumbsUp array

        }

    }

    setModalVisible(visible) {
        this.setState({showPics: visible});
    }

    onVisibilityChanged = () =>{
        this.setModalVisible(!this.state.showPics)
    }

    componentDidMount = () => {
        this.getdata();
        this.getDailyChallengeData();
        this.getupComingData();

    }

    getdata = () =>{
        // var ScreenHeight = Dimensions.get('window').height;
        // console.log("xxxx:" + ScreenHeight );
        let request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },body: JSON.stringify({
                date: "10-20-2017",//date,
            }),
        };

        let uri = 'http://104.236.189.217:8888/getUpcomingChallenges'
        fetch(uri,request).then((response) => response.json()).then((responseJson) => {
            console.log("original data : " + responseJson);

        }).catch(error => {
            throw  console.log(" original data : no server ");
        });
    }

    getDailyChallengeData = () =>{
        fetch('http://localhost/dashboard/Data1.json'
        )
            .then((response) => response.json())
            .then((responseData) => {

                console.log("dailyChallengeData: "+ responseData.challengePics);
                this.setState({dailyChallengeTitle: responseData.challengeTitle,
                                    dailyChallengePic: responseData.challengePics,
                                        finishedChallenge: responseData.finishedChallenge,
                                            challengeSample: responseData.challengeSample})
                console.log("finishedChallenge: "+ this.state.finishedChallenge)

            })

            .catch((error)=> {
                console('dailyData: get daily challenge data error');
            })
    }

    getupComingData = () =>{
        fetch('http://localhost/dashboard/Data.json'
        )
            .then((response) => response.json())
            .then((responseData) => {

                let arrLike = new Array(responseData.challengeContent.length);
                arrLike.fill(true);
                let arrDis = new Array(responseData.challengeContent.length);
                arrDis.fill(true);
                this.setState({challengeContent: responseData.challengeContent, dislikeBtn: arrDis, likeBtn: arrLike})
                console.log("upcomingdata: " + this.state.challengeContent[0].title)
            })
            .catch((error)=> {
                console('upcomingData: get upcoming challenge data error');
            })
    }

    jumpToCamera = () =>{
        const { navigate } = this.props.navigation;
        navigate('Camera',{
            // CompetitorUserName:this.state.username,
            // CompetitorNickName:this.state.competitor,
            // myNickName:this.state.me,
            // userUserName: this.state.myUsername
        });
    }

    // click event
    thumbsUp = ( itemNum ) =>{
        let btnArray = this.state.likeBtn;
        let dislikeBtnArray = this.state.dislikeBtn;
        // check if the dislike button is clicked
        if( dislikeBtnArray[itemNum] != false){

            if( btnArray[itemNum] == true){
                btnArray[itemNum] = false;
                this.setState( { likeBtn : btnArray } )
                alert("thumbsUp")
            }else{
                btnArray[itemNum] = true;
                this.setState( { likeBtn : btnArray } )
                alert("undon thumbsUp")
            }
        }
    }

    // click event
    thumbsDown = ( itemNum) =>{
        let btnArray = this.state.likeBtn;
        let dislikeBtnArray = this.state.dislikeBtn;
        // check if the like button is clicked
        if( btnArray[itemNum] != false){

            if( dislikeBtnArray[itemNum] == true){
                dislikeBtnArray[itemNum] = false;
                this.setState( { dislikeBtn : dislikeBtnArray } )
                alert("thumbsDown")
            }else{
                dislikeBtnArray[itemNum] = true;
                this.setState( { dislikeBtn : dislikeBtnArray } )
                alert("undon thumbsDown")
            }
        }
    }


    render() {
        return (
                <View style = {styles.dailyChallengeContent} >
                    <ImageBackground style = {styles.dailyChallengeBackground}>
                        <View style = {styles.dailyContent}>
                            {/*------------------- jump to daily detail of challenge ----------------------*/}
                            <TouchableWithoutFeedback
                                onPress={() => this.setModalVisible(true)}>
                                <Image
                                    style = {styles.dailyChallengePic}
                                    source={{uri:this.state.dailyChallengePic}}
                                >
                                </Image>
                            </TouchableWithoutFeedback>

                                <Text style = {styles.dailyChallengeTitle} >{this.state.dailyChallengeTitle}</Text>

                            {/*------------------------------ jump to camera ----------------------------*/}

                                <View>
                                    <TouchableWithoutFeedback
                                        onPress={() => this.jumpToCamera()}>
                                    <IonIcon
                                        style = {styles.addPin}
                                        name="md-add"
                                        size={30 * ( ScreenHeight / 667)}
                                    />
                                    </TouchableWithoutFeedback>
                                </View>


                        </View>
                    </ImageBackground>

                    {/*------------------------ detail of daily challenge ---------------------*/}
                    <Modal
                        animationType={"slide"}
                        transparent={false}
                        visible={this.state.showPics}
                    >
                        <DailyChallengesPics
                            displayCallback = {this.onVisibilityChanged}
                            challengeSample = {this.state.challengeSample}
                            finishedChallenge = {this.state.finishedChallenge}
                            navigation = {this.props.navigation}
                        >
                        </DailyChallengesPics>
                    </Modal>

                    {/*------------------------ detail of daily upcoming challenge ---------------------*/}
                    <View style = {styles.upcomingContent}>
                        <View style = {styles.upcomingTitle}>
                            <Text style = {styles.upcomingTitleText}>Upcoming</Text>
                        </View>
                        <View style = { styles.picContent}>
                            {this.upcomingRender()}
                        </View>
                    </View>

                </View>
        );
    }


    upcomingRender() {
        if(this.state.challengeContent != "" ){
            return(
                <ScrollView
                    style = {styles.scrollStyle}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical = {false}
                >

                    <View style = {styles.upcomingPic}>

                        <View style = {styles.upcomingLeft}>

                            {/*------------top left --------------*/}
                            <View style = {styles.upCompingPicOne}>
                                <ImageBackground
                                    style={ styles.upcomingPicBackgroundOne}
                                    source={{uri:this.state.challengeContent[0].uri }}
                                >
                                    <View style = { styles.upcomingDetail}>

                                        {/*-------- upcoming title ---------*/}
                                        <Text style = { styles.upcomingTextBig}>{this.state.challengeContent[0].title}</Text>

                                        {/*---------- thumbs btn -----------*/}
                                        <View style = { styles.likeBtmLeft}>
                                            {this.thumbsUpBtnRender(0)}
                                            {this.thumbsDownBtnRender(0)}
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>

                            {/*------------bottom left --------------*/}
                            <View style = {styles.upCompingPicTwo} >
                                <ImageBackground
                                    style={styles.upcomingPicBackgroundTwo}
                                    source={{uri:this.state.challengeContent[1].uri }}
                                >
                                    <View style = { styles.upcomingDetail}>
                                        {/*-------- upcoming title ---------*/}
                                        <Text style = { styles.upcomingText}>{this.state.challengeContent[1].title}</Text>

                                        {/*---------- thumbs btn -----------*/}
                                        <View style = { styles.likeBtmLeft}>
                                            {this.thumbsUpBtnRender(1)}
                                            {this.thumbsDownBtnRender(1)}
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>

                        </View>

                        <View style = {styles.upcomingRight}>

                            {/*------------top right --------------*/}
                            <View style = {styles.upCompingPicOne}>
                                <ImageBackground
                                    style={styles.upcomingPicBackgroundThree}
                                    source={{uri:this.state.challengeContent[2].uri }}
                                >
                                    <View style = { styles.upcomingDetail}>
                                        {/*-------- upcoming title ---------*/}
                                        <Text style = { styles.upcomingText}>{this.state.challengeContent[2].title}</Text>

                                        {/*---------- thumbs btn -----------*/}
                                        <View style = { styles.likeBtmRight}>
                                            {this.thumbsUpBtnRender(2)}
                                            {this.thumbsDownBtnRender(2)}
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>

                            {/*------------bottom right --------------*/}
                            <View style = {styles.upCompingPicTwo} >
                                <ImageBackground
                                    style={styles.upcomingPicBackgroundFour}
                                    source={{uri:this.state.challengeContent[3].uri }}
                                >
                                    <View style = { styles.upcomingDetail}>
                                        {/*-------- upcoming title ---------*/}
                                        <Text style = { styles.upcomingText}>{ this.state.challengeContent[3].title}</Text>

                                        {/*---------- thumbs btn -----------*/}
                                        <View style = { styles.likeBtmRight}>
                                            {this.thumbsUpBtnRender(3)}
                                            {this.thumbsDownBtnRender(3)}
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>

                        </View>

                    </View>

                </ScrollView>
            )
        }

    }

    thumbsUpBtnRender (itemNum ) {

        let thumbsUp = this.state.likeBtn[ itemNum ] ?
            <ImageBackground style={styles.likeBtmBackground} source={require("../../images/bg_color.png")}>
                <TouchableOpacity onPress = { () => this.thumbsUp( itemNum )}>
                    <IonIcon
                        style={ styles.thumbsOn}
                        name="md-thumbs-up"
                        size={20 * ( ScreenHeight / 667)}
                    />
                </TouchableOpacity>
            </ImageBackground> :
            <ImageBackground style={styles.likeBtmBackground} source={require("../../images/bg_color.png")}>
                <TouchableOpacity onPress = { () => this.thumbsUp( itemNum )}>
                    <IonIcon
                        style = {styles.thumbsOff}
                        name="md-thumbs-up"
                        size={20 * ( ScreenHeight / 667)}
                    />
                </TouchableOpacity>
            </ImageBackground>

        return thumbsUp;
    }

    thumbsDownBtnRender (itemNum ) {

        let thumbsDown = this.state.dislikeBtn[ itemNum ] ?
            <ImageBackground style={styles.likeBtmBackground} source={require("../../images/bg_color.png")}>
                <TouchableOpacity onPress = { () => this.thumbsDown( itemNum )}>
                    <IonIcon
                        style={ styles.thumbsOn}
                        name="md-thumbs-down"
                        size={20 * ( ScreenHeight / 667)}
                    />
                </TouchableOpacity>
            </ImageBackground>:
            <ImageBackground style={styles.likeBtmBackground} source={require("../../images/bg_color.png")}>
                <TouchableOpacity onPress = { () => this.thumbsDown( itemNum )}>
                    <IonIcon
                        style = {styles.thumbsOff}
                        name="md-thumbs-down"
                        size={20 * ( ScreenHeight / 667)}
                    />
                </TouchableOpacity>
            </ImageBackground>

        return thumbsDown;
    }
}

