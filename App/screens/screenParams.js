import React from 'react';
import Detail from './Details';
import Search from './Search';
import { TouchableOpacity, Image, StatusBar } from 'react-native';

const headerStyles = {
    backgroundColor: 'transparent',
    height: 100,
}


const HeaderRightButton = ({ onPress, style, icon }) => (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[
          {
            marginRight: 10,
            width: 25,
            height: 25,
            tintColor: '#fff',
          },
          style,
        ]}
      />
    </TouchableOpacity>
);

export default ScreenParams = {

    DetailScreen : {
        screen: Detail,
        navigationOptions: ({ navigation }) => ({
          headerTitle: navigation.getParam('title', 'Weather Details'),
          headerRight: () => (
            <React.Fragment>
              <StatusBar barStyle="light-content" />
              <HeaderRightButton
                icon={require('../assets/look.png')}
                onPress={() => navigation.navigate('Search')}
                style={{width: 35, height:35}}
              />
            </React.Fragment>
          ),
          headerLeft: () => (
            <React.Fragment>
                <StatusBar barStyle="light-content" />
                <HeaderRightButton
                  icon={require('../assets/position.png')}
                  onPress={() => navigation.navigate('Search')}
                  style={{marginLeft: 10, width: 30, height:30}}
                />
              </React.Fragment>
          ),
          headerStyle: headerStyles,
          headerTransparent: {
            position: 'absolute',
          },
          headerTintColor: '#fff',
        }),
    },


    SearchScreen : {
        screen: Search,
        navigationOptions: ({ navigation }) => ({
          headerTitle: 'Search',
          headerRight: () => (
            <React.Fragment>
              <StatusBar barStyle="dark-content" />
              <HeaderRightButton
                icon={require('../assets/close.png')}
                onPress={() => navigation.pop()}
                style={{tintColor: '#aaa',}}
              />
            </React.Fragment>
          ),
          headerLeft: null,
          headerStyle: headerStyles,
          headerTransparent: {
            position: 'absolute',
          },
          headerTintColor: '#aaa',
        }),
      }
      
}