import { PropsWithChildren } from 'react';
import { useLaunch } from '@tarojs/taro';

// import styles from './app.moudle.less';

function App({ children }: PropsWithChildren) {
  useLaunch(() => {
    console.log('App launched.');
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
