import React from 'react';
import {Grid,Link,Divider,Container,List,ListItem,ListItemIcon} from '@material-ui/core';
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
                                <Link className={classes.Link}>Все жанры</Link>
                        </ListItem>
                        <ListItem>
                                <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                <Link className={classes.Link}>Детектив</Link>
                        </ListItem>
                        <ListItem>
                                <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                <Link className={classes.Link}>Фэнтези</Link>
                        </ListItem>
                        <ListItem>
                                <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                <Link className={classes.Link}>Боевик</Link>
                        </ListItem>
                        <ListItem>
                                <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                                <Link className={classes.Link}>Проза</Link>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <List>
                        <ListItem>
                            <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                            <Link className={classes.Link}>Мистика\Ужасы</Link>
                        </ListItem>
                        <ListItem>
                            <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                            <Link className={classes.Link}>Триллеры</Link>
                        </ListItem>
                        <ListItem>
                            <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                            <Link className={classes.Link}>Фантастика</Link>
                        </ListItem>
                        <ListItem>
                            <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                            <Link className={classes.Link}>Любовные романы</Link>
                        </ListItem>
                        <ListItem>
                            <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                            <Link className={classes.Link}>Разное</Link>
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
                            <Link className={classes.Link}>Популярные</Link>
                        </ListItem>
                        <ListItem>
                            <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                            <Link className={classes.Link}>Новинки</Link>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs = {6}>
                    <List>
                        <ListItem>
                            <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                            <Link className={classes.Link}>Обновленные</Link>
                        </ListItem>
                        <ListItem>
                            <FiberManualRecordOutlinedIcon style={{fontSize:8,margin:5}}/>
                            <Link className={classes.Link}>Бестридеры</Link>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default SideBooksMenu;