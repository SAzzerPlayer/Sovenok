import React from 'react';
import {Grid,List,ListItem,Button} from "@material-ui/core";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
class PageListSwitcher extends React.Component{
    constructor(props){
        super(props);
        this.state={ShowText: this.props.ShowText};
    }
    render(){
        return(
            <Grid container item xs
                direction={"row"}
                  justify={"space-between"}
            >
                <Grid item xs={3}><Button variant={"outlined"}><KeyboardBackspaceIcon style={{fontSize:18}}/>
                    {this.state.ShowText && "Назад"}
                </Button></Grid>
                <Grid item xs={6}/>

                <Grid container item xs={3} justify={"flex-end"}><Button variant={"outlined"}>
                    {this.state.ShowText && "Вперёд"}
                    <ArrowRightAltIcon/></Button></Grid>
            </Grid>
        );
    }
}

export default PageListSwitcher;