import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const myApp = React.createElement(App)
  ReactDOM.render(myApp, div);
  ReactDOM.unmountComponentAtNode(div);
});
