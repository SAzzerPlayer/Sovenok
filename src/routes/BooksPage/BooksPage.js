import React from 'react';
import {Divider, Grid} from '@material-ui/core';
import WorkContainer from '../../container/WorkContainer/WorkContainer';
import {NavLink} from 'react-router-dom';
import BookInfo from '../../components/BookInfo/BookInfo';
import BooksKeyWords from '../../components/BooksKeyWords/BooksKeyWords';
import PageListSwitcher from '../../components/PageListSwitcher/PageListSwitcher';
import BooksSortBy from '../../components/BooksSortBy/BooksSortBy';
import classes from './BooksPage.css';
class BooksPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        const BookItem = () => {return (
            <React.Fragment>
            <Divider/>
            <BookInfo/>
            <br/>
            </React.Fragment>
        );};
        return(
            <WorkContainer>
                <Grid container item
                      style={{marginTop:20}}
                      direction={"row"}
                      justify={"space-between"}
                      xs={12}
                >
                    <Grid item xs={8} className={classes.Table} style={{backgroundColor: "snow",padding:15}} spacing={2}>
                        <h1>Фантастика</h1>
                        <BooksSortBy/>
                        <h2>Перечень книг:</h2>
                        <BookItem/>
                        <BookItem/>
                        <BookItem/>
                        <BookItem/>
                        <BookItem/>
                        <BookItem/>
                        <PageListSwitcher ShowText={true}/>
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={3} className={classes.Table} style={{backgroundColor:"snow",padding:10}} >
                        <h2>Подборка книг по <span style={{color:"skyblue"}}>ключевым</span> словам:</h2>
                        <BooksKeyWords/>
                        <PageListSwitcher ShowText={false}/>
                    </Grid>
                </Grid>
            </WorkContainer>
        );
    }

}

export default BooksPage;