import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';


var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
var ScreenScale = Dimensions.get('window').scale;


const styles = StyleSheet.create({

    pointsNumber: {
        fontSize: 30 * ( ScreenHeight / 667),
        fontWeight: "bold",
        color: "#FFCC33"
    },

    pointsUnit: {
        top: 5 * ( ScreenHeight / 667),
        color: "#FFCC33"
    },

    pointsDisplay:{
        flex: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

    },

    pointsDialogTitle: {
        fontWeight: "bold",
        fontSize: 18 * ( ScreenHeight / 667) ,
        color: "#CC3300",
        alignSelf: "center",
        top: 30 * ( ScreenHeight / 667),
    },

    pointsDialogBtnText: {
        color: "#CC3300",
        fontWeight:"bold",
        fontSize: 14 * ( ScreenHeight / 667)
    },

    pointsDialogText:{
        height: 6 * ScreenHeight / 25,
    },

    dialogBtn: {
        borderTopWidth: 1,
        borderColor: "#E80000",
        width: ScreenWidth/1.2,
        height: ScreenHeight/12.5,
        justifyContent: "center",
        alignItems: "center",
    },

    pointsDialogContent:{
        height: ScreenHeight/2.5,
        width: ScreenWidth/1.2,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        alignSelf: "center",
        top: ScreenHeight/5 * ( ScreenHeight / 667),
        overflow: "hidden",
    },

    pointsDialogBlurred: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'transparent',
    },

    // backBtn: {
    //     top: 20,
    //     right: ScreenWidth/15,
    // },

    challengeBackImage: {
        flex: 1,
        backgroundColor: 'transparent'
    },

    challengeTitle: {
        marginTop: ScreenHeight/13,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    challengeTitleContent: {
        color: "#FFFFFF",
        fontSize: 30 * ( ScreenHeight / 667),
        justifyContent: "flex-start",
        alignItems: 'center',
        fontWeight: 'bold',
        left: ScreenWidth/15,
    },

    suggestionPin: {
        marginTop: ScreenHeight/30,
        right: ScreenWidth/15,
        color: "#FFFFFF",
    },

    challengeTabUnderline:{
        backgroundColor:'#E8E8E8',
        flex: 0.5,
        width:84  * ( 667/ScreenHeight),
        height:1,
        left: 40.5  * ( 667/ScreenHeight),
    },

    challengeTab: {
        width: ( ( 7 * ScreenWidth )/8 ),
        marginTop: -20 * ( ScreenHeight / 667),
        alignSelf:'center'
    },

    challengeTabBarText: {
        fontSize: 12 * ( ScreenHeight / 667),
        marginTop: 40  * ( 667/ScreenHeight),
        color:"#E8E8E8",
    },

    scrollStyle: {
        overflow: "hidden",
        height: ScreenHeight/2.2,
    },

    dailyChallengeContent: {
        marginTop: 20 * ( ScreenHeight / 667),

    },

    dailyContent: {
        top: 10 * ( ScreenHeight / 667),
    },

    thumbsOn: {
        alignSelf: "center",
        color: "#ffffff"
    },

    thumbsOff: {
        alignSelf: "center",
        opacity: 0.5,
        color: "#ffffff"
    },


    likeBtmLeft:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: ScreenWidth/10,
        marginRight: ScreenWidth/10,
        marginBottom: 15 * ( ScreenHeight / 667),

    },

    likeBtmRight:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: ScreenWidth/20,
        marginRight: ScreenWidth/20,
        marginBottom: 15 * ( ScreenHeight / 667),

    },

    likeBtmBackground: {
        width: 30 * ( ScreenHeight / 667),
        height: 30 * ( ScreenHeight / 667),
        borderRadius: 15 * ( ScreenHeight / 667),
        overflow: "hidden",
        justifyContent: "center"
    },

    upCompingPicTwo: {
        top:20 * ( ScreenHeight / 667),
        borderRadius: 5,
        overflow: 'hidden'

    },

    upcomingDetail: {
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,

    },

    upcomingPicBackgroundOne: {
        width: ScreenWidth/2,
        height: 190 * ( ScreenHeight / 667),
        backgroundColor: 'transparent',
        borderRadius: 5,
        overflow: "hidden",
        justifyContent: "center"
    },

    upcomingPicBackgroundTwo: {
        width: ScreenWidth/2,
        height: 160 * ( ScreenHeight / 667),
        marginBottom:20 ,
        borderRadius: 5,
        overflow: "hidden",
        justifyContent: "center"
    },

    upcomingPicBackgroundThree: {
        width: ScreenWidth/3,
        height: 160 * ( ScreenHeight / 667),
        backgroundColor: 'transparent',
        justifyContent: "center"
    },

    upcomingPicBackgroundFour: {
        width: ScreenWidth/3,
        height: 190 * ( ScreenHeight / 667),
        backgroundColor: 'transparent',
        overflow: "hidden",
        marginBottom:20,
        borderRadius: 5,
        justifyContent: "center"
    },

    upcomingText: {
        fontWeight: "bold",
        color: "#ffffff",
        fontSize: 20 *  (ScreenHeight / 667),
        alignSelf: "center",
        marginTop:20 * ( ScreenHeight / 667),
        marginLeft: 5,
    },

    upcomingTextBig: {
        fontWeight: "bold",
        color: "#ffffff",
        fontSize: 40 * ( ScreenHeight / 667),
        alignSelf: "center",
    },

    upcomingPic: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: ( 1/ScreenHeight ) * 65000,
    },

    upcomingLeft: {
        alignSelf: "flex-start",
    },

    upcomingRight: {
        alignSelf: "flex-start",
    },

    upCompingPicOne: {
        top:10 * ( ScreenHeight / 667),
        borderRadius: 5,
        overflow: 'hidden'
    },

    dailyChallengeBackground: {
        backgroundColor: "rgba(255,255,255,0.5)",
        width: 250 * ( ScreenHeight / 667) ,
        height: 180 * ( ScreenHeight / 667),
        alignSelf: "center",
        borderRadius: 10,
    },

    addPin: {
        marginTop: 15 * ( ScreenHeight / 667),
        alignSelf: "center",
        color:"#ffffff",
    },

    upcomingContent: {

    },

    upcomingTitle: {
        alignSelf: "center"
    },

    picContent: {
        top: 10 * ( ScreenHeight / 667),
    },

    upcomingTitleText: {
        fontWeight: "bold",
        color: "#ffffff",
        fontSize: 20 * ( ScreenHeight / 667),
        alignSelf: "center",
        top: 10,
    },

    dailyChallengeTitle: {
        top: 10 * ( ScreenHeight / 667),
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 15 * ( ScreenHeight / 667),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },

    dailyChallengePic: {
        width: 100 * ( ScreenHeight / 667),
        height: 100 * ( ScreenHeight / 667),
        borderRadius: 50 * ( ScreenHeight / 667),
        borderColor: "#FFFFFF",
        borderWidth: 2,
        alignSelf: "center",
        opacity: 100
    },

    likeBtmStyle: {
        color: "#ffffff"
    },

    paginationStyle: {
        top: 20 * ( ScreenHeight / 667),
        alignItems: "flex-start"
    },

    activeDot: {
        backgroundColor: '#ff9900',
        width: 25,
        height: 5,
        borderRadius: 5,
        marginRight: 10,
    },
    dotStyle: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 25,
        height: 5,
        borderRadius: 5,
        marginRight: 10,
    },


    picDetails: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: 30,
    },

    thumbsBackground: {
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        width: 50 * ( ScreenHeight / 667),
        height: 50 * ( ScreenHeight / 667),
        borderRadius: 25 * ( ScreenHeight / 667),
        borderWidth: 1,
        borderColor: "#FFFFFF",
    },

    backBtn: {
        color: "#FFFFFF",
        marginLeft: 30 * ( ScreenHeight / 667),
    },

    cameraView: {
        color: "#FFFFFF",
        marginRight: ScreenWidth/5,
    },

    likeView: {
        flexDirection: "row",
        flex:2,
        alignItems: "center",
        justifyContent: "space-between",
        marginRight: ScreenWidth/15,
    },

    iconView: {
        flexDirection: "row",
        width: ScreenWidth / 1.2,
        alignSelf: "center",
    },

    sampleiconView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 30,
    },

    sampleCameraView: {
        color: "#FFFFFF",
    },

    picOwner: {
        width: 120 * ( ScreenHeight / 667),
        height: 60 * ( ScreenHeight / 667),
        backgroundColor: "rgba(255,255,255,0.5)",
        borderRadius: 10 * ( ScreenHeight / 667),
        alignSelf: "flex-end",
        marginRight: 30 * ( ScreenHeight / 667),
        justifyContent: "center"
    },

    picInfo: {
        fontSize: 13 * ( ScreenHeight / 667),
        fontWeight: 'bold',
        alignSelf:"center",
        color: "#ff9900"
    },

    sampleStyle:{
        fontSize:40 * ( ScreenHeight / 667) ,
        fontWeight: "bold",
        color: "#FFCC00",
        top: 40 * ( ScreenHeight / 667),
        marginLeft: 30 * ( ScreenHeight / 667),

    },

    slideSample: {
        flex: 1,
        flexDirection: "column",
    },

    slideFinished:{
        flex: 1,
        flexDirection: "row",
        paddingTop: 40 * ( ScreenHeight / 667),
    },

    portraitView: {
        flex: 0.4,
        justifyContent: "center"
    },

    userPortrait: {
        width: 70 * ( ScreenHeight / 667),
        height: 70 * ( ScreenHeight / 667),
        resizeMode: "repeat",
        borderRadius: 35 * ( ScreenHeight / 667),
        borderColor: "#FFFFFF",
        borderWidth: 2,
        alignSelf: "center"
    },

    rankChallengePic: {
        flex: 1,
        backgroundColor: "transparent"
    },

    userDetail: {
        alignSelf: "center",
        marginLeft: 10 * ( ScreenHeight / 667),
        flex: 0.6,
    },

    userDetailText: {
        color: '#ffffff'
    },

    rankingTitle: {
        marginTop: 20 * ( ScreenHeight / 667),
        marginBottom: 20 * ( ScreenHeight / 667),
        alignSelf: "center",
        fontSize: 18 * ( ScreenHeight / 667) ,
        color: "#FFFFFF",
        fontWeight: "bold"
    },

    rankItemBackground: {
        flexDirection: "row",
        backgroundColor: "rgba(255,255,255,0.5)",
        width: 280 * ( ScreenHeight / 667),
        height: 80 * ( ScreenHeight / 667),
        justifyContent: "space-between",
        borderRadius: 5,
        marginBottom: 10,
        zIndex: 1,
        alignSelf: "center"
    },

    rankPicDetail:{
        paddingTop: 40 * ( ScreenHeight / 667),
        flexDirection: "row",
        justifyContent: "space-between"

    },

    rankList:{
        marginBottom: 130 * ( ScreenHeight / 667) ,
    },


});

export default styles;
