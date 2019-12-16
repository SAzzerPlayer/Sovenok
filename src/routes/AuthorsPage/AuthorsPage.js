import React from 'react';
import {Grid,Divider} from '@material-ui/core';
import classes from './AuthorsPage.css';
import RecommendContainer from '../../container/RecommendContainer/RecommendContainer';
import AuthorsQuadroList from '../../components/AuthorsQuadroList/AuthorsQuadroList';

class AuthorsPage extends React.Component{
    constructor(props){
        super(props);

        this.state={
            RateAuthors:[],
            NewAuthors:[],
            MasterAuthors:[],
            genre: "Фантастика",
            isLoaded : false
        };
    }
    componentDidMount(){
        fetch("http://91.231.86.36/authors/get/?master="+this.state.genre)
            .then((response)=>{return response.json();})
            .then((responseJSON) => this.setState({
                RateAuthors:responseJSON.TopAuthors || [],
                NewAuthors:responseJSON.NewAuthors || [],
                MasterAuthors:responseJSON.MasterAuthors || [],
                isLoaded : true
            }));
    }
    render(){
        return(
            <RecommendContainer>
                <Grid className={classes.Table} container item xs direction={"column"} spacing={1}>
                    <Divider/>
                    {this.state.isLoaded && <AuthorsQuadroList title={"Популярные"} datas={this.state.RateAuthors} onChangeMaster={(obj)=>{}}/>}
                    <Divider/>
                    {this.state.isLoaded && <AuthorsQuadroList title={"Новички"} datas={this.state.NewAuthors} onChangeMaster={(obj)=>{}}/>}
                    <Divider/>
                    {this.state.isLoaded && <AuthorsQuadroList title={"Мастера жанра"} withGenres={true} datas={this.state.MasterAuthors} value={this}/>}
                    <Divider/>
                </Grid>
            </RecommendContainer>
        );
    }
}

export default AuthorsPage;