import * as React from 'react';
import styles from './app.module.scss';
import { Header } from './header';
import { Switch, Route } from 'react-router-dom';
import * as Pages from './pages';
import { Footer } from './footer';

import {portfolioPages} from './pages/static';
import { ApplicationState } from '../store/state';
import { selectBaiscDataLoaded } from '../store/selectors';
import { connect } from 'react-redux';
import { Loader } from './loader';

interface StateProps{
  isLoaded: boolean;
}

type AppProps = StateProps;

const AppImpl : React.FC<AppProps> = ({isLoaded}) => {
  return (
    <div className={styles.App}>
        <Header />
        {isLoaded ? 
          <Switch>
            <Route path="/" exact component={Pages.HomePage} />
            <Route path="/privacy-policy" exact component={Pages.PrivacyPolicyPage} />
            <Route path="/contact" exact component={Pages.ContactPage} />
            {Object.entries(portfolioPages).map(([name, component]) => <Route key={name} path={`/portfolio/${name}`} exact component={component} />)}
            <Route path="/article/:id" component={Pages.ArticlePage} />
            <Route path="/tag/:id" component={Pages.TagPage} />
            <Route component={Pages.NotFoundPage} />
          </Switch>
          : <Loader />}
        <Footer />
    </div>
  );
}

const mapStateToProps = (state: ApplicationState) : StateProps => {
  return {
    isLoaded: selectBaiscDataLoaded(state)
  };
};

export default connect(mapStateToProps, undefined, undefined, {pure: false})(AppImpl);