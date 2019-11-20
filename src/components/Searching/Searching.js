import React from 'react';
import {Grid} from '@material-ui/core';
import GifPlayer from 'react-gif-player';

export default class Searching extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Grid container item xs
                  direction = "column"
                  justify={"center"}
                  alignItems={"center"}
            >
                <Grid item xs>
                    <GifPlayer gif={require('./load.gif')} autoplay={true}/>
                </Grid>
                <Grid item xs><h1>Ведётся поиск...</h1></Grid>
            </Grid>
        );
    }
}