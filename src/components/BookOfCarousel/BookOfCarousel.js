import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import classes from './BookOfCarousel.css';
class BookOfCarousel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cover:require('./page.png'),
            isLoaded:false
        };
        console.log(this.props.data);

    }
    componentDidMount(){
        if(this.props.cover.trim().length > 10){
            this.setState({cover:this.props.cover});
            console.log("WasChanged")
        }
    }
    render(){
        return(
            <Grid item xs={2}>
                <img width={90} height={120} src={this.state.cover} style={{backgroundColor:"skyblue"}}/>
                <Typography style={{fontSize:9, color:'grey'}}>{this.props.data.genre}</Typography>
                <NavLink className={classes.Link} to={"/book/?book="+this.props.data.key}><Typography style={{fontSize:12}}>{this.props.data.name}</Typography></NavLink>
                <Typography style={{fontSize:10, color:"purple"}}>{this.props.data.firstname +" "+this.props.data.surname} </Typography>
            </Grid>
        );
    }
}
export default BookOfCarousel;