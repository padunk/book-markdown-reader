import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    {/*tslint:disable-next-line jsx-no-lambda*/}
    <Route render={ ({ location }:{[key:string]:any}) => (
      <App location={location} />
    )} />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
