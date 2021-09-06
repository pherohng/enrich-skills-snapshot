import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'bootstrap';
import 'line-awesome/dist/line-awesome/scss/line-awesome.scss';
import './style/main.scss';
import reducers from './reducers';
import App from './components/App';
import Photos from './components/Photos';
import PhotoDetails from './components/PhotoDetails';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import ActionConnector from './components/ActionConnector';
import ResetPassword from './components/ResetPassword';
import UserDetails from './components/UserDetails';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <App>
          <Route path="/" exact>
            <Redirect to="/photos" />
          </Route>
          <Switch>
            <Route path="/photos/:id" component={PhotoDetails} />
            <Route path="/photos" component={Photos} />
          </Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/action" component={ActionConnector} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/my-account" component={UserDetails} />
        </App>
      </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
