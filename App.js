import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ScreenParams from './App/screens/screenParams';



const AppStack = createStackNavigator(
  {
    Detail: ScreenParams.DetailScreen,
    Search: ScreenParams.SearchScreen
  },
  {
    mode: 'modal',
  }
);

export default createAppContainer(AppStack);