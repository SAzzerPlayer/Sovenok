import React from 'react';
import {Grid,Divider,List,ListItem} from '@material-ui/core';
import {NavLink} from 'react-router-dom'
import classes from './SearchPage.css';
import GET_API from '../../libs/api/GET_API';
import WorkContainer from "../../container/WorkContainer/WorkContainer";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Searching from '../../components/Searching/Searching';
class SearchPage extends React.Component{
    constructor(props){
        super(props);
        let param = GET_API.getParametersFromSearch(this.props.location.search,"keyword");
        this.state= {
            keyWord: param,
            show: false,
            SearchingEnd: false,
            books: [],
            authors: [],
            keybooks: [],
            booksIsEmpty: false,
            authorsIsEmpty: false,
            keysIsEmpty: false,
            key:''
        }
    }
    componentDidMount() {
        fetch("http://91.231.86.36/search?key="+this.state.keyWord,{
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response=>response.json())
            .then(responseJSON=>{
                console.log(responseJSON);
                this.setState({books:responseJSON.books || [],authors:responseJSON.authors || [],keybooks:responseJSON.keyBooks || [],key:responseJSON.key});
                console.log(this.state);
                if(this.state.books.length === 0){ this.setState({booksIsEmpty:true })}
                if(this.state.authors.length === 0) this.setState({authorsIsEmpty:true});
                if(this.state.keybooks.length === 0) this.setState({keysIsEmpty:true});
                this.setState({SearchingEnd:true});
            })
    }


    render(){
        const SearchInsides = (props) => {
            return (
                <Grid className={classes.Table} container
                      xs={12}
                      direction={"column"}
                      justify="center"
                      spacing={3}
                >

                    <Grid item xs><h1>Результаты поиска:</h1></Grid>
                    <Grid item xs>Поиск по фразе: <b>{this.state.key}</b></Grid>
                    <Grid item xs>Найдено: {this.state.authors.length} пользователей, {this.state.books.length} книг, {this.state.keybooks.length} книг по ключевой фразе</Grid>
                    <Divider/>
                    {
                        this.state.booksIsEmpty &&
                        this.state.authorsIsEmpty &&
                        this.state.keysIsEmpty &&
                        <Grid item xs>По данной ключевой фразе ничего не найдено.</Grid>
                    }
                    <Grid container item xs direction={"column"} spacing={0}>
                        {!this.state.booksIsEmpty &&
                        <Grid xs item><h2>Найдены такие книги:</h2></Grid>}
                        {!this.state.booksIsEmpty &&
                        <Grid xs item><List>
                            {
                                this.state.books.map((currentArr) => {
                                    return (
                                        <ListItem>
                                            <NavLink to={"/book?book="+currentArr.key}>
                                                <FiberManualRecordIcon style={{fontSize: 12}}/>
                                                {currentArr.name}
                                            </NavLink>
                                        </ListItem>
                                    );
                                })
                            }
                        </List>
                        </Grid>
                        }
                        {!this.state.authorsIsEmpty &&
                        <Grid xs item>
                            <Divider/>
                            <h2>Найдены такие авторы:</h2>
                        </Grid>}
                        {!this.state.authorsIsEmpty && <Grid xs item>
                            {
                                this.state.authors.map((currentArr) => {
                                    return (
                                        <ListItem>
                                            <NavLink to={'/author?user='+currentArr.id}>
                                                <FiberManualRecordIcon style={{fontSize: 12}}/>
                                                {currentArr.firstname + " " + currentArr.surname}
                                            </NavLink>
                                        </ListItem>
                                    );
                                })
                            }
                        </Grid>
                        }
                        {!this.state.keysIsEmpty &&
                        <Grid xs item>
                            <Divider/>
                            <h2>Найдены такие книги по ключу:</h2>
                        </Grid>}
                        {!this.state.keysIsEmpty && <Grid xs item>
                            <List>
                                {
                                    this.state.keybooks.map((currentArr) => {
                                        return (
                                            <ListItem>
                                                <NavLink to={'/book?book='+currentArr.key}>
                                                    <FiberManualRecordIcon style={{fontSize: 12}}/>
                                                    {currentArr.name}
                                                </NavLink>
                                            </ListItem>
                                        );
                                    })
                                }
                            </List>
                        </Grid>
                        }
                    </Grid>
                </Grid>
            );
        };
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
                {this.state.SearchingEnd && <SearchInsides/>}
            </WorkContainer>
        );
    }

}

export default SearchPage;
