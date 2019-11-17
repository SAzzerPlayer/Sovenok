import React from 'react';
import {Grid,Divider} from '@material-ui/core';
import classes from './AuthorsPage.css';
import RecommendContainer from '../../container/RecommendContainer/RecommendContainer';
import AuthorsQuadroList from '../../components/AuthorsQuadroList/AuthorsQuadroList';

class AuthorsPage extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(
            <RecommendContainer>
                <Grid className={classes.Table} container item xs direction={"column"} spacing={1}>
                    <Divider/>
                    <AuthorsQuadroList title={"Популярные"}/>
                    <Divider/>
                    <AuthorsQuadroList title={"Новички"}/>
                    <Divider/>
                    <AuthorsQuadroList title={"Мастера жанра"} withGenres={true}/>
                    <Divider/>
                </Grid>
            </RecommendContainer>
        );
    }
}

export default AuthorsPage;