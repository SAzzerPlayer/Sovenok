import React from 'react';
import {Grid,Divider,Container,List,ListItem,ListItemIcon} from '@material-ui/core';
import {NavLink,Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import classes from './SideBooksMenu.css';
const SideBooksMenu = () =>{
    const handleClick = (path) => {
        history.push('/');
        setTimeout(()=>{history.push(path)},200);
    }
    let history = useHistory();
        return(
            <Grid container
                  className={classes.GridFont}
                justify={"center"}
                  direction={"column"}
                  spacing={1}
            >
                <Grid item xs
                    style={{backgroundColor:"skyblue", color:"snow",fontSize:18}}
                      className={classes.Table}
                ><span style={{margin:10}}>Жанры:</span></Grid>
                <Grid container item
                      direction={'row'}
                xs
                >
                    <Grid item xs={6}>
                        <List>
                            <ListItem>
                                    <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                    <Link className={classes.Link} onClick={()=>{handleClick("/books?genre=ВСЕ&sort=rate")}}>Все жанры</Link>
                            </ListItem>
                            <ListItem>
                                    <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                    <Link className={classes.Link} onClick={()=>{handleClick("/books?genre=Детектив&sort=rate")}}>Детектив</Link>
                            </ListItem>
                            <ListItem>
                                    <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                    <Link className={classes.Link} onClick={()=>{handleClick("/books?genre=Фэнтези&sort=rate")}}>Фэнтези</Link>
                            </ListItem>
                            <ListItem>
                                    <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                    <Link className={classes.Link} onClick={()=>{handleClick("/books?genre=Боевик&sort=rate")}}>
                                        Боевик
                                    </Link>
                            </ListItem>
                            <ListItem>
                                    <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                    <Link className={classes.Link} onClick={()=>{handleClick("/books?genre=Проза&sort=rate")}}>Проза</Link>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <List>
                            <ListItem>
                                <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                <Link className={classes.Link}
                                      onClick={()=>{handleClick("/books?genre=Мистика&sort=rate")}}>
                                        Мистика\Ужасы
                                </Link>
                            </ListItem>
                            <ListItem>
                                <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                <Link className={classes.Link} onClick={()=>{handleClick("/books?genre=Триллер&sort=rate")}}>Триллеры</Link>
                            </ListItem>
                            <ListItem>
                                <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                <Link className={classes.Link} onClick={()=>{handleClick("/books?genre=Фантастика&sort=rate")}}>Фантастика</Link>
                            </ListItem>
                            <ListItem>
                                <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                <Link className={classes.Link} onClick={()=>{handleClick("/books?genre=Любовь&sort=rate")}}>Любовные романы</Link>
                            </ListItem>
                            <ListItem>
                                <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                <Link className={classes.Link} onClick={()=>{handleClick("/books?genre=Разное&sort=rate")}}>Разное</Link>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
                <Grid item xs
                      style={{backgroundColor:"skyblue", color:"snow",fontSize:18}}
                      className={classes.Table}>
                    <span style={{margin:10}}>Подборки книг:</span>
                </Grid>
                <Grid container item
                      direction={'row'}
                      xs
                >
                    <Grid item xs={6}>
                        <List>
                            <ListItem>
                                <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                <Link className={classes.Link}
                                         onClick={()=>{handleClick("/books?genre=Все&sort=rate");}}>Популярные</Link>
                            </ListItem>
                            <ListItem>
                                <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                <Link className={classes.Link} onClick={()=>{handleClick("/books?genre=Все&sort=new")}}>Новинки</Link>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs = {6}>
                        <List>
                            <ListItem>
                                <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                <Link className={classes.Link}
                                    onClick={()=>{handleClick("/books?genre=Все&sort=edit")}}
                                >Обновленные</Link>
                            </ListItem>
                            <ListItem>
                                <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                <Link className={classes.Link} onClick={()=>{handleClick("/books?genre=Все&sort=read")}}>Бестридеры</Link>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        );}
export default SideBooksMenu;