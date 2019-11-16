import React from 'react';
import {Grid,Divider,Container,List,ListItem,ListItemIcon} from '@material-ui/core';
import {NavLink} from "react-router-dom";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import classes from './SideBooksMenu.css';
const SideBooksMenu = () => {
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
                                <NavLink className={classes.Link} to={"/books"}>Все жанры</NavLink>
                        </ListItem>
                        <ListItem>
                                <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                <NavLink className={classes.Link} to={"/books"}>Детектив</NavLink>
                        </ListItem>
                        <ListItem>
                                <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                <NavLink className={classes.Link} to={"/books"}>Фэнтези</NavLink>
                        </ListItem>
                        <ListItem>
                                <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                <NavLink className={classes.Link} to={"/books"}>Боевик</NavLink>
                        </ListItem>
                        <ListItem>
                                <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                <NavLink className={classes.Link} to={"/books"}>Проза</NavLink>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <List>
                        <ListItem>
                            <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                            <NavLink className={classes.Link} to={"/books"}>Мистика\Ужасы</NavLink>
                        </ListItem>
                        <ListItem>
                            <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                            <NavLink className={classes.Link} to={"/books"}>Триллеры</NavLink>
                        </ListItem>
                        <ListItem>
                            <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                            <NavLink className={classes.Link} to={"/books"}>Фантастика</NavLink>
                        </ListItem>
                        <ListItem>
                            <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                            <NavLink className={classes.Link} to={"/books"}>Любовные романы</NavLink>
                        </ListItem>
                        <ListItem>
                            <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                            <NavLink className={classes.Link} to={"/books"}>Разное</NavLink>
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
                            <NavLink className={classes.Link} to={"/books"}>Популярные</NavLink>
                        </ListItem>
                        <ListItem>
                            <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                            <NavLink className={classes.Link} to={"/books"}>Новинки</NavLink>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs = {6}>
                    <List>
                        <ListItem>
                            <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                            <NavLink className={classes.Link} to={"/books"}>Обновленные</NavLink>
                        </ListItem>
                        <ListItem>
                            <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                            <NavLink className={classes.Link} to={"/books"}>Бестридеры</NavLink>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default SideBooksMenu;