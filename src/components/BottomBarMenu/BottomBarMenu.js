import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Box} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import classes from './BottomBarMenu.css';


class BottomBarMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return (
            <React.Fragment>
                <AppBar position="static" style={{flexDirection:'row', justifyContent:"space-between"}}>
                    <Toolbar>
                        <Button color="inherit" style={{margin:10}} href={"/help"}>Помощь</Button>
                        <Button color="inherit" style={{margin:10}} href={"/about"}>Про сайт</Button>
                        <Button color="inherit" style={{margin:10}} href={"/support"}>Техническая поддержка</Button>
                    </Toolbar>
                    <Toolbar>
                        <Button color="inherit" style={{margin:10}} href={"/"}>Sovenok</Button>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }
}
export default BottomBarMenu;