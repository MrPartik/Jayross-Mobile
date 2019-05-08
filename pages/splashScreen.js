import React, {Component} from 'react';

import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    Icon,
    Image,
    Text,
    Animated,
  } from 'react-native';
  
  class FadeInView extends Component {
    state = {
      fadeAnim: new Animated.Value(0),   
    }
  
    componentDidMount() {
      Animated.timing(                   
        this.state.fadeAnim,            
        {
          toValue: 1,                     
          duration: 1000,            
        }
      ).start();                      
    }
  
    render() {
      let { fadeAnim } = this.state;
  
      return (
        <Animated.View                
          style={{
            ...this.props.style,
            opacity: fadeAnim,         
          }}
        >
          {this.props.children}
        </Animated.View>
      );
    }
  }

  export default class splashScreen extends Component{
    constructor() {
        super();
        
        this.state = {
          animating: false,
          align: 'center',
          alignsecond: false,
      } 
        setTimeout(
          () =>
            this.setState({ align: 'flex-start' }, function() { 
              this.setState({
                alignsecond: true, 
              });
            }),
          2000
        );
      }
      render(){
          return(
            <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: this.state.align,  
              backgroundColor:'white'
            }}>
            <Image
              source={{
                uri:
                  'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Bus-512.png',
              }}
              style={{ width: 150, height: 150, marginLeft:20}}
            />
            {!this.state.alignsecond ? null : (
              <FadeInView style={{ margin: 10 }}>
                <Text
                  style={{ color: '#114998', fontSize: 30, width:150, fontWeight: 'bold' }}>
                  Jayross Lucky Seven
                </Text>
              </FadeInView>
            )}
          </View>
          )
      }
  }