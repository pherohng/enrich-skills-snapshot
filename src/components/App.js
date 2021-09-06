import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { listenOnAuthStateChanged } from '../services';
import { fetchUserDetails } from '../actions';
import LoadingSpinner from './common/LoadingSpinner';
import TopNav from './common/TopNav';
import Header from './common/Header';

const App = ({ children, fetchUserDetails }) => {
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = listenOnAuthStateChanged((user) => {
      const userId = user ? user.uid : null;

      if (userId) {
        localStorage.setItem('userId', userId);
      } else {
        localStorage.removeItem('userId');
      }

      if (history.location.pathname === '/signup') {
        return;
      }

      if (history.location.pathname === '/signin') {
        fetchUserDetails(userId, () => {
          history.push('/');
        });
      } else {
        fetchUserDetails(userId);
      }

      if (history.location.pathname === '/my-account' && !user) {
        history.push('/');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [history, fetchUserDetails]);

  return (
    <React.Fragment>
      <LoadingSpinner />
      <TopNav />
      <Header />

      {children}
    </React.Fragment>
  );
};

export default connect(
  null,
  { fetchUserDetails }
)(App);
