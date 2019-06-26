

import React, {Component} from 'react';

import {
  ActivityIndicator,
  AsyncStorage,
  Alert,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Icon,
  Text,  
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  FlatList,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,

} from 'react-native';
  
import {withNavigation} from 'react-navigation'; 
import * as appConfig from '../appConfig';
import { SearchBar } from 'react-native-elements'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';

class screen_Stocks extends Component{ 
  constructor() {  
    super();
    
    this._getStocks();
    this.state = { 
      dataSource:[]
      ,fixedSource:[]
      ,refreshing: false
      ,userid:null
      ,username:null
      ,fullname:null
      ,userrole:null
      ,search: ''
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
      })
  }

  setModalVisible(visible,item) {
    this.setState({modalVisible: visible,item});
  }
  static navigationOptions={
    header:null
  }
 
  _getStocks = () =>{ 
    this.setState({refreshing: true}); 
    fetch('http://'+appConfig._api+'/ims/SparePartsList.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          refreshing: false,
          fixedSource: responseJson,
          dataSource: responseJson
        }, function() {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } 
  _Search = search => {
    this.setState({refreshing: true}); 
    this.setState({search: search});  
    const newData = this.state.fixedSource.filter(item => {      
      const itemData = `${item.STOCK_NAME.toUpperCase()}   
      ${item.STOCK_KEY_UNIT.toUpperCase()} `;
       const textData = search.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    sa
    });    
    this.setState({ dataSource: newData,refreshing: false});   
  };
  render(){
    return(
      <View style={styles.container}> 
      <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({modalVisible:!this.state.modalVisible})}
          transparent={true}>
          <View style={{
             marginTop: '70%', 
             borderRadius:65,
             marginBottom:'-15%',

             flex:1,
             backgroundColor:'white',
             justifyContent:'center',
             alignItems:'center', }}> 
            
              <Text style={{
                fontWeight:'bold',
                fontSize:40,
                textAlign:'center', 
                margin:10
                }}>{this.state.item.STOCK_NAME}</Text>
                
              <Text style={{
                fontWeight:'bold',
                fontSize:20,
                textAlign:'center',
                }}>{this.state.item.STOCK_KEY_UNIT} - {this.state.item.CON_NAME}</Text>
              
              <Text style={{ 
                  fontSize:12,
                  textAlign:'center',
                  marginBottom:10
                  }}>{(this.state.item.STOCK_BRAND)?this.state.item.STOCK_BRAND:'None'} / {(this.state.item.STOCK_MODEL)?this.state.item.STOCK_MODEL:'None'}</Text>

              <Text style={{ 
                  fontSize:12,
                  textAlign:'center',
                  marginLeft:40,
                  marginRight:40
                }}>
                Critical Level for this stock is <Text style={{fontWeight:'bold'}}>{this.state.item.STOCK_CRITICAL_LEVEL+'. '}</Text>
                Remaining Stocks is {this.state.item.STOCK_QUANTITY+'. '}
                The Stock Size of {this.state.item.STOCK_NAME} is {this.state.item.STOCK_SIZE+'. '}  
                The Supplier of {this.state.item.STOCK_NAME} is {this.state.item.SUP_NAME+'. '} 
              
              </Text> 

              <TouchableOpacity  
                onPress={() => {
                  this.setState({modalVisible:!this.state.modalVisible});
                }}
                style={{
                  position: 'absolute',
                  bottom:0,
                  flex: 1,
                  backgroundColor:"pink",
                  justifyContent: 'flex-end', 
                  alignItems:'center', 
                  width:'90%', 
                  padding:20,
                  marginBottom:75,
                  borderRadius:20
                  }}>
                  <Text style={{fontWeight:'bold',fontSize:15}}>Close</Text>
              </TouchableOpacity > 
              
          </View>
        </Modal> 
      <View >
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
      </View>
      
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
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <TouchableOpacity   style={{
              flex: 1,
              alignItems: 'center',
              paddingLeft:30,
              paddingRight:30,
              borderColor:'#696969',
              borderWidth:.3,
              borderRadius:10,
              margin:5,
              backgroundColor:item.isCritical}} 
              onPress={() => {
                this.setModalVisible(true,item);
              }}>
            <Text button style={styles.name}>{item.STOCK_NAME}</Text>
            <Text style={styles.info}> {item.STOCK_KEY_UNIT}</Text>
            <Text style={styles.description}>Critical Level for this stock is <Text style={{fontWeight:'bold'}}>{item.STOCK_CRITICAL_LEVEL}</Text></Text>
            <Text style={{fontSize:7, fontWeight:'bold',marginBottom:10}}>Remaining Stocks is {item.STOCK_QUANTITY}</Text> 
            </TouchableOpacity>
          )}
          //Setting the number of column
          numColumns={2}
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
export default withNavigation(screen_Stocks);