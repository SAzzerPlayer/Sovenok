import React from 'react';
import {Grid,Button} from '@material-ui/core';
import classes from './EditorPage.css';
import EditorManip from '../../components/Editor/Editor';
class EditorPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <Grid container item xs direction={"column"} alignItems = {"center"} className={classes.Table}>
                <Grid item xs><h2>Редактирование текста</h2></Grid>
                <Grid container item xs direction={"row"} justify={"space-between"}>
                    <Grid item xs/>
                    <Grid item xs style={{textAlign:"center"}}>
                    <h3>Глава 1. Вступление</h3>
                    </Grid>
                    <Grid container item xs alignItems={"center"}>
                        <Button variant={"contained"} color={"primary"} style={{marginRight:10}}>Отмена</Button>
                        <Button variant={"contained"} color={"secondary"}>Сохранить</Button>
                    </Grid>
                </Grid>
                <EditorManip/>

            </Grid>
        );
    }
}

export default EditorPage;