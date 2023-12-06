import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux-test/store/store';
import PerfTest from './src/redux-test/component/PerfTest';
import {PerfTest as MobxPerfTest} from './src/mobx-test/components/PerfTest';
import {BalanceState} from './src/mobx-test/state/BalanceState';

const balanceState = new BalanceState();

function TestMemory() {
  return (
    <Provider store={store}>
      <View style={styles.mainContainer}>
        <Text>TestMemory</Text>
        <Text>Redux-Test</Text>
        <PerfTest />
        <Text>{'\n\n'}</Text>
        <Text>Mobx-Test</Text>
        <MobxPerfTest balanceState={balanceState} />
      </View>
    </Provider>
  );
}

export default TestMemory;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
