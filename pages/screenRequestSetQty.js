import React, {Component} from 'react'; 
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Image, 
  Text,  
  TouchableOpacity, 
  ScrollView,
  RefreshControl, 
  TextInput,  
  Search,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Alert
} from 'react-native';

import {
    Icon
    ,SocialIcon
    ,Header
    ,Card, 
    CheckBox,
    SearchBar
}from 'react-native-elements';

import {withNavigation} from 'react-navigation'; 
import * as appConfig from '../appConfig'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import Prompt from 'react-native-input-prompt';

class screenRequestSetQty extends Component{
     
    constructor(props){
        super(props);  
        this.state = {userid:null,username:null,fullname:null,userrole:null,
            fixedcheckboxes:[]
            ,refreshing: false
            ,checkboxes: []
            ,modalVisible:false 
            ,item:[]
          }; 
    }
    async componentDidMount(){ 
      this.setState({
          userid: await AsyncStorage.getItem('userid')
          ,username: await AsyncStorage.getItem('username')
          ,fullname: await AsyncStorage.getItem('fullname')
          ,userrole: await AsyncStorage.getItem('userrole')
          ,fixedcheckboxes:this.props.navigation.getParam('items').map(x => {
            x['qty'] = 0;
            return x;
          })
          ,checkboxes:this.props.navigation.getParam('items').map(x => {
            x['qty'] = 0;
            return x;
          })
      })
    }
      
  setModalVisible(visible,item) {
    this.setState({modalVisible: visible,item});
  }

  
  _updateCheck = (item,qty) =>{
    this.setState(state => {
      const index = state.checkboxes.findIndex(
        x => x.STOCK_ID === item.STOCK_ID
      );
      const index2 = state.fixedcheckboxes.findIndex(
        x => x.STOCK_ID === item.STOCK_ID
      );
      return {
        checkboxes: [
          ...state.checkboxes.slice(0, index),
          { STOCK_ID: item.STOCK_ID
            , STOCK_BRAND: item.STOCK_BRAND
            , STOCK_CRITICAL_LEVEL: item.STOCK_CRITICAL_LEVEL
            , STOCK_QUANTITY: item.STOCK_QUANTITY
            , STOCK_KEY_UNIT: item.STOCK_KEY_UNIT
            , STOCK_MODEL: item.STOCK_MODEL
            , STOCK_NAME: item.STOCK_NAME
            , STOCK_SIZE: item.STOCK_SIZE
            , UNIT_TYPE: item.UNIT_TYPE
            , CON_NAME: item.CON_NAME
            , SUP_NAME: item.SUP_NAME
            , SUP_EMAIL: item.SUP_EMAIL
            , SUP_CONTACT_NO: item.SUP_CONTACT_NO
            , SUP_ADDRESS: item.SUP_ADDRESS
            , isCritical: item.isCritical
            , value: true
            , qty: qty},
          ...state.checkboxes.slice(index+1),
        ],
        fixedcheckboxes: [
          ...state.fixedcheckboxes.slice(0, index2),
          { STOCK_ID: item.STOCK_ID
            , STOCK_BRAND: item.STOCK_BRAND
            , STOCK_CRITICAL_LEVEL: item.STOCK_CRITICAL_LEVEL
            , STOCK_QUANTITY: item.STOCK_QUANTITY
            , STOCK_KEY_UNIT: item.STOCK_KEY_UNIT
            , STOCK_MODEL: item.STOCK_MODEL
            , STOCK_NAME: item.STOCK_NAME
            , STOCK_SIZE: item.STOCK_SIZE
            , UNIT_TYPE: item.UNIT_TYPE
            , CON_NAME: item.CON_NAME
            , SUP_NAME: item.SUP_NAME
            , SUP_EMAIL: item.SUP_EMAIL
            , SUP_CONTACT_NO: item.SUP_CONTACT_NO
            , SUP_ADDRESS: item.SUP_ADDRESS
            , isCritical: item.isCritical
            , value: true
            , qty: qty},
          ...state.fixedcheckboxes.slice(index2+1),
        ],
      };
    },
    ) 
  }
  _save = () => {
    Alert.alert(
      'Save Batch Request', 
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );

  }
  _Search = search => {
    this.setState({refreshing: true}); 
    this.setState({search: search});  
    const newData = this.state.fixedcheckboxes.filter(item => {      
      const itemData = `${item.STOCK_NAME.toUpperCase()}   
      ${item.STOCK_KEY_UNIT.toUpperCase()} `;
       const textData = search.toUpperCase();
        
       return itemData.indexOf(textData) > -1;  
    });    
    this.setState({ checkboxes: newData,refreshing: false});   
  };

