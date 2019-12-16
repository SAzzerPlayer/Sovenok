import React from 'react';
import {Grid,Button,Badge,ExpansionPanel ,ExpansionPanelDetails,ExpansionPanelSummary,List,ListItem} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import classes from './BookPage.css';
import AccountContainer from '../../container/AccountContainer/AccountContainer';
import RecommendContainer from '../../container/RecommendContainer/RecommendContainer';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import GradeIcon from '@material-ui/icons/Grade';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ListIcon from '@material-ui/icons/List';
import GET_API from '../../libs/api/GET_API';
import EditIcon from '@material-ui/icons/Edit';
class BookPage extends React.Component{
    constructor(props){
        super(props);
        let bookKey = GET_API.getParametersFromSearch(this.props.location.search,"book");
        this.state = {
            bookKey: bookKey,
            isLogged: false,
            bookInfo: {},
            contents: [],
            keys: [],
            isGraded : false,
            inLibrary : false,
            isAuthor: false,
            cover: require('./page.png')
        };
    }
    componentDidMount() {
        fetch("http://91.231.86.36/book/get/?book=" + this.state.bookKey)
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                console.log(responseJSON);
                this.setState({bookInfo: responseJSON.BookInfo, keys: responseJSON.BookInfo.keys,contents:responseJSON.BookContents});

                if(localStorage.getItem("user")===null) this.setState({isLogged : false});
                else this.setState({isLogged:true});
                if(this.state.isLogged){
                    let user = JSON.parse(localStorage.getItem("user")).id;
                    if(user === this.state.bookInfo.author) this.setState({isAuthor:true});
                    fetch("http://91.231.86.36/book/catch/?book="+this.state.bookKey+"&user="+user+"&author="+this.state.bookInfo.author)
                        .then(response => response.json())
                        .then(responseJSON=>{
                            console.log("States",responseJSON);
                            this.setState({isGraded : responseJSON.isGraded, inLibrary : responseJSON.inLibrary});
                        })
                }
                if(responseJSON.BookInfo.cover.trim().length > 10) this.setState({cover:responseJSON.BookInfo.cover});
            });
    }

    render(){
        const handleGrade = () => {
            const data = {user:JSON.parse(localStorage.getItem("user")).id, book:this.state.bookKey}
            fetch("http://91.231.86.36/book/grade",{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(response=>response.json())
                .then(responseJSON=>{
                    this.setState({isGraded:true})
                })
        };
        const handleUnGrade = () => {
            const data = {user:JSON.parse(localStorage.getItem("user")).id, book:this.state.bookKey}
            fetch("http://91.231.86.36/book/ungrade",{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(response=>response.json())
                .then(responseJSON=>{
                    this.setState({isGraded:false})
                })
        };
        const handleAddLibrary = () => {
            const data = {user:JSON.parse(localStorage.getItem("user")).id, book:this.state.bookKey}
            fetch("http://91.231.86.36/book/addlib",{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(response=>response.json())
                .then(responseJSON=>{
                    this.setState({inLibrary:true})
                })
        };
        const handleDelLibrary = () => {
            const data = {user:JSON.parse(localStorage.getItem("user")).id, book:this.state.bookKey}
            fetch("http://91.231.86.36/book/dellib",{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(response=>response.json())
                .then(responseJSON=>{
                    this.setState({inLibrary:false});
                })
        };
        const handleReadBook = () => {
            const data = {book:this.state.bookKey};
            fetch("http://91.231.86.36/book/read",{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            })
                .then(response=>response.json())
                .then(responsJSON=>{
                    this.props.history.push("/book/read?book="+this.state.bookKey)
                })
        };
        const Container = (props) => {
            if(this.state.isLogged) return (<AccountContainer>{props.children}</AccountContainer>);
            else return(<RecommendContainer>{props.children}</RecommendContainer>);
        };
        return(
            <Container>
                <Grid container item xs direction={"column"} className={classes.FontTable} spacing={4}>
                    <Grid container item xs direction={"row"}>
                        <Grid item xs>
                            <img height={400} width={300} src={this.state.cover}/>
                        </Grid>

                        <Grid container item xs direction={"column"} className={classes.Table}>
                            <Grid container item xs direction={"row"} justify={"space-between"}>
                                <Grid item xs><b style={{fontSize:32}}>{this.state.bookInfo.name}</b></Grid>
                            </Grid>
                            <Grid item xs><i style={{fontSize:24}}>{this.state.bookInfo.firstname + " " + this.state.bookInfo.surname}</i></Grid>
                            <Grid item xs><span style={{fontSize:24}}>Жанр: {this.state.bookInfo.genre}</span></Grid>
                            <Grid container item xs direction={"row"} justify={"space-between"}>
                                <Grid item xs={6}>
                                    <span style={{fontSize:18}}>
                                        <i><u>Просмотров: {this.state.bookInfo.views}</u></i>
                                    </span>
                                </Grid>
                                <Grid item xs={5}>
                                    <span style={{fontSize:18}}>
                                        <i><u>Рейтинг: {this.state.bookInfo.rate}</u></i>
                                    </span>
                                </Grid>
                            </Grid>
                            <Grid container item xs direction={"row"} justify={"space-between"}>
                                <Grid item  xs={5}>
                                    {!this.state.isGraded && this.state.isLogged && !this.state.isAuthor && <Button onClick={handleGrade} color="primary" variant="contained" style={{fontSize:14}}>
                                        <GradeIcon style={{color:"white"}}/>Похвалить
                                    </Button>}
                                    {this.state.isGraded && this.state.isLogged && !this.state.isAuthor && <Button onClick={handleUnGrade} color="secondary" variant="contained" style={{fontSize:14}}>
                                        <GradeIcon style={{color:"gold"}}/>Похвалено
                                    </Button>}
                                </Grid>
                                <Grid item  xs={6}>
                                    {!this.state.inLibrary && this.state.isLogged && !this.state.isAuthor && <Button onClick={handleAddLibrary} variant="contained" color="primary" style={{fontSize:14}}>
                                        В библиотеку<LibraryAddIcon/>
                                    </Button>}
                                    {this.state.inLibrary && this.state.isLogged && !this.state.isAuthor && <Button onClick={handleDelLibrary} variant="contained" color="secondary" style={{fontSize:14}}>
                                        В библиотекe<LibraryBooksIcon/>
                                    </Button>}
                                </Grid>
                            </Grid>
                            <Grid container item xs direction={"row"} justify={"center"}>
                                <Grid item xs={6}  >
                                    <Button disabled = {this.state.contents.length === 0} onClick={handleReadBook} color="primary" style={{width:"100%",color:"white"}} variant={"contained"}>
                                        <ChromeReaderModeIcon style={{marginRight:10}}/>Читать
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container item xs direction={"row"} justify={"center"}>
                                <Grid item xs={6}  >
                                    {this.state.isAuthor && <NavLink to={"/book/edit?book="+this.state.bookKey}>
                                        <Button color="primary" style={{width:"100%"}} variant={"contained"}>
                                            <EditIcon style={{marginRight:10}}/>Редактировать
                                        </Button>
                                    </NavLink>}
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid container item xs direction={"column"} alignItems={"center"} className={classes.Table}>
                        <Grid item xs>
                            <h1> Аннотация </h1>
                        </Grid>
                        <Grid item xs style={{minHeight:150}}>
                            <p>{this.state.bookInfo.annotation}</p>
                        </Grid>
                    </Grid>
                    <Grid item xs direction={"row"} style={{color:"purple"}}>
                        <b>В тексте имеется: </b>
                        {this.state.keys.map((currElem,index,array)=>{
                            return(
                                <NavLink to={"/books?key="+currElem.trim()+'&sort=rate'} style={{marginRight: 5}}>{currElem}</NavLink>
                            );
                        })}
                    </Grid>
                    <Grid container item xs direction={"column"}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ListIcon/>}>
                                Содержание книги
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <List style={{maxHeight:250,overflow:"auto",width:'100%'}}>
                                    {this.state.contents.map((currElem,index,array)=>{
                                        return (
                                            <ListItem>
                                                {(index+1) + ". "+currElem.name}
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default BookPage;