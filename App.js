import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import MapView, {Marker} from 'react-native-maps';

console.disableYellowBox = true;

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
// ];

function Item({title}) {
  return (
    <View style={{flex: 1, paddingHorizontal: 20}}>
      <View style={styles.flatList}>
        <Text style={{fontSize: 18}}>{title}</Text>
      </View>
    </View>
  );
}
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
          <FlatList
            data={this.state.markers}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    borderWidth: 1,
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    backgroundColor: '#ff5722',
  },
});
