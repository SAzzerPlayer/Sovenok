import React from 'react';
import {Grid,List,ListItem,Container,Button,TextField} from '@material-ui/core';
import classes from './EditBookPage.css';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

class EditBookPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            newParag:"",
            newParagCheck:false
        };
    }
    Paragraph = () => {
        return (
            <ListItem className={classes.listItem}>
                <Grid container justify={"space-between"} alignItems={"center"}>
                    <Grid item xs={3}> <b style={{fontSize:18}}>1. Вступление</b></Grid>
                    <Grid container item xs={8} justify={"space-between"} >
                        <Button style={{fontSize:12}}>Редактировать<EditIcon style={{fontSize:16}}/></Button>
                        <Button style={{fontSize:12}}>Поднять<ArrowUpwardIcon style={{fontSize:16}}/></Button>
                        <Button style={{fontSize:12}}>Опустить<ArrowDownwardIcon style={{fontSize:16}}/></Button>
                        <Button style={{fontSize:12}}>Удалить<HighlightOffIcon style={{fontSize:16}}/></Button>
                    </Grid>
                </Grid>
            </ListItem>
        );
    };
    render(){
        const checkName = (obj) => {
            console.log(obj);
            let regExp = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
            this.setState({newParag:obj.target.value});
            if(obj.target.value.match(regExp) === null || obj.target.value.length === 0) this.setState({newParagCheck:true});
            else this.setState({newParagCheck:false});
        };
        return(
            <Grid container xs direction={"row"} justify={"space-around"} style={{padding:20}}>
                <Grid container item xs={7} direction={"column"} className={classes.table}>
                    <h1 style={{textAlign:"center"}}>Содержание книги</h1>
                    <Grid item xs>
                        <List>
                            <this.Paragraph/>
                            <this.Paragraph/>
                            <this.Paragraph/>
                            <this.Paragraph/>
                            <this.Paragraph/>
                            <this.Paragraph/>
                        </List>
                    </Grid>
                    <Grid container item xs justify={"flex-end"} spacing={2}>
                        <TextField
                            variant={"outlined"}
                            value={this.state.newParag}
                            error={this.state.newParagCheck}
                            label={"Название нового раздела"}
                            onChange={checkName}
                            style={{marginRight:15,minWidth:200}}
                        />
                        <Button
                            variant={"outlined"}
                            color={"primary"}
                            disabled={this.state.newParagCheck}
                        >Добавить</Button>
                    </Grid>
                </Grid>
                <Grid container item xs={3} direction={"column"} className={classes.table} alignItems={"center"}>
                    <Grid item xs style={{padding:20}}>
                        <img width={225} height={300} src={require("./page.png")}/>
                        <h3 style={{textAlign:"center"}}>Алиса в стране чудес</h3>
                        <h3 style={{textAlign:"center"}}>Жанр: <span style={{color:"skyblue"}}>Фантастика</span></h3>
                        <h3 style={{textAlign:"center"}}>Рейтинг: 54</h3>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default EditBookPage;
