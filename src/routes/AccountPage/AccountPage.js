import React from 'react';
import {Grid,Divider} from '@material-ui/core';
import AccountContainer from '../../container/AccountContainer/AccountContainer';
import BooksCarousel from '../../container/BooksCarousel/BooksCarousel';
import BookInfo from '../../components/BookInfo/BookInfo';
import PageListSwitcher from '../../components/PageListSwitcher/PageListSwitcher';
import classes from './AccountPage.css';
class AccountPage extends React.Component{
    render(){
        return(
            <AccountContainer>
                <Grid container item xs
                      className={classes.Table}
                    direction={"column"}
                      alignItems={"center"}
                      spacing={4}
                >
                    <BooksCarousel title={"Книги избранных авторов"}/>
                    <Grid container item xs
                        direction={"column"}
                          spacing={3}
                    >
                        <h3>Моя библиотека: </h3>
                        <Divider/>
                        <Grid item xs><BookInfo/><br/><Divider/></Grid>
                        <Grid item xs><BookInfo/><br/><Divider/></Grid>
                        <Grid item xs><BookInfo/><br/><Divider/></Grid>
                        <Grid item xs><BookInfo/><br/><Divider/></Grid>
                        <Grid item xs><BookInfo/><br/><Divider/></Grid>
                        <Grid item xs><BookInfo/><br/><Divider/></Grid>
                        <PageListSwitcher ShowText={true}/>
                    </Grid>
                </Grid>
            </AccountContainer>
        );
    }
}

export default AccountPage;