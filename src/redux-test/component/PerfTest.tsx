import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {add} from '../store/actions';
import {Pressable, Text, View} from 'react-native';

const ITERATION_COUNT = 40000;
let timerId: number | undefined;
interface PerfTestProps {
  add: (amount: number) => void;
}

const PerfTest = ({add}: PerfTestProps) => {
  const [result, setResult] = React.useState<string>('-');
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  function runPerfTest() {
    setIsDisabled(true);
    const timeStart = performance.now();

    timerId = setInterval(() => {
      for (let i = 0; i <= ITERATION_COUNT; i++) {
        add(100);
        i++;
      }

      clearInterval(timerId);
      const timeEnd = performance.now();
      setResult(` ${Math.round(timeEnd - timeStart)} milliseconds`);
      setIsDisabled(false);
    });
  }

  return (
    <View>
      <Pressable
        style={{
          padding: 12,
          backgroundColor: 'yellow',
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        disabled={isDisabled}
        onPress={runPerfTest}>
        <Text> Run performance test</Text>
      </Pressable>
      <Text>{` Test case: Add balance(+100$) ${ITERATION_COUNT} times`}</Text>
      <Text>Redux Result: {result}</Text>
    </View>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  add: (amount: number) => dispatch(add(amount)),
});

export default connect(null, mapDispatchToProps)(PerfTest);
