import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Person } from './components/Person';
import { PersonsAll } from './components/PersonsAll';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout >
        <Route exact path='/' component={Home} />
        <Route path='/Person' component={Person} />
        <Route path='/PersonsAll' component={PersonsAll} />
      </Layout>
    );
  }
}
