import React from 'react';
import {Grid} from '@material-ui/core';
import GifPlayer from 'react-gif-player';
class Loading extends React.Component{
    constructor(props){
        super(props);
        this.state= {};
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
            </Grid>
        );
    }
}

export default Loading;