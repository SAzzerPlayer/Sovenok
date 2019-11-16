import React from 'react';
import {Button, Divider, Grid} from '@material-ui/core';
import classes from './RecommendContainer.css';
import BookBanner from '../../components/BookBanner/BookBanner';
class RecommendContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(
            <Grid
                style={{flex:1, margin:20}}
                container
                direction={"row"}
                justify={"space-around"}
                spacing={5}
            >
                <Grid item xs={1}>
                </Grid>
                <Grid container item lg={7} maxWidth={"lg"} style={{}}>
                    {this.props.children}
                </Grid>
                <Grid container item lg={2} style={{marginTop:5,paddingLeft:25,backgroundColor:"snow"}} direction={"column"} spacing={1} className={classes.Table}>
                    <Divider/>
                    <h3>ТОП фантастика</h3>
                    <Divider/>
                    <Grid container item xs={5} direction={"column"} style={{paddingLeft:15}}>
                        <BookBanner/>
                        <BookBanner/>
                        <BookBanner/>
                    </Grid>
                    <Divider/>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        );
    }
}

export default RecommendContainer;