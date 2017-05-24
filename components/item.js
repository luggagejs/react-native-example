import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Forecast extends Component {
  render() {
    return (
      <View>
        <ScrollView automaticallyAdjustContentInsets={false} scrollEventThrottle={200} style={styles.scrollView}> {THUMB_URLS.map(createThumbRow)} </ScrollView>
        <Text style={styles.bigText}>
          {this.props.main}
        </Text>
        <Text style={styles.mainText}>
          <Em>
            Current conditions: 
          </Em>
          <Strong>
            {this.props.description}
          </Strong>
        </Text>
        <Text style={styles.bigText}>
          {this.props.temp}°F
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff'
    flex: 1
  },
  bigText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  },
  mainText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff'
  }
});
