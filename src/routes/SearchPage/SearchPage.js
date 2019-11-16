import React from 'react';
import {Grid,Divider,List,ListItem,Link} from '@material-ui/core';
import classes from './SearchPage.css';
import GET_API from '../../libs/api/GET_API';
import WorkContainer from "../../container/WorkContainer/WorkContainer";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
class SearchPage extends React.Component{
    constructor(props){
        super(props);
        let param = GET_API.getParametersFromSearch(this.props.location.search,"keyword");
        this.state={
            keyWord: param,
            show: false
        };
    }

    render(){
        return(
            <WorkContainer >
                <Grid className={classes.Table} container
                      xs={12}
                    direction={"column"}
                        justify="center"
                      spacing={3}
                >
                    <Grid item xs><h1>Результаты поиска:</h1></Grid>
                    <Grid item xs>Поиск по фразе: <b>{this.state.keyWord}</b></Grid>
                    <Grid item xs>Найдено: 0 пользователей, 0 книг, 0 книг по ключевой фразе</Grid>
                    <Divider/>
                    {this.state.show && <Grid item xs>По данной ключевой фразе ничего не найдено.</Grid>}
                    <Grid container item xs direction={"column"} spacing={0}>
                        <Grid xs item><h2>Найдены такие книги:</h2></Grid>
                        <Grid xs item><List>
                            <ListItem>
                                <Link>
                                    <FiberManualRecordIcon style={{fontSize:12}}/>
                                    Алиса в стране чудес
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link>
                                    <FiberManualRecordIcon style={{fontSize:12}}/>
                                    Алиса в стране чудес
                                </Link>
                            </ListItem>
                        </List>
                        </Grid>
                        <Grid xs item>
                            <Divider/>
                            <h2>Найдены такие авторы:</h2>
                        </Grid>
                        <Grid xs item>
                            <List>
                                <ListItem>
                                    <Link>
                                        <FiberManualRecordIcon style={{fontSize:12}}/>
                                        Лалаленд Лалалендович
                                    </Link>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid xs item>
                            <Divider/>
                            <h2>Найдены такие книги по ключу:</h2>
                        </Grid>
                        <Grid xs item>
                            <List>
                                <ListItem>
                                    <Link>
                                        <FiberManualRecordIcon style={{fontSize:12}}/>
                                        Алиса в стране чудес
                                    </Link>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
            </WorkContainer>
        );
    }

}

export default SearchPage;
