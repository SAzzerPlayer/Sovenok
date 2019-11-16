import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Box} from "@material-ui/core";
import {NavLink} from "react-router-dom";
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
                        <NavLink to={"/help"} style={{color:"white"}}><Button color="inherit" style={{margin:10}}>Помощь</Button></NavLink>
                        <NavLink to={"/about"} style={{color:"white"}}><Button color="inherit" style={{margin:10}} >Про сайт</Button></NavLink>
                        <NavLink to={"/support"} style={{color:"white"}}><Button color="inherit" style={{margin:10}} >Техническая поддержка</Button></NavLink>
                    </Toolbar>
                    <Toolbar>
                        <NavLink to={"/"} style={{color:"white"}}><Button color="inherit" style={{margin:10}} href={"/"}>Sovenok</Button></NavLink>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }
}
export default BottomBarMenu;