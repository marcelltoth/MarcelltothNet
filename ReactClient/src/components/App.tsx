import * as React from 'react';
import logo from './logo.svg';
import styles from './App.module.scss';
import { Header } from './header';

class App extends React.Component<any> {
  render() {
    return (
      <div className={styles.App}>
        <Header />
      </div>
    );
  }
}

export default App;
