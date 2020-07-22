/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  YellowBox,
} from 'react-native';
import Home from './src/components/Home';
import { Root } from 'native-base';

YellowBox.ignoreWarnings(['Animated: `useNativeDriver` was not specified.'])

export default class App extends Component {
  render(){ 
    return (
      <Root>
         <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.safeAreaView}>
            <Home/>
          </SafeAreaView>
      </Root>
    );
  }
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex:1
  }
});
