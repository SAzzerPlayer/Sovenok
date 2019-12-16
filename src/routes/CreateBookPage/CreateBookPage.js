import React from 'react';
import {Grid,List,ListItem,TextField,Button,Select,MenuItem,Tooltip,Snackbar} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import classes from './CreateBookPage.css';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import GET_API from '../../libs/api/GET_API';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AccountContainer from '../../container/AccountContainer/AccountContainer';

class CreateBookPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            newParag:"",
            newParagCheck:false,
            bookInfo:{},
            contents:[],
            ///////////
            name:'',
            genre:'Выберите жанр',
            announce:'',
            keys:'',
            cover:'',
            ///////////
            isOpenSnackEmpty: false
        };
    }
    componentDidMount(){

    }
    render(){
        const handleCreate = () => {
            let keysArr1 = this.state.keys.split(',');
            let keysSTR1 = "";
            for(let i=0;i<keysArr1.length;i++){
                keysSTR1+=keysArr1[i];
            }
            let keys = keysSTR1.split(" ");
            if(this.state.name.length === 0 || this.state.genre.length===0 || this.state.announce.length === 0){
                this.setState({isOpenSnackEmpty: true})
            }
            else {
                const data = {
                    name: this.state.name,
                    key: (JSON.parse(localStorage.getItem("user"))).id,
                    genre: this.state.genre,
                    announce: this.state.announce,
                    cover: this.state.cover,
                    keys: keys
                };
                fetch("http://91.231.86.36/book/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(responseJSON => {
                        let bookKey = responseJSON.bookKey;
                        this.props.history.push('/book?book=' + bookKey);
                    })
            }
        };
        const checkName = (obj) => {
            console.log(obj);
            let regExp = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
            this.setState({newParag:obj.target.value});
            if(obj.target.value.match(regExp) === null || obj.target.value.length === 0) this.setState({newParagCheck:true});
            else this.setState({newParagCheck:false});
        };
        return(
            <AccountContainer>
            <Grid container xs direction={"row"} justify={"space-around"} style={{padding:20}}>
                <Grid container item xs={12} direction={"column"} className={classes.table}>
                    <Grid container item xs direction={"column"} spacing={2}>
                        <h2>Информация о книге</h2>
                        <Grid container direction={"row"} item xs alignItems={"center"} justify={"space-between"}>
                            <Grid container item xs alignItems={"center"}>
                                <b style={{marginRight:10}}>Название книги:</b>
                                <TextField

                                    label={"Название книги"}
                                    value={this.state.name}
                                    onChange={(obj)=>{this.setState({name:obj.target.value})}}
                                />
                            </Grid>
                            <Grid container item xs alignItems={"center"}>
                                <b style={{marginRight:10}}>Жанр: </b>
                                <Select
                                    style={{width:150}}
                                    value={this.state.genre}
                                    onChange={(obj)=>{this.setState({genre:obj.target.value})}}
                                    defaultValue={"Выберите жанр"}
                                >
                                    <MenuItem value={"Фантастика"}>Фантастика</MenuItem>
                                    <MenuItem value={"Любовные романы"}>Любовные романы</MenuItem>
                                    <MenuItem value={"Проза"}>Проза</MenuItem>
                                    <MenuItem value={"Детектив"}>Детектив</MenuItem>
                                    <MenuItem value={"Ужасы/Мистика"}>Ужасы/Мистика</MenuItem>
                                    <MenuItem value={"Боевик"}>Боевик</MenuItem>
                                    <MenuItem value={"Триллер"}>Триллер</MenuItem>
                                    <MenuItem value={"Фэнтези"}>Фэнтези</MenuItem>
                                    <MenuItem value={"Проза"}>Проза</MenuItem>
                                    <MenuItem value={"Разное"}>Разное</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container direction={"row"} item xs>
                            <b>Аннотация к книге:</b>
                            <TextField
                                value={this.state.announce}
                                onChange={(obj)=>{this.setState({announce:obj.target.value})}}
                                fullWidth
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid container direction={"row"} item xs>
                            <b>Ключевые слова книги:</b>
                            <TextField
                                value={this.state.keys}
                                onChange={(obj)=>{this.setState({keys:obj.target.value})}}
                                fullWidth
                            />
                        </Grid>
                        <Grid container direction={"row"} item xs>
                            <b>URL-адрес обложки книги:</b>
                            <TextField
                                value={this.state.cover}
                                onChange={(obj)=>{this.setState({cover:obj.target.value})}}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container={"row"} item xs justify={"space-between"} alignItems={"center"}>
                        <Grid item xs={4}>
                            <NavLink style={{color:"white"}} to = {"/account/mybooks"}>
                                <Button variant={"contained"} color={"primary"}>Отмена</Button>
                            </NavLink>
                        </Grid>
                        <Grid item xs={5}>
                        </Grid>
                        <Grid container item xs={3} alignItems={"center"} justify="flex-end">
                            <Button onClick={handleCreate} variant={"contained"} color={"primary"}>Создать</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                open={this.state.isOpenSnackEmpty}
                onClose={()=>{this.setState({isOpenSnackEmpty:false})}}
                ContentProps={{
                    'aria-describedby': 'message-isEmpty',
                }}
                message={<span id="message-isEmpty">Данные о книги заполнены не полностью! Должно быть заполнено название книги, аннотация к ней и выбран жанр книги.</span>}
            />
            </AccountContainer>
        );
    }
}

export default CreateBookPage;