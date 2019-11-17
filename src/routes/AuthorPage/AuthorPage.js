import React from 'react';
import {Grid,Button} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import classes from './AuthorPage.css'
import RecommendContainer from '../../container/RecommendContainer/RecommendContainer';
import BookInfo from '../../components/BookInfo/BookInfo';
import PageListSwitcher from '../../components/PageListSwitcher/PageListSwitcher';
import BorderBottomIcon from '@material-ui/icons/BorderBottom';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import GradeIcon from '@material-ui/icons/Grade';
class AuthorPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <RecommendContainer>
                <Grid container item xs className={classes.FontTable} direction={"column"} spacing={4}>
                    <Grid container item xs className={classes.Table} direction={"row"} justify={"space-between"}>
                        <Grid item xs={4}>
                            <img src={require("./avatar.jpg")} height={196} width={196} style={{backgroundColor:"skyblue", borderRadius:98}}/>
                        </Grid>
                        <Grid item container direction="column" xs={8} alignItems={"center"}>
                            <Grid item xs style={{fontSize:32,textAlign:"center"}}>
                                Лалаленд Лалалендович
                            </Grid>
                            <Grid item xs style={{fontSize:24,textAlign:"center",color:"purple"}}>
                                <i>"Лучше иметь синицу в руке, чем не иметь её вовсе)"</i>
                            </Grid>
                            <Grid item xs style={{fontSize:24}}>
                                Мастер жанра: <b style={{color:"skyblue"}}>Фантастика</b>
                            </Grid>
                            <Grid item xs style={{fontSize:24}}>
                                Рейтинг: 100
                            </Grid>
                            <Grid container item xs style={{fontSize:24}} justify={"center"} direction={"row"}>
                                <Grid item xs={6}>
                                    <Button variant={"contained"} color={"secondary"} style={{alignText:"center"}}>
                                        <GradeIcon style={{color:"gold",rotate:90}}/> Добавить в избранныe
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container justify={"space-between"} direction={"column"} alignItems={"center"} item xs={1}>
                        <DoubleArrowIcon
                              className={classes.IconToBottom} style={{marginLeft:326,fontSize:48}}/>
                    </Grid>
                    <Grid container item lg className={classes.Table} direction={"column"} spacing={1}>
                        <Grid item xs><h2>Книги автора:</h2></Grid>
                        <Grid item xs><BookInfo/></Grid>
                        <Grid item xs><BookInfo/></Grid>
                        <Grid item xs><BookInfo/></Grid>
                        <PageListSwitcher ShowText={true}/>
                    </Grid>
                </Grid>
            </RecommendContainer>
        );
    }
}

export default AuthorPage;

