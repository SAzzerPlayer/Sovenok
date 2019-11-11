import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HeaderBarMenu from './components/HeaderBarMenu/HeaderBarMenu';
import Page404 from './routes/404Page/404Page';
import BottomBarMenu from './components/BottomBarMenu/BottomBarMenu';
import IndexPage from './routes/IndexPage/IndexPage';
import LoginPage from './routes/LoginPage/LoginPage';
import RegistrationPage from './routes/RegistrationPage/RegistrationPage';
import classes from './App.css';

class InKey extends React.Component{
  render(){
    return <div className={classes.App}>
      <HeaderBarMenu/>
      <Switch>
        <Route exact path={"/"} component={IndexPage}/>
        <Route exact path={"/login"} component={LoginPage}/>
        <Route exact path={"/registration"} component={RegistrationPage}/>
        <Route component={Page404}/>
      </Switch>
      <BottomBarMenu/>
    </div>
  }
}
const App = InKey;
export default App;
