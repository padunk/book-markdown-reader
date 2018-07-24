import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AddBook } from './components/Home/addBook';
import { BookList } from './components/Home/bookList';
import { BookListDetail } from './components/Home/bookListDetail';
import { DeleteBook } from './components/Home/deleteBook';
import { EditBook } from './components/Home/editBook';
import { NavBar } from './components/Navigation/navbar';
import { MainReader } from './components/Reader/mainReader';
import { Reader } from './components/Reader/readerDetail';
import { NotFound } from "./NotFound";

import './App.css';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <main id="main__app">
      <NavBar />
      <div className="app">
        <Switch>
        <Route exact={true} path='/' component = { BookList } />
          <Route exact={true} path='/reader/' component = { MainReader } />
          <Route exact={true} path='/reader/:book/:chapter' component= { Reader } />
          <Route exact={true} path='/book/:detail' component = { BookListDetail } />
          <Route exact={true} path='/newbook/add' component = { AddBook } />
          <Route exact={true} path='/editbook/:title' component = { EditBook } />
          <Route exact={true} path='/deletebook/:title' component = { DeleteBook } />
          <Route component = { NotFound } />
        </Switch>
      </div>
      </main>
    );
  }
}

export default App;
