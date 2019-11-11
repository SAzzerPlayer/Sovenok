import React from 'react';
import {List, ListItem, ListItemText, Button} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import 'typeface-roboto';
class BooksKeyWords extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <List>
                <ListItem style={{flexDirection:"row"}}>
                    <FiberManualRecordIcon small/>
                    <Button>
                        <u><i>Студенты</i></u>
                    </Button>
                </ListItem>
                <ListItem style={{flexDirection:"row"}}>
                    <FiberManualRecordIcon small/>
                    <Button><u><i>Школа</i></u></Button>
                </ListItem>
                <ListItem style={{flexDirection: "row"}}>
                    <FiberManualRecordIcon small/>
                    <Button><u><i>Заполярье</i></u></Button>
                </ListItem>
                <ListItem style={{flexDirection: "row"}}>
                    <FiberManualRecordIcon small/>
                    <Button><u><i>Существа</i></u></Button>
                </ListItem>
                <ListItem style={{flexDirection: "row"}}>
                    <FiberManualRecordIcon small/>
                    <Button><u><i>РПГ</i></u></Button>
                </ListItem>
            </List>
        );
    }
}
export default BooksKeyWords;