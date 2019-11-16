import React from 'react';
import {Grid,List,ListItem,Button} from "@material-ui/core";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
class PageListSwitcher extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(
            <Grid container item xs
                direction={"row"}
                  justify={"space-between"}
            >
                <Grid item xs={2}><Button variant={"outlined"}><KeyboardBackspaceIcon style={{fontSize:18}}/>Назад</Button></Grid>
                <Grid item xs={8}/>

                <Grid container item xs={2} justify={"flex-end"}><Button variant={"outlined"}>Вперёд<ArrowRightAltIcon/></Button></Grid>
            </Grid>
        );
    }
}

export default PageListSwitcher;