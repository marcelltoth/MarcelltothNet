import * as React from 'react';
import styles from './App.module.scss';
import { Header } from './header';
import { Container } from 'reactstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/home/home-page';
import { NotFoundPage } from './pages/not-found';

class App extends React.Component<any> {
  render() {
    return (
      <div className={styles.App}>
        <Header />
        <Container>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route component={NotFoundPage} />
            </Switch>
          </BrowserRouter>
        </Container>
      </div>
    );
  }
}

export default App;
