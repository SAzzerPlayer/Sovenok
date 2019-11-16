import React from 'react';
import {Container,Box,Grid} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import classes from './BookBanner.css';

class BookBanner extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(
            <Grid container item xs direction={"column"} style={{margin:10}}>
                <img width={135} height={180} style={{backgroundColor:"skyblue"}} src={require('./page.png')}/>
                <div style={{fontSize:16, color: "purple", textAlign:"center",marginBottom:0}}>
                    <NavLink className={classes.Link} to={"/book"}><b>Алиса в стране чудес</b></NavLink>
                    <br/>
                    <i>Лалаленд Лалалендович</i>
                </div>
            </Grid>
        );
    }
}

export default BookBanner;