import React from 'react';
import {Grid,Divider,List,ListItem} from '@material-ui/core';
import classes from './SearchPage.css';
import GET_API from '../../libs/api/GET_API';
import DB from '../../libs/api/DB';
import WorkContainer from "../../container/WorkContainer/WorkContainer";
class SearchPage extends React.Component{
    constructor(props){
        super(props);
        let param = GET_API.getParametersFromSearch(this.props.location.search,"keyword");
        this.state={
            keyWord: param
        };
        let car = DB.SelectAllBooks();
    }
    render(){
        return(
            <WorkContainer >
                <Grid className={classes.Table} container
                      xs={12}
                    direction={"column"}
                        justify="center"
                      spacing={4}
                >
                    <Grid item xs><h2>Результаты поиска:</h2></Grid>
                    <Grid item xs>Поиск по фразе: <b>{this.state.keyWord}</b></Grid>
                    <Grid item xs>Найдено: 0 пользователей, 0 книг, 0 книг по ключевой фразе</Grid>
                    <Divider/>
                    <Grid item xs>По данной ключевой фразе ничего не найдено.</Grid>
                    <Grid container item xs direction={"column"}>
                        <List>
                            <ListItem>
                                H2
                            </ListItem>
                            <ListItem>
                                H3
                            </ListItem>
                        </List>
                    </Grid>

                </Grid>
            </WorkContainer>
        );
    }

}

export default SearchPage;
