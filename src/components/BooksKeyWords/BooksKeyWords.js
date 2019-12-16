import React from 'react';
import {List, ListItem, ListItemText, Button} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import 'typeface-roboto';
class BooksKeyWords extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showKeys:Array()
        }
    }
    render(){
        const handleClick = (path) => {
            this.props.history.push('/');
            setTimeout(()=>{this.props.history.push(path)},100);
        }
        const Inside = (props) => {
            return(
                <List>
                    {this.props.datas.map((currElem,index,arr)=>{
                        return(
                            <ListItem style={{flexDirection:"row"}}>
                                <FiberManualRecordIcon small style={{fontSize:12}}/>
                                <Button onClick={()=>{handleClick('/books?key='+currElem.key+'&sort=rate')}}>
                                    <u><i>{currElem.key}</i></u>
                                </Button>
                            </ListItem>
                        );
                    })}
                </List>
            );
        };
        if(this.props.datas.length === 0) return (<List><h4>Отображение невозможно</h4></List>);
        else return (<Inside/>);
    }
}
export default BooksKeyWords;