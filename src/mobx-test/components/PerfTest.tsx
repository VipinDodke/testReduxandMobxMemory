import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {BalanceState} from '../state/BalanceState';
import {Pressable, Text, View} from 'react-native';

const ITERATION_COUNT = 40000;
let timerId: number | undefined;



interface PerfTestProps {
  balanceState: BalanceState;
}

export const PerfTest: React.FC<PerfTestProps> = observer(({balanceState}) => {
  const [result, setResult] = React.useState<string>('-');
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  function runPerfTest() {
    setIsDisabled(true);
    const timeStart = performance.now();

    timerId = setInterval(() => {
      for (let i = 0; i <= ITERATION_COUNT; i++) {
        balanceState.add(100);
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
        disabled={isDisabled}
        onPress={runPerfTest}
        style={{
          padding: 12,
          backgroundColor: 'red',
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}> Run performance test</Text>
      </Pressable>

      <Text>{` Test case: Add balance(+100$) ${ITERATION_COUNT} times`}</Text>
      <Text>MobX Result: {result}</Text>
    </View>
  );
});
