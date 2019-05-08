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

class screenRequestBatch extends Component{
     
    constructor(props){
        super(props); 
        this._getStocks();
        this.state = {userid:null,username:null,fullname:null,userrole:null,
            dataSource:[]
            ,refreshing: false
            ,checkboxes: []
          }; 
    }
    async componentDidMount(){ 
      this.setState({
          userid: await AsyncStorage.getItem('userid')
          ,username: await AsyncStorage.getItem('username')
          ,fullname: await AsyncStorage.getItem('fullname')
          ,userrole: await AsyncStorage.getItem('userrole')
      })
    }
    
  _getStocks = () =>{ 
    this.setState({refreshing: true}); 
    fetch('http://'+appConfig._api+'/ims/SparePartsList.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          refreshing: false,
          dataSource: responseJson,
          checkboxes: responseJson.map(x => {
            x['value'] = false;
            return x;
          }),
          fixedcheckboxes: responseJson.map(x => {
            x['value'] = false;
            return x;
          }),
        }, function() {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  _updateCheck = (item) =>{
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
            , value: !item.value },
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
            , value: !item.value },
          ...state.fixedcheckboxes.slice(index2+1),
        ],
      };
    },
    )
  }
  
  _Search = search => {
    this.setState({refreshing: true}); 
    this.setState({search: search});  
    const newData = this.state.fixedcheckboxes.filter(item => {      
      const itemData = `${item.STOCK_NAME.toUpperCase()}   
      ${item.STOCK_KEY_UNIT.toUpperCase()} `;
       const textData = search.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    sa
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
        // leftComponent={{ icon: 'camera', color: 'gray',onPress:()=>{this.props.navigation.navigate('RequestSetQty')} }}
        centerComponent={{ text: 'BATCH REQUEST', style: { color: 'gray',fontWeight:'bold', flex:1 } }}
        rightComponent={<Ionicons name='ios-arrow-round-forward'  style= {{ color: 'gray',fontWeight:'bold', fontSize:30, marginBottom:15 }} onPress={()=>{this.props.navigation.navigate('RequestSetQty',{items:this.state.fixedcheckboxes})}}></Ionicons>}
        backgroundColor='white'
        containerStyle={{
          height: 70 - 24,
          shadowOffset:{  width: 10,  height: 10,  },
          shadowColor: 'black',
          shadowOpacity: 1.0,}} /> 
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
        <ScrollView refreshControl={
                <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={()=>this._getStocks()}
                tintColor="#FFF0000"
                title="Loading.."
                color="#AF0606"
                progressBackgroundColor="#FFFF"
                /> 
          }> 
          {/* <Text>{JSON.stringify(this.state.checkboxes)}</Text> */}
          <FlatList
          data={this.state.checkboxes}
          renderItem={({ item }) => (
            <TouchableOpacity   style={{
              flex: 1,
              alignItems: 'center',
              paddingLeft:30,
              paddingRight:30,
              borderColor:!item.value?"#696969":"#70A4CB",
              borderWidth: !item.value?0.5:5,
              borderRadius:10,
              margin:5,
              backgroundColor:item.isCritical}} onPress={()=>this._updateCheck(item)} >
            <Text button style={styles.name}>{item.STOCK_NAME}</Text>
            <Text style={styles.info}> {item.STOCK_KEY_UNIT}</Text>
            <Text style={styles.description}>Critical Level for this stock is <Text style={{fontWeight:'bold'}}>{item.STOCK_CRITICAL_LEVEL}</Text></Text>
            <Text style={{fontSize:7, fontWeight:'bold',marginBottom:10}}>Remaining Stocks is {item.STOCK_QUANTITY}</Text> 
            </TouchableOpacity>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
          contentContainerStyle={{ flex: 2,}}
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
    fontSize:15,
    color: "#696969",
    fontWeight: "600",
    marginTop:5,
    textAlign:'center'
  },
  info:{
    fontSize:11,
    color: "#00BFFF",
  },
  description:{
    fontSize:7,
    color: "#696969",
    marginTop:5,
    textAlign: 'center'
  }, 
});
export default withNavigation(screenRequestBatch);