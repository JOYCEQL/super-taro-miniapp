import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';

import styles from './index.module.less';

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  return (
    <View className={styles.index}>
      <Text>Hello world!1121223 1233</Text>
    </View>
  );
}
