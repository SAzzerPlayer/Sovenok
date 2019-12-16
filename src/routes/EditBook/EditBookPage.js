import React from 'react';
import {
    Grid,
    List,
    ListItem,
    TextField,
    Button,
    Select,
    MenuItem,
    Divider,
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import classes from './EditBookPage.css';
import EditIcon from '@material-ui/icons/Edit';
import {ContentState,EditorState,convertToRaw} from 'draft-js';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import GET_API from '../../libs/api/GET_API';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

class EditBookPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bookKey:GET_API.getParametersFromSearch(this.props.location.search,"book"),
            newParag:"",
            newParagCheck:true,
            bookInfo:{},
            contents:[],
            contentsModify:[],
            isModify:false,
            isChanging:false,
            ///////////
            name:'',
            genre:'',
            announce:'',
            keys:'',
            cover:'',
            showCover:'',
            isOpenDialog:false,
            notes:''
        };
    }
    componentDidMount(){
        fetch("http://91.231.86.36/book/get?book="+this.state.bookKey)
            .then((response)=>{return response.json();})
            .then((responseJSON) => {
                console.log("response",responseJSON);
                this.setState(
                    {
                        bookInfo: responseJSON.BookInfo,
                        contents: responseJSON.BookContents,
                        contentsModify: JSON.parse(JSON.stringify(responseJSON.BookContents))
                    }
                );
                let keys = "";
                let arrKeys = responseJSON.BookInfo.keys;
                for (let i = 0; i < arrKeys.length; i++) {
                    keys += arrKeys[i].trim();
                    if (i + 1 !== arrKeys.length) keys += ", ";
                }
                this.setState({
                    name: responseJSON.BookInfo.name.trim(),
                    genre: responseJSON.BookInfo.genre.trim(),
                    announce: responseJSON.BookInfo.annotation.trim(),
                    cover: responseJSON.BookInfo.cover.trim(),
                    showCover:responseJSON.BookInfo.cover.trim(),
                    keys: keys
                });
                if(this.state.showCover.length <= 10) {this.setState({showCover:require('./page.png')})}
            });
    }
    Paragraph = (props) => {
        return (
            <ListItem className={classes.listItem}>
                <Grid container justify={"space-between"} alignItems={"center"}>
                    <Grid item xs={3}> <b style={{fontSize:18}}>{'index'+'.'+'Title'}</b></Grid>
                    <Grid container item xs={8} justify={"space-between"} >
                        <NavLink to={"/book/text/edit"}><Button style={{fontSize:12}}>Редактировать<EditIcon style={{fontSize:16}}/></Button></NavLink>
                        <Button style={{fontSize:12}}>Поднять<ArrowUpwardIcon style={{fontSize:16}}/></Button>
                        <Button style={{fontSize:12}}>Опустить<ArrowDownwardIcon style={{fontSize:16}}/></Button>
                        <Button style={{fontSize:12}}>Удалить<HighlightOffIcon style={{fontSize:16}}/></Button>
                    </Grid>
                </Grid>
            </ListItem>
        );
    };

    render(){
        const handleAddParagraph = () => {
            this.setState({isChanging:true});
            let title = this.state.newParag;
            let obj = {
                pathKey : this.state.bookKey,
                priority : this.state.contentsModify.length+1,
                name: title
            };
            let arr = this.state.contentsModify;
            arr.push(obj);
            this.setState({contentsModify:arr});
            console.log("COntents",this.state.contentsModify);
            this.setState({isModify:true,isChanging:false,newParagCheck:true});
        };
        const handleDeleteParagraph= (priority) => {
            this.setState({isChanging:true});
            let arr = this.state.contentsModify;
            let index = 0;
            for(let i=0; i<arr.length;i++){
                if(arr[i].priority === priority){
                    index = i;
                    break;
                }
            }
            arr.splice(index,1);
            this.setState({isModify:true,isChanging:false,contentsModify:arr});
        }
        const handleIncPriorityParagraph = (priority) => {
            this.setState({isChanging:true});
            let arr = this.state.contentsModify;
            let index = 0;
            for(let i=0;i<arr.length;i++){
                if(arr[i].priority === priority){
                    index = i;
                    break;
                }
            }
            let temp = JSON.parse(JSON.stringify({up : arr[index-1].name,down:arr[index].name}));

            arr[index-1].name = temp.down;
            arr[index].name = temp.up;
            this.setState({isModify:true,contentModify:arr,isChanging:false});
        }
        const handleDecPriorityParagraph = (priority) => {
            this.setState({isChanging:true});
            let arr = this.state.contentsModify;
            let index = 0;
            for(let i=0;i<arr.length;i++){
                if(arr[i].priority === priority){
                    index = i;
                    break;
                }
            }
            let temp = JSON.parse(JSON.stringify({up : arr[index+1].name,down:arr[index].name}));

            arr[index+1].name = temp.down;
            arr[index].name = temp.up;
            this.setState({isModify:true,contentModify:arr,isChanging:false});
        }
        const handleEditParagraph = () => {
            let keySplit1 = this.state.keys.split(",");
            let keysJoin1 = "";
            for(let i = 0; i<keySplit1.length;i++) {
                keysJoin1+=keySplit1[i];
            }
            const keys = keysJoin1.split(" ");
            const data = {
                book : this.state.bookKey,
                name : this.state.name,
                keys : keys,
                cover : this.state.cover,
                annotation : this.state.announce,
                genre : this.state.genre
            };
            fetch("http://91.231.86.36/book/edit/info",
                {
                    method:"POST",
                    body : JSON.stringify(data),
                    headers : {
                        "Content-Type":"application/json"
                    }
                }).then(response => response.json())
                .then(responseJSON => {
                    console.log(responseJSON);
                    this.props.history.push("/book?book="+this.state.bookKey);
                })
        }
        const handleSaveParagraphs = () => {
            let arr = JSON.parse(JSON.stringify(this.state.contentsModify));
            for(let i=0; i<arr.length;i++){
                arr[i].priority = i+1;
            }
            this.setState({contentsModify:arr});
            let contentState = EditorState.createEmpty().getCurrentContent();
            let rawObj = convertToRaw(contentState);
            const data = {
                bookKey:this.state.bookKey,
                contents: arr,
                emptyContent: rawObj // пустой объект состояния редактора текста в json формате
            };
            fetch("http://91.231.86.36/book/edit/changetexts",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                    },
                body : JSON.stringify(data)
                })
                .then(response => response.json())
                .then(responseJSON => {
                    this.setState({contents:JSON.parse(JSON.stringify(arr))});
                });
            this.setState({isModify:false});
        }
        const handleCanselEditParagraphs = () => {
            let arr = JSON.parse(JSON.stringify(this.state.contents));
            this.setState({isModify:false,contentsModify:arr});
        }
        const handleClickDelete = () => {
            const data = {
                user:JSON.parse(localStorage.getItem("user")).id,
                book:this.state.bookKey,
                notes:this.state.notes
            };
            console.log(data);
            fetch("http://91.231.86.36/book/delete",
                {
                    method:"POST",
                    body:JSON.stringify(data),
                    headers:{
                        "Content-Type":"application/json"
                    }
                }).then(response=>response.json())
                .then(responseJSON=>{
                    console.log(responseJSON);
                })
        };
        const checkName = (obj) => {
            console.log(obj);
            let regExp = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
            this.setState({newParag:obj.target.value});
            if(obj.target.value.match(regExp) === null || obj.target.value.length === 0) this.setState({newParagCheck:true});
            else this.setState({newParagCheck:false});
            for(let i=0;i<this.state.contentsModify.length;i++){
                if(this.state.contentsModify[i].name === obj.target.value) {
                    this.setState({newParagCheck: true});
                    break;
                }
            }
        };
        return(
            <Grid container xs direction={"row"} justify={"space-around"} style={{padding:20}}>
                <Grid container item xs={7} direction={"column"} className={classes.table}>
                    <Grid container item xs direction={"column"} spacing={2}>
                        <h2>Информация о книге</h2>
                        <Grid container direction={"row"} item xs alignItems={"center"} justify={"space-between"}>
                            <Grid container item xs={8} alignItems={"center"}>
                                <b style={{marginRight:10}}>Название книги:</b>
                                <TextField
                                    value={this.state.name}
                                    style={{minWidth:300}}
                                    onChange={(obj)=>{this.setState({name:obj.target.value})}}
                                    />
                            </Grid>
                            <Grid container item xs={4} alignItems={"center"}>
                                <b style={{marginRight:10}}>Жанр: </b>
                                <Select
                                    style={{width:150}}
                                    value={this.state.genre}
                                    onChange={(obj)=>{this.setState({genre:obj.target.value})}}
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
                            <NavLink style={{color:"white"}} to={"/book?book="+this.state.bookKey}>
                                <Button disabled={this.state.isModify} variant={"contained"} color={"primary"}>Назад</Button>
                            </NavLink>
                        </Grid>

                        <Grid item xs={5}>
                            <h1 style={{textAlign:"center"}}>Содержание книги</h1>
                        </Grid>
                        <Grid container item xs={3} alignItems={"center"} justify="flex-end">
                            <Button disabled={this.state.isModify} onClick={handleEditParagraph} variant={"contained"} color={"primary"}>Сохранить</Button>
                        </Grid>
                    </Grid>
                    {/*////////////////////////Содержание книги//////////////////////////////////////*/}
                    <Grid item xs style={{borderTopWidth:1,borderTopColor:'gray', borderTopStyle:'solid'}}>
                        <List style={{overflow:"auto",maxHeight:450,marginBottom:10}}>
                            {this.state.isChanging === false && this.state.contentsModify.map((currElem,index,array)=>{
                                let min = array[0].priority;
                                let max = array[0].priority;
                                for(let i=0;i<array.length;i++){
                                    if(array[i].priority < min) min = array[i].priority;
                                    else if(array[i].priority > max) max = array[i].priority;
                                }
                                return (
                                    <ListItem className={classes.listItem}>
                                        <Grid container justify={"space-between"} alignItems={"center"}>
                                            <Grid item xs={3}> <b style={{fontSize:18}}>{(index+1)+'.'+currElem.name}</b></Grid>
                                            <Grid container item xs={8} justify={"space-between"} >
                                                {!this.state.isModify &&
                                                <NavLink to={"/book/text/edit?book="+this.state.bookKey+"&priority="+currElem.priority}>
                                                    <Button style={{fontSize: 12}}>Редактировать<EditIcon
                                                        style={{fontSize: 16}}/></Button>
                                                </NavLink>
                                                }
                                                <Button disabled={currElem.priority === min} style={{fontSize:12}} onClick={()=>{
                                                    handleIncPriorityParagraph(currElem.priority);
                                                }}>
                                                    Поднять<ArrowUpwardIcon style={{fontSize:16}}/>
                                                </Button>
                                                <Button disabled={currElem.priority === max} style={{fontSize:12}} onClick={()=>{
                                                    handleDecPriorityParagraph(currElem.priority);
                                                }}>
                                                    Опустить<ArrowDownwardIcon style={{fontSize:16}}/>
                                                </Button>
                                                <Button style={{fontSize:12}} onClick={()=>{handleDeleteParagraph(currElem.priority)}}>
                                                    Удалить<HighlightOffIcon style={{fontSize:16}}/>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Grid>
                    {/*/////////////////////////Окончание////////////////////////////////////////*/}
                    <Grid container item xs justify={"space-between"} spacing={2}>
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            disabled={!this.state.isModify}
                            onClick={handleCanselEditParagraphs}
                        >
                            Отмена
                        </Button>
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            disabled={!this.state.isModify}
                            onClick={handleSaveParagraphs}
                        >
                            Сохранить
                        </Button>
                        <TextField
                            variant={"outlined"}
                            value={this.state.newParag}
                            error={this.state.newParagCheck}
                            label={"Название нового раздела"}
                            onChange={checkName}
                            style={{marginRight:15,minWidth:225}}
                        />
                        <Button
                            variant={"outlined"}
                            color={"primary"}
                            disabled={this.state.newParagCheck}
                            onClick={handleAddParagraph}
                        >Добавить</Button>
                    </Grid>
                </Grid>
                <Grid container item xs={3} direction={"column"} className={classes.table} alignItems={"center"}>
                    <Grid item xs style={{padding:20}}>
                        <h2 style={{textAlign:"center"}}>Кратко о книге</h2>
                        <img width={225} height={300} src={this.state.showCover}/>
                        <h3 style={{textAlign:"center"}}>{this.state.bookInfo.name}</h3>
                        <h3 style={{textAlign:"center"}}>Жанр: <span style={{color:"skyblue"}}>{this.state.bookInfo.genre}</span></h3>
                        <h3 style={{textAlign:"center"}}>Рейтинг: {this.state.bookInfo.rate}</h3>
                        <Divider/>
                        <h3 style={{textAlign:"center"}}>Заявка на удаление:</h3>
                        <Button fullWidth variant={"outlined"} color={"secondary"}
                            onClick={()=>{
                                this.setState({isOpenDialog:true})

                            }}
                        >Отправить</Button>
                    </Grid>
                    <Dialog
                        open={this.state.isOpenDialog}
                        onClose={()=>{this.setState({isOpenDialog:false})}}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Заявка на авторство"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Данным действием вы подаёте заявку на удаление вашего произведения.
                                Все содержимое и статистика также будут очищены.
                                Опишите, пожалуйста, вашу причину этого решения.
                            </DialogContentText>
                            <TextField
                                value={this.state.notes}
                                onChange={(obj)=>{
                                    this.setState({notes:obj.target.value});
                                }}
                                fullWidth
                                label={"Причина"}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>{this.setState({isOpenDialog:false})}} color="primary">
                                Нет
                            </Button>
                            <Button onClick={()=>{
                                this.setState({isOpenDialog:false});
                                handleClickDelete();
                            }} color="primary" autoFocus>
                                Да
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        );
    }
}

export default EditBookPage;
