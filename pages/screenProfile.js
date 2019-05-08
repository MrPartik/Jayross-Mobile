import React, {Component} from 'react';

import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Icon,
  Text,  
  TouchableOpacity
} from 'react-native';

import {withNavigation} from 'react-navigation'; 
import * as appConfig from '../appConfig';

class screenProfile extends Component{
     
    constructor(props){
        super(props); 
        this.state = {userid:null,username:null,fullname:null,userrole:null}; 
    }
    async componentDidMount(){ 
      this.setState({
          userid: await AsyncStorage.getItem('userid')
          ,username: await AsyncStorage.getItem('username')
          ,fullname: await AsyncStorage.getItem('fullname')
          ,userrole: await AsyncStorage.getItem('userrole')
      })
    }
    _signOut = () => {
        AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
    
    render(){
        // const userDetails = (this.state.user)
        return(
        <View style={styles.container}>
          <View style={styles.header}></View> 
          
          <Image style={styles.avatar} source={require('../assets/images/avatar.png')}/>
          <View style={styles.body}>  
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.fullname}</Text>
              <Text style={styles.info}>Jayross Mobile User / Requisition</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
              
              <TouchableOpacity onPress={this._signOut} style={styles.buttonContainer}>
                <Text>Logout</Text>  
              </TouchableOpacity>              
              {/* <TouchableOpacity style={styles.buttonContainer}>
                <Text>Opcion 2</Text> 
              </TouchableOpacity> */}
            </View>
            </View> 
        </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
      backgroundColor: "#00BFFF",
      height:200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
  });
  
export default withNavigation(screenProfile);