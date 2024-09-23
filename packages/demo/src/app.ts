import { PropsWithChildren, useEffect } from 'react';
import { useLaunch } from '@tarojs/taro';

// import styles from './app.moudle.less';

function App({ children }: PropsWithChildren) {
  useEffect(() => {
    console.log('App launched.');
  }, []);

  // children 是将要会渲染的页面
  return children;
}

export default App;
