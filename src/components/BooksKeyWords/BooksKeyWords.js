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
                    <FiberManualRecordIcon small style={{fontSize:12}}/>
                    <Button>
                        <u><i>Студенты</i></u>
                    </Button>
                </ListItem>
                <ListItem style={{flexDirection:"row"}}>
                    <FiberManualRecordIcon small style={{fontSize:12}}/>
                    <Button><u><i>Школа</i></u></Button>
                </ListItem>
                <ListItem style={{flexDirection: "row"}}>
                    <FiberManualRecordIcon small style={{fontSize:12}}/>
                    <Button><u><i>Заполярье</i></u></Button>
                </ListItem>
                <ListItem style={{flexDirection: "row"}}>
                    <FiberManualRecordIcon small style={{fontSize:12}}/>
                    <Button><u><i>Существа</i></u></Button>
                </ListItem>
                <ListItem style={{flexDirection: "row"}}>
                    <FiberManualRecordIcon small style={{fontSize:12}}/>
                    <Button><u><i>Океан</i></u></Button>
                </ListItem>
                <ListItem style={{flexDirection: "row"}}>
                    <FiberManualRecordIcon small style={{fontSize:12}}/>
                    <Button><u><i>Англия</i></u></Button>
                </ListItem>
                <ListItem style={{flexDirection: "row"}}>
                    <FiberManualRecordIcon small style={{fontSize:12}}/>
                    <Button><u><i>Гонки</i></u></Button>
                </ListItem>
                <ListItem style={{flexDirection: "row"}}>
                    <FiberManualRecordIcon small style={{fontSize:12}}/>
                    <Button><u><i>Судно</i></u></Button>
                </ListItem>
                <ListItem style={{flexDirection: "row"}}>
                    <FiberManualRecordIcon small style={{fontSize:12}}/>
                    <Button><u><i>Посёлок</i></u></Button>
                </ListItem>
                <ListItem style={{flexDirection: "row"}}>
                    <FiberManualRecordIcon small style={{fontSize:12}}/>
                    <Button><u><i>Вокруг мира</i></u></Button>
                </ListItem>
                <ListItem style={{flexDirection: "row"}}>
                    <FiberManualRecordIcon small style={{fontSize:12}}/>
                    <Button><u><i>Сыщик</i></u></Button>
                </ListItem>
            </List>
        );
    }
}
export default BooksKeyWords;