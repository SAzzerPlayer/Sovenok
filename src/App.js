import React from 'react';

import HeaderBarMenu from './components/HeaderBarMenu/HeaderBarMenu';
import WorkContainer from './container/WorkContainer/WorkContainer';
import classes from './App.css';

class InKey extends React.Component{
  render(){
    return <div className={classes.App}>
      <HeaderBarMenu/>
        <WorkContainer>
          <p>Hello3213123</p>
          <p>Hello3213123</p>
          <p>Hello3213123</p>
          <p>Hello3213123</p>
          <p>Hello3213123</p>
          <p>Hello3213123</p>
          <p>Hello3213123</p>
          <p>Hello3213123</p>
          <p>Hello3213123</p>
          <p>Hello3213123</p>
          <p>Hello3213123</p>
        </WorkContainer>
    </div>
  }
}
const App = InKey;
export default App;
