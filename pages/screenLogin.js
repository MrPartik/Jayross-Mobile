import React, {Component} from 'react';
import {
  AppRegistry
  ,View
  ,Text
  ,StyleSheet
  ,StatusBar
  ,TextInput
  ,KeyboardAvoidingView
  ,Image
  ,TouchableOpacity 
  ,Keyboard
  ,Modal
  ,TouchableHighlight
  ,Alert
  ,ActivityIndicator
  ,AsyncStorage
} from 'react-native'; 

import {withNavigation} from 'react-navigation';
import * as appCofig from '../appConfig';
  

class screenLogin extends Component{ 
 
  static navigationOptions={
    header:null
  }
  state = {
    modalVisible: false 
    ,
  };
  constructor(props){ 
      
        super(props)
        this.state={ 
            tboxUserName:'' 
            ,tboxPass:'' 
        }

    }
  _signIn = (USERNAME,FULLNAME,USER_ROLE,PASSWORD) => { 

    AsyncStorage.setItem('username', USERNAME); 
    AsyncStorage.setItem('fullname', FULLNAME); 
    AsyncStorage.setItem('userrole', USER_ROLE); 
    AsyncStorage.setItem('password', PASSWORD); 
 
    this.props.navigation.navigate('App')
  }  
  loginUser = () =>{
         
    const{tboxUserName}=this.state; 
    const{tboxPass}=this.state;  
    fetch('http://'+appCofig._api+'/ims/login.php',{
        method:'post'
        ,headers:{
            'Accept':'application/json'
            ,'Content-Type':'application/json'
        }
        ,body:JSON.stringify({
            username: tboxUserName
            ,password:tboxPass
        })

        }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson){
              let USERNAME = responseJson[0].USERNAME
                ,FULLNAME = responseJson[0].FULLNAME
                ,USER_ROLE = responseJson[0].USER_ROLE
                ,PASSWORD = responseJson[0].PASSWORD 
                this._signIn(USERNAME,FULLNAME,USER_ROLE,PASSWORD); 
                console.log(responseJson[0])
                console.log(responseJson[0].USERNAME)
            }
            else
             Alert.alert('Login','Error Logging in. Please check your inputs');
        }).catch((error) => {
            console.error(error); 
        });
 
        }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
 
  render(){
    return( 
        <KeyboardAvoidingView behavior='padding' style={styles.container}  enabled >
         
            <View style={styles.logoContainer}> 
                {/* <Image source={require('../assets/logo.png')} style={{width:'100%', height:150}} /> */}
                <Text style={styles.title} >Login </Text>
                <Text style={styles.subTitle} >Welcome, please feel free to login</Text>
            </View>
            <View style={styles.formContainer}>
            
                <TextInput style={styles.input} 
                placeholder="Username or Email Address" 
                placeholderTextColor="gray" 
                returnKeyType='next' 
                keyboardAppearance='dark'    
                onChangeText={tboxUserName=>this.setState({tboxUserName})}
                onSubmitEditing={()=> this.passwordInput.focus()} />

                <TextInput style={styles.input} 
                placeholder="Password" 
                placeholderTextColor="gray"  
                secureTextEntry 
                returnKeyType='go' 
                onChangeText={tboxPass=>this.setState({tboxPass})}
                ref={(input)=>this.passwordInput =input}
                />
                <View >
                    <TouchableOpacity style={styles.login} onPress={()=>this.loginUser(this)}> 
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity> 
    {/*                     
                    <TouchableOpacity style={styles.register} onPress={()=>this.props.navigation.navigate('Registration')}>
                        <Text style={styles.buttonText}>I don't have an account, please register me</Text>
                    </TouchableOpacity>
   */}
                </View>
            </View>
            
        </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        flex:1
        ,backgroundColor: 'white'  
        ,paddingTop:10
        ,paddingBottom:10
    }
    ,logoContainer:{
        alignItems:'center'
        ,flexGrow:1
        ,justifyContent:'center'
    }
    ,logo:{
        width:300
        ,height:120
    }
    ,title:{
        color:'black'
        ,marginTop:10
        ,width:160
        ,textAlign:'center'
        ,opacity:0.8 
        ,fontSize:35
        ,fontWeight:'bold'
    }
    ,subTitle:{
        color:'gray'
        ,marginTop:10
        ,width:250
        ,textAlign:'center'
        ,opacity:0.5 
        ,fontSize:12
    }
    ,icons: {
        padding: 10,
    }
    ,formContainer:{
        padding:20
    }
    ,input:{
        height:40
        ,backgroundColor: 'white'
        ,marginBottom:10
        ,color:'gray'
        ,paddingHorizontal:10 
        ,borderWidth:2
        ,borderColor:'gray'
      }
      ,login:{
        backgroundColor:'#061837'
        ,paddingVertical:10 
        ,opacity:0.8
        ,borderWidth:1
        ,borderColor:'white'
      } 
      ,register:{
        marginTop: 5
        ,opacity:0.8  
        ,marginBottom:10
      }
      ,buttonText:{
        textAlign:'center'
        ,color:'#fff'
        ,fontWeight:'700'
      } 

});

export default withNavigation(screenLogin);