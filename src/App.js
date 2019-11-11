import React from 'react';

import HeaderBarMenu from './components/HeaderBarMenu/HeaderBarMenu';
import WorkContainer from './container/WorkContainer/WorkContainer';
import MainInfoTable from "./components/MainInfoTable/MainInfoTable";
import BooksCarousel from './container/BooksCarousel/BooksCarousel';
import BooksKeyWords from './components/BooksKeyWords/BooksKeyWords';
import {Grid,Divider} from '@material-ui/core';

import classes from './App.css';

class InKey extends React.Component{
  render(){
    return <div className={classes.App}>
      <HeaderBarMenu/>
        <WorkContainer>
          <MainInfoTable/>
          <Grid container item
                style={{marginTop:20}}
                direction={"row"}
                justify={"space-between"}
                xs={12}
          >
            <Grid item xs={8} className={classes.Table} style={{backgroundColor: "snow",padding:4}} spacing={2}>
              <h2>Подборки книг по разным критериям:</h2>
              <Divider/>
              <BooksCarousel/>
              <BooksCarousel/>
              <BooksCarousel/>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={3} className={classes.Table} style={{backgroundColor:"snow",padding:4}} >
              <h2>Подборка книг по ключевым словам:</h2>
              <BooksKeyWords/>
            </Grid>
          </Grid>
        </WorkContainer>
    </div>
  }
}
const App = InKey;
export default App;
