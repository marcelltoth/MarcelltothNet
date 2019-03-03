import * as React from 'react';
import logo from './logo.svg';
import styles from './App.module.scss';
import { Header } from './header';
import { Container } from 'reactstrap';
import { HighlightedPostHolder } from './highlighted-post-holder';

class App extends React.Component<any> {
  render() {
    return (
      <div className={styles.App}>
        <Header />
        <Container>
          <HighlightedPostHolder />
        </Container>
      </div>
    );
  }
}

export default App;
