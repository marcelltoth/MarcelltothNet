import * as React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from './components/navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ArticleListPage } from './components/articles/list-page';
import { Container } from 'reactstrap';
import { ArticleEditPage } from './components/articles/edit-page';
import { FileListPage } from './components/static-files/file-list-page';

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Navbar />
          <Container>
            <Switch>
              <Route path="/articles/:id" component={ArticleEditPage} />
              <Route path="/articles" component={ArticleListPage} />
              <Route path="/static-files" component={FileListPage} />
            </Switch>
          </Container>
        </>
      </BrowserRouter>
    );
  }
}