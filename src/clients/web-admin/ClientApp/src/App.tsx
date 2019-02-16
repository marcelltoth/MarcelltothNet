import * as React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from './components/navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ArticlesPage } from './components/articles/page';

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Navbar />
          <Switch>
            <Route path="/articles" component={ArticlesPage} />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}