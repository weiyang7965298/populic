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
    Modal,
    TouchableWithoutFeedback,
    ListView,
    ImageBackground,
    Animated} from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles'



export default class Rankings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2}),
            picAddress: "", //
            showPics: false,
            picOwner: "",
            picTime: "",
        }
    }

    componentDidMount = () => {
        this.getRankList();
    }

    setModalVisible(visible) {
        this.setState({showPics: visible});
    }

    onVisibilityChanged = () =>{
        this.setModalVisible(!this.state.showPics)
    }

    displayPic = (visibile, item) =>{
        if( visibile ){
            this.onVisibilityChanged();
        }
            this.setState( { picAddress: item.challengPic,
                                picOwner: item.userName,
                                    picTime: item.finishedtime})
    }

    getRankList = () =>{
        fetch('http://localhost/dashboard/Data2.json'
        )
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ listItems:this.state.listItems.cloneWithRows(responseData.listItems) })
            })
            .catch((error)=> {
                console('ranking: get upcoming challenge data error');
            })
    }

    render() {
        return (
            <View>
                <Text style = { styles.rankingTitle }> Top Ten</Text>

                {/*------ detail modal ------*/}
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.showPics}
                >
                    {this.rankContentRender()}
                </Modal>

                {/*-------- top list -------*/}
                <View>
                    {this.renderList()}
                </View>
            </View>

        );
    }

    renderList(){

        if( this.state.listItem != "" ){
            return(
            <ListView
                dataSource={this.state.listItems}
                style ={ styles.rankList}
                showsVerticalScrollIndicator={false}
                renderRow={(rowData) =>
                    <TouchableWithoutFeedback
                        onPress={() => this.displayPic(true,rowData)}>

                        <View style={{flex: 1}}>
                            <ImageBackground
                                style={styles.rankItemBackground}

                            >
                                {/*----- picture info -----*/}
                                <View style = {styles.portraitView}>
                                    <Image
                                        style = {styles.userPortrait}
                                        source={{uri: rowData.headshot}} >
                                    </Image>
                                </View>
                                <View style = { styles.userDetail}>
                                    <Text style = {styles.userDetailText}>@{rowData.userName}</Text>
                                    <Text style = {styles.userDetailText}>Points:{parseInt(rowData.point).toLocaleString()}</Text>
                                </View>
                            </ImageBackground>
                        </View>

                    </TouchableWithoutFeedback>
                }
            />
            )
        }
    }

    rankContentRender(){
        return(
            <ImageBackground
                style = {styles.rankChallengePic}
                source={{uri:this.state.picAddress}}
            >
                <View style={ styles.rankPicDetail} >

                    {/*------ back button -----*/}
                    <View>
                        <TouchableWithoutFeedback
                            onPress={()=> {this.onVisibilityChanged()}}
                        >
                            <IonIcon
                                style = {styles.backBtn}
                                name="ios-arrow-back"
                                size={50}
                            />
                        </TouchableWithoutFeedback>
                    </View>

                    {/*------ picture info ------*/}
                    <View style = {styles.picOwner}>
                        <Text style = {styles.picInfo}>@{this.state.picOwner}</Text>
                        <Text style = {styles.picInfo}>{this.state.picTime} min ago</Text>
                    </View>

                </View>
            </ImageBackground>
        );
    }

}

