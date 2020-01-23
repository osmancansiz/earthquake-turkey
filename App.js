import React, { Component } from 'react';
import { View, Text } from 'react-native';

import MapView,{Marker} from 'react-native-maps';

export default class App extends Component {
  
    
    state = {
        region: {
            latitude:40.9695026,
            longitude: 29.1015871,
            latitudeDelta: 5,
            longitudeDelta: 5,
          },
    };


  render() {
    return (
      <View style={{flex:1}}>
       <MapView style={{width:'100%',height:'100%'}}
    region={this.state.region}
  
    
  >

<Marker
      coordinate={this.state.region}
    />
  </MapView>

      </View>
    );
  }
}
