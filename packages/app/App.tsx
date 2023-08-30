import {SHARED_VARIABLE} from '@share/common';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';

const App = () => {
  return (
    <SafeAreaView>
      <Text>{SHARED_VARIABLE}</Text>
    </SafeAreaView>
  );
};

export default App;
