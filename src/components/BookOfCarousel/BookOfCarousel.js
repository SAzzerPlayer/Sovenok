import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import classes from './BookOfCarousel.css';
class BookOfCarousel extends React.Component{
    constructor(props){
        super(props);
        this.state= {"genre":"Фантастика"};
    }
    render(){
        return(
            <Grid item xs={2}>
                <img width={90} height={120} src={require('./page.png')} style={{backgroundColor:"skyblue"}}/>
                <Typography style={{fontSize:9, color:'grey'}}>{this.state.genre}</Typography>
                <NavLink className={classes.Link} to={"/book"}><Typography style={{fontSize:12}}>Алиса в стране чудес</Typography></NavLink>
                <Typography style={{fontSize:10, color:"purple"}}>Лалаленд Лалалендович</Typography>
            </Grid>
        );
    }
}
export default BookOfCarousel;