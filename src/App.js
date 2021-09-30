import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import EmployeesContextProvider from './context/EmployeesContext';
import UpdatedEmployeesList from './pages/UpdatedEmployeesList'
import DeletedEmployeesList from './pages/DeletedEmployeesList'
import Grid from './pages/Grid'
import Navbar from './components/Navbar'
import Error from './pages/Error'


const App = () => {


  return (
    <Router>
      <EmployeesContextProvider>
        <Navbar/>
        <Switch>
          <Route exact path='/'>
            <Grid/>
          </Route>
          <Route path='/updated'>
            <UpdatedEmployeesList/>
          </Route>
          <Route path='/deleted'>
            <DeletedEmployeesList/>
          </Route>
          <Route path='*'>
            <Error/>
          </Route>
        </Switch>
      </EmployeesContextProvider>
    </Router>
  )
};

export default App;