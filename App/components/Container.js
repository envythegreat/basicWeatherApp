import React from "react";
import { View, StyleSheet } from "react-native";
import {ImageBackground } from 'react-native';

let now = new Date(),
    hour = now.getHours();
let BackImage = '';
let morning   = (hour >= 4  && hour <= 11),
    afternoon = (hour >= 12 && hour <= 16),
    evening   = (hour >= 17 && hour <= 20),
    night     = (hour >= 21 || hour <= 3);
if(morning) {
  BackImage = require('../assets/day.jpg')
} else if (afternoon) {
  BackImage = require('../assets/afternoonr.jpg')
} else if(evening){
  BackImage = require('../assets/dawn.jpg')
} else if (night){
  BackImage = require('../assets/night.jpg')
}

export const Container = ({ children }) => (
  <View style={{ flex: 1, backgroundColor: "#3145b7",  }}>
    <ImageBackground source={BackImage} style={styles.backgroundImage} >
      {children}
    </ImageBackground>
  </View>
);
let styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
    }
});