  static navigationOptions={
    header:null
  }
   
    render(){  
        return(  
        <View style={styles.container}>     
        <Header
        leftComponent={<Ionicons name='ios-arrow-round-back'  style= {{ color: 'gray',fontWeight:'bold', fontSize:30, marginBottom:15 }} onPress={()=>{this.props.navigation.navigate('RequestBatch')}}></Ionicons>}
        centerComponent={{ text: 'SELECTED STOCKS', style: { color: 'gray',fontWeight:'bold', flex:1 } }}
        rightComponent={<Ionicons name='ios-arrow-round-forward'  style= {{ color: 'gray',fontWeight:'bold', fontSize:30, marginBottom:15 }} onPress={()=>{
          Alert.alert(
            'Batch Request',
            'Are you sure you wan`t to submit this request?',
            [ 
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Submit', onPress: () => {alert("Successfully Submitted, Please wait for confirmation of your request"); 
              this.props.navigation.navigate('RequestBatch')}},
            ],
            {cancelable: false},
          );}}></Ionicons>}
        backgroundColor='white'
        containerStyle={{
          height: 70 - 24,
          shadowOffset:{  width: 10,  height: 10,  },
          shadowColor: 'black',
          shadowOpacity: 1.0,}} /> 
            <Prompt
                visible={this.state.modalVisible}
                title={this.state.item.STOCK_KEY_UNIT}
                placeholder="Quantity"
                onCancel={() =>
                    this.setState({
                        nickname: "User Cancelled!",
                        modalVisible: !this.state.modalVisible
                    })
                }
                submitText ='Save'
                onSubmit={text =>{
                    this._updateCheck(this.state.item,text)  
                    this.setState({modalVisible:false});
                }
                }
            />
        <SearchBar
            placeholder="Search for stocks..."
            round={true}
            onChangeText={this._Search}
            showLoading={this.state.refreshing}
            value={this.state.search}
            lightTheme={true} 
            inputStyle={{ height: 20 }}
            containerStyle={{
              backgroundColor: 'white',
              borderTopWidth: 0,
            }}
          /> 
        <ScrollView> 
          {/* <Text>{JSON.stringify(this.state.checkboxes)}</Text> */}
            
          <FlatList
          data={ this.state.checkboxes.filter( (item) => {
            return item.value === true})}
          renderItem={({ item }) => (
            <TouchableOpacity   style={{
              flex: 1,
              alignItems: 'center',
              paddingLeft:30,
              paddingRight:30,
              borderColor:"#696969",
              borderWidth: 0.5,
              borderRadius:10,
              margin:5,
              backgroundColor:item.isCritical}} 
              onPress={() => {
                this.setModalVisible(true,item);
              }} >
            <Text button style={styles.name}>{item.STOCK_NAME} - {item.qty}</Text>
            <Text style={styles.info}> {item.STOCK_KEY_UNIT}</Text>
            <Text style={styles.description}>Critical Level for this stock is <Text style={{fontWeight:'bold'}}>{item.STOCK_CRITICAL_LEVEL}</Text></Text>
            <Text style={{fontSize:11, fontWeight:'bold',marginBottom:10}}>Remaining Stocks is {item.STOCK_QUANTITY}</Text> 
            </TouchableOpacity>
          )}
          //Setting the number of column
          numColumns={1}
          keyExtractor={(item, index) => index}
        />
 
          </ScrollView> 
        </View> 
        )
    }
}

const styles = StyleSheet.create({ 
  container:{
    flex:1
  }, 
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    paddingLeft:30,
    paddingRight:30,
  },
  name:{
    fontSize:20,
    color: "#696969",
    fontWeight: "600",
    marginTop:5,
    textAlign:'center'
  },
  info:{
    fontSize:15,
    color: "#00BFFF",
  },
  description:{
    fontSize:11,
    color: "#696969",
    marginTop:5,
    textAlign: 'center'
  }, 
});
export default withNavigation(screenRequestSetQty);