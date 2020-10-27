import React from 'react';
import './App.css';
import Month from './components/month/Month';
import AuthState from './context/auth/AuthState';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/layout/Layout';

function App() {
  return (
    <AuthState>
      <Router>
        <Switch>
          <Layout>
            <Route exact path='/' component={Month} />
            <Route exact path='/login' component={Login} />
          </Layout>
        </Switch>
      </Router>
    </AuthState>
  );
}
export default App;
