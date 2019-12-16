import React from 'react';
import {Divider,List,ListItem,ListItemText,Grid,Button} from "@material-ui/core";
import {Link,NavLink} from 'react-router-dom';
import classes from './MainInfoTable.css';
import FaceIcon from '@material-ui/icons/Face';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import CloseIcon from '@material-ui/icons/Close';
import SkipNextOutlinedIcon from '@material-ui/icons/SkipNextOutlined';
class MainInfoTable extends React.Component{
    render(){
        return(
            <Grid container
            justify={"center"}
            alignItems={"center"}
            style={{backgroundColor:"snow",marginTop:10,marginBottom:10}}
                  className={classes.Table}
            >
                <Grid item xs={4}>

                    <List style={{margin:10}}>
                        <ListItemText>
                            <h1 style={{color:"skyblue"}}>Читать книги онлайн</h1>
                        </ListItemText>
                        <ListItemText>
                            <h4> * На Sovenok есть абсолютно все популярные жанры - от Фантастики до Любовных романов</h4>
                        </ListItemText>
                        <ListItemText>
                            <h4> * Книги можно читать в стадии написания или окончания</h4>
                        </ListItemText>
                    </List>
                </Grid>
                <Grid item lg={3} style={{justifyContent:"center"}}
                >
                    <img src={require("./help2.png")}
                    width={256}
                    height={256}
                    style={{padding:8}}/>
                </Grid>
                <Grid container item xs={3} justify={'center'}
                >
                    <h2>Впервые на сайте?</h2>
                    <h3>Раздел помощи для :</h3>

                    <List component="nav" aria-label={"main"}>
                        <NavLink to={"/help"} style={{color:"black"}}>
                            <ListItem button>
                                <FaceIcon
                                    color={"inherit"}
                                    style={{marginRight: 10}}/>
                                Читателей
                            </ListItem>
                        </NavLink>
                        <Divider style={{margin:5}}/>
                        <NavLink to={"/help"} style={{color:"black"}}>
                            <ListItem button href={"/help/reader"}>
                                <EmojiPeopleIcon
                                    color={"inherit"}
                                    style={{marginRight: 10}}/>
                                Авторов
                            </ListItem>
                        </NavLink>
                        <Divider/>
                    </List>
                </Grid>
                <Grid container direction={"column"} xs justify={"center"} alignItems={"center"}>
                    <Button onClick={()=>{
                        sessionStorage.setItem("closeTab",JSON.stringify({isClosed:true}))
                        this.props.onChange();
                    }}>
                        <SkipNextOutlinedIcon style={{fontSize:36}}/>
                    </Button>
                    Скрыть
                </Grid>
            </Grid>
        );
    }
}

export default MainInfoTable;
