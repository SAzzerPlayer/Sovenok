import React from 'react';
import Radium from 'radium';
import classes from "./WorkContainer.css";
import {Container, Grid, Typography} from '@material-ui/core';
class WorkContainer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Grid
                style={{flex:1, margin:20}}
                container
                alignItems={"center"}
                direction={"row"}
                justify={"space-around"}
            >
                <Grid item xs={1}>
                </Grid>
                <Grid item lg={10} maxWidth={"lg"}>
                    {this.props.children}
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        );
    }
}

export default Radium(WorkContainer);