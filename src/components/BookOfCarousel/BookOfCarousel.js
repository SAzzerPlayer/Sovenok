import React from 'react';
import {Grid, Typography} from '@material-ui/core';

class BookOfCarousel extends React.Component{
    constructor(props){
        super(props);
        this.state= {"genre":"Фантастика"};
    }
    render(){
        return(
            <Grid item xs={2}>
                <img width={90} height={120} src={require('./page.jpg')} style={{backgroundColor:"skyblue"}}/>
                <Typography style={{fontSize:9, color:'grey'}}>{this.state.genre}</Typography>
                <Typography container={"a"} style={{fontSize:12}}>Алиса в стране чудес</Typography>
                <Typography style={{fontSize:10, color:"purple"}}>Лалаленд Лалалендович</Typography>
            </Grid>
        );
    }
}
export default BookOfCarousel;