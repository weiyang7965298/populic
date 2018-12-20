/*
*
*   Component that displays challenges detail
*
*   By @lin
*/

import React, { Component } from 'react';
import {
    AppRegistry,
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
    Modal,
    ImageBackground,
    TouchableWithoutFeedback,
    Animated} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/spotAction';
import * as PostActions from '../../actions/postAction';
import ScrollableTabView, { ScrollableTabBar, }   from 'react-native-scrollable-tab-view'
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BlurView, VibrancyView } from 'react-native-blur';
import DailyChallenges from '../../views/Challenge/DailyChallenges';
import Rankings from "../../views/Challenge/Rankings";
import IconCustom from '../../config/icons';
import styles from './styles';



var finishedpoints = "900";


function mapStateToProps(state) {
    return {
        // //dummy: true
        // token: state.userReducer.token,
        // user: state.userReducer.user,
        // spots: state.spotReducer,
        // spotArray: state.spotReducer.pinnedGroups,
        // markers: state.locationReducer.locs,
        // posts: state.postReducer,
        // locContent: state.userReducer.imageVideo
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, Actions, PostActions), dispatch);
}

class Challenge extends Component {

    static navigationOptions = {
        tabBarLabel: 'Challenge',
        gesturesEnabled: false,
        tabBarIcon: ({ tintColor }) => (
            <IconCustom name="Upcoming" size={20} style={{ color: tintColor }}/>
        ),
    };

    constructor(props){
        super(props);
        this.state = {
            showAdd : true, // submitSuggestion button
            dialogVisible: true, // get points dialog

        }
    }

    createSpot = () =>{////?????
        this.props.toggleModal(true);////???????
        const { navigate } = this.props.navigation;
        navigate('Main');
    }


    fadeAddSign = ( index ) => {
        if( index == 1 ){
            this.setState({showAdd: false});
        }else{
            this.setState({showAdd: true});
        }
    }

    sumbitSuggestion = () => {
            alert("subtmit your idea");
    }

    closeDialog = () => {
            this.setState({dialogVisible: !this.state.dialogVisible});
    }

    jumpToContact = () =>{
        //alert("contact list @yang");
        this.setState({dialogVisible: !this.state.dialogVisible});
    }

    render(){
        // submitSuggestion button
        let addSign = this.state.showAdd ?<TouchableOpacity
            onPress={() => this.sumbitSuggestion()}>
                <IonIcon style = {styles.suggestionPin} name="md-add" size={30}/>
        </TouchableOpacity>: null

        return (
            <ImageBackground
                style = {styles.challengeBackImage}
                source={require("../../images/bg_color.png")}
            >

                <View style = {styles.challengeTitle}>

                    <View>
                        <Text style = {styles.challengeTitleContent}> USC Daily</Text>
                        <Text style = {styles.challengeTitleContent}> Challenge </Text>
                    </View>

                    {addSign}

                </View>

                {/*---------------------get points popup-------------------------------*/}
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.dialogVisible}
                    transparent = {true}
                >
                    {this.pointsRender()}

                </Modal>

                {/*------------------------challenge and ranking scrollView------------*/}
                <ScrollableTabView
                    style={styles.challengeTab}
                    initialPage={0}
                    tabBarUnderlineStyle={styles.challengeTabUnderline}
                    abBarActiveTextColor='#E8E8E8'
                    tabBarInactiveTextColor='#E8E8E8'
                    tabBarTextStyle={styles.challengeTabBarText}
                    onChangeTab={(obj) => { this.fadeAddSign(obj.i)}}
                >

                    <DailyChallenges tabLabel='CHALLENGES' navigation = {this.props.navigation} ></DailyChallenges>
                    <Rankings tabLabel='RANKINGS'></Rankings>

                </ScrollableTabView>

            </ImageBackground>
        );
    }

    pointsRender(){
        return(
            <View style={styles.pointsDialogBlurred}>
                <BlurView
                    blurType="light"
                    style={styles.pointsDialogBlurred}
                    blurAmount={3}
                />
                    <View style = {styles.pointsDialogContent}>
                        <View style = {styles.pointsDialogText}>
                            <Text style = {styles.pointsDialogTitle}>You completed the challenge!</Text>
                            <View style = {styles.pointsDisplay}>
                                <Text style = {styles.pointsNumber} >+{finishedpoints}</Text>
                                <Text style = {styles.pointsUnit} >points</Text>
                            </View>
                        </View>

                        {/*---------------jump to contact list ------------------*/}
                        <TouchableWithoutFeedback
                            onPress = { () => {this.jumpToContact()}}
                        >
                        <View style = { styles.dialogBtn}>
                            <Text style = { styles.pointsDialogBtnText}>PUT YOUR FRIENDS IN THE HIGHKEY</Text>
                        </View>

                        </TouchableWithoutFeedback>

                        {/*----------------cancel this dialog --------------------*/}
                        <TouchableWithoutFeedback
                            onPress = { () => {this.closeDialog()}}
                        >
                            <View style = { styles.dialogBtn}>
                                <Text style = { styles.pointsDialogBtnText}>NO THANKS</Text>
                            </View>

                        </TouchableWithoutFeedback>

                    </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);

