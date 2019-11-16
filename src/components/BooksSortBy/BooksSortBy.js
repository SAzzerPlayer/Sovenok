import React from 'react';
import {Grid,List,ListItem,Button} from '@material-ui/core';
import classes from './BooksSortBy.css';
class BooksSortBy extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <Grid container item xs direction={"row"} alignItems={"center"} className={classes.SortTable}>
                <Grid item xs={3}><b>Сортировать по:</b></Grid>
                <Grid container item xs={9} direction={"row"} justify={"space-between"}>
                    <Grid item xs><Button>Популярные</Button></Grid>
                    <Grid item xs><Button>Новинки</Button></Grid>
                    <Grid item xs><Button>Бестридеры</Button></Grid>
                    <Grid item xs><Button>Обновленные</Button></Grid>
                </Grid>
            </Grid>
        );
    }
}

export default BooksSortBy;