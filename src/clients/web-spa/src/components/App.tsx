import * as React from 'react';
import styles from './app.module.scss';
import { Header } from './header';
import { Switch, Route } from 'react-router-dom';
import * as Pages from './pages';
import { Footer } from './footer';

import {portfolioPages} from './pages/static';

class App extends React.Component<any> {
  render() {
    return (
      <div className={styles.App}>
          <Header />
          <Switch>
            <Route path="/" exact component={Pages.HomePage} />
            <Route path="/privacy-policy" exact component={Pages.PrivacyPolicyPage} />
            <Route path="/contact" exact component={Pages.ContactPage} />
            {Object.entries(portfolioPages).map(([name, component]) => <Route key={name} path={`/portfolio/${name}`} exact component={component} />)}
            <Route path="/article/:id" component={Pages.ArticlePage} />
            <Route path="/tag/:id" component={Pages.TagPage} />
            <Route component={Pages.NotFoundPage} />
          </Switch>
          <Footer />
      </div>
    );
  }
}

export default App;
