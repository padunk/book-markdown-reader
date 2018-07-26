import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition} from 'react-transition-group';
import TransitionGroup from 'react-transition-group/TransitionGroup';

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

interface IAppProp {
  location: {
    key: any;
  }
}

class App extends React.Component<IAppProp, {}> {
  constructor(props:IAppProp) {
    super(props);
  }

  public render() {
    return (
      <main id="main__app">
      <NavBar />
      <div className="app">
        <TransitionGroup className='app__transGroup'>
          <CSSTransition
            key={this.props.location.key}
            classNames='fade'
            timeout={{ enter:650, exit: 300}}
            appear={true}
            in={true}
            mountOnEnter={true}
            unmountOnExit={true}
          >
            <Switch location={this.props.location}>
              <Route exact={true} path='/' component = { BookList } />
              <Route exact={true} path='/reader/' component = { MainReader } />
              <Route exact={true} path='/reader/:book/:chapter' component= { Reader } />
              <Route exact={true} path='/book/:detail' component = { BookListDetail } />
              <Route exact={true} path='/newbook/add' component = { AddBook } />
              <Route exact={true} path='/editbook/:title' component = { EditBook } />
              <Route exact={true} path='/deletebook/:title' component = { DeleteBook } />
              <Route component = { NotFound } />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
      </main>
    );
  }
}

export default App;
