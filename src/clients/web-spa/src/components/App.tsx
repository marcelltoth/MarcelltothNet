import * as React from 'react';
import styles from './app.module.scss';
import { Header } from './header';
import { Switch, Route } from 'react-router-dom';
import { HomePage, NotFoundPage, ArticlePage, TagPage } from './pages';
import { Footer } from './footer';

class App extends React.Component<any> {
  render() {
    return (
      <div className={styles.App}>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/article/:id" component={ArticlePage} />
            <Route path="/tag/:id" component={TagPage} />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
      </div>
    );
  }
}

export default App;
