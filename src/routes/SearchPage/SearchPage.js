import React from 'react';
import {Grid,Divider,List,ListItem,Link} from '@material-ui/core';
import classes from './SearchPage.css';
import GET_API from '../../libs/api/GET_API';
import WorkContainer from "../../container/WorkContainer/WorkContainer";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Searching from '../../components/Searching/Searching';
class SearchPage extends React.Component{
    constructor(props){
        super(props);
        let param = GET_API.getParametersFromSearch(this.props.location.search,"keyword");
        this.state={
            keyWord: param,
            show: false,
            SearchingEnd:false,
            books: [],
            authors: [],
            keybooks: [],
            CMPbooks: ()=>{},
            CMPauthors: ()=>{},
            CMPkeys: ()=>{}
        };
    }
    componentDidMount() {
        let query = fetch("http://91.231.86.36/search?key="+this.state.keyWord,{
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
        })
            .then(response=>response.json())
            .then(responseJSON=>{
                this.setState({books:responseJSON.books,authors:responseJSON.authors,keybooks:responseJSON.keyBooks});
                this.setState({
                CMPbooks:()=>{
                    this.state.books.map((currentArr)=>{
                        return(
                            <ListItem>
                                <Link>
                                    <FiberManualRecordIcon style={{fontSize:12}}/>
                                    {currentArr.name}
                                </Link>
                            </ListItem>
                            );
                        })
                    },
                CMPauthors:()=>{
                    this.state.authors.map((currentArr)=>{
                        return(
                            <ListItem>
                                <Link>
                                    <FiberManualRecordIcon style={{fontSize:12}}/>
                                    {currentArr.firstname+" "+currentArr.surname}
                                </Link>
                            </ListItem>
                        );
                    })
                },
                CMPkeys:()=>{
                    this.state.keybooks.map((currentArr)=>{
                        return(
                            <ListItem>
                                <Link>
                                    <FiberManualRecordIcon style={{fontSize:12}}/>
                                    {currentArr.name}
                                </Link>
                            </ListItem>
                        );
                    })
                }
                });
                this.setState({SearchingEnd:true});
            })
    }


    render(){
        const SearchInsides = () => {
            return (
                <Grid className={classes.Table} container
                      xs={12}
                      direction={"column"}
                      justify="center"
                      spacing={3}
                >

                    <Grid item xs><h1>Результаты поиска:</h1></Grid>
                    <Grid item xs>Поиск по фразе: <b>{this.state.keyWord}</b></Grid>
                    <Grid item xs>Найдено: {this.state.authors.length} пользователей, {this.state.books.length} книг, {this.state.keybooks.length} книг по ключевой фразе</Grid>
                    <Divider/>
                    {this.state.show && <Grid item xs>По данной ключевой фразе ничего не найдено.</Grid>}
                    <Grid container item xs direction={"column"} spacing={0}>
                        <Grid xs item><h2>Найдены такие книги:</h2></Grid>
                        <Grid xs item><List>
                            {this.state.CMPbooks()}
                        </List>
                        </Grid>
                        <Grid xs item>
                            <Divider/>
                            <h2>Найдены такие авторы:</h2>
                        </Grid>
                        <Grid xs item>
                            {this.state.CMPauthors()}
                        </Grid>
                        <Grid xs item>
                            <Divider/>
                            <h2>Найдены такие книги по ключу:</h2>
                        </Grid>
                        <Grid xs item>
                            <List>
                                {this.state.CMPkeys()}
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
        const Loading = () => {
            return (
                <Grid className={classes.Table} container
                      xs={12}
                      direction={"column"}
                      justify="center"
                      spacing={3}
                >
                    <Searching title={"Searching..."}/>
                </Grid>
            );
        }
        return(
            <WorkContainer >
                {!this.state.SearchingEnd && <Loading/>}
            </WorkContainer>
        );
    }

}

export default SearchPage;
