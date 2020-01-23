import React, { Component } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import MapView,{Marker} from 'react-native-maps';

export default class App extends Component {
  
    
   state = {
    markers:[]
  }

  componentDidMount(){

    axios.get('https://api.orhanaydogdu.com.tr/deprem/live.php', {
  }).then(obj => {
    for (let index = 0; index < obj.data.result.length; index++) {
      this.setState({
        markers:[...this.state.markers,{
          title: obj.data.result[index].title +' '+obj.data.result[index].mag ,
          coordinates: {
            latitude:obj.data.result[index].lat ,
            longitude: obj.data.result[index].lng
          },
        }]
      })
      
    }
    console.log(this.state.markers)
      
  })

  }
  render() {
    return (
      <View style={{flex:1}}>
<MapView style={{width:'100%',height:'100%'}}
  initialRegion={{
    latitude: 38.9977645,
    longitude: 34.7361951,
    latitudeDelta: 5,
    longitudeDelta: 15,
  }}
>
  {this.state.markers.map(marker => (
    <MapView.Marker 
      coordinate={marker.coordinates}
      title={marker.title}
    
    />
  ))}
</MapView>
      </View>
    );
  }
}
