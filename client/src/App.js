import React from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import './App.css';
import Month from './components/month/Month';
import AuthState from './context/auth/AuthState';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/layout/Layout';

const queryCache = new QueryCache()

function App() {
  return (
    <AuthState>
      <Router>
        <Switch>
          <Layout>
            <ReactQueryCacheProvider>
              <Route exact path='/' component={Month} />
              <Route exact path='/login' component={Login} />
            </ReactQueryCacheProvider>
          </Layout>
        </Switch>
      </Router>
      <ReactQueryDevtools initialIsOpen />
    </AuthState>
  );
}
export default App;
