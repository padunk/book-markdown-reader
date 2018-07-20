import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { BookList } from './components/Home/bookList';
import { BookListDetail } from './components/Home/bookListDetail';
import { Home } from './components/Home/home';
import { NavBar } from './components/Navigation/navbar';
import { MainReader } from './components/Reader/mainReader';
import { NotFound } from "./NotFound";

import './App.css';

interface IMainState {
  mdURL: string;
}

class App extends React.Component<{}, IMainState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      mdURL: 'https://raw.githubusercontent.com/getify/Functional-Light-JS/master/manuscript/ch1.md',
    }
  }

  public handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ mdURL: e.currentTarget.value });
  }

  public homeComp = () => {
    return <Home mdURL={this.state.mdURL} handleChange={this.handleChange} />;
  }

  public readerComp = () => {
    return <MainReader mdURL={this.state.mdURL} />;
  }

  public render() {
    return (
      <main id="main__app">
      <NavBar />
      <div className="app">
        <Switch>
          <Route exact={true} path='/' component = {this.homeComp} />} />
          <Route exact={true} path='/reader/' component = { this.readerComp } />
          <Route exact={true} path='/booklist' component = { BookList } />
          <Route exact={true} path='/booklist/:detail' component = { BookListDetail } />
          <Route component = { NotFound } />
        </Switch>
      </div>
      </main>
    );
  }
}

export default App;
