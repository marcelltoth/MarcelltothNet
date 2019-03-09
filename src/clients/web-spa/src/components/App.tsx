import * as React from 'react';
import styles from './App.module.scss';
import { Header } from './header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomePage, NotFoundPage, ArticlePage } from './pages';

class App extends React.Component<any> {
  render() {
    return (
      <div className={styles.App}>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/article/:id" component={ArticlePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
