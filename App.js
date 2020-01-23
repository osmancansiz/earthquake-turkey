import React, {Component} from 'react';
import {View, Text, ActivityIndicator, YellowBox} from 'react-native';
import axios from 'axios';
import MapView, {Marker} from 'react-native-maps';

console.disableYellowBox = true;

export default class App extends Component {
  state = {
    markers: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get('https://api.orhanaydogdu.com.tr/deprem/live.php', {})
      .then(obj => {
        for (let index = 0; index < obj.data.result.length; index++) {
          this.setState({
            markers: [
              ...this.state.markers,
              {
                title:
                  obj.data.result[index].title +
                  ' ' +
                  obj.data.result[index].mag,
                coordinates: {
                  latitude: obj.data.result[index].lat,
                  longitude: obj.data.result[index].lng,
                },
              },
            ],
            loading: false,
          });
        }
      });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.5}}>
          <MapView
            style={{width: '100%', height: '100%'}}
            initialRegion={{
              latitude: 38.9977645,
              longitude: 34.7361951,
              latitudeDelta: 8,
              longitudeDelta: 20,
            }}
            mapType="hybrid">
            {this.state.markers.map(marker => (
              <MapView.Marker
                coordinate={marker.coordinates}
                title={marker.title}
              />
            ))}
          </MapView>
        </View>
        <View style={{flex: 0.5}}>
          <ActivityIndicator animating={this.state.loading} size="large" />
        </View>
      </View>
    );
  }
}
