import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Box,Popover,Typography,Tooltip} from "@material-ui/core";
import {NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SideBooksMenu from '../SideBooksMenu/SideBooksMenu';
import classes from './HeaderBarMenu.css';


class HeaderBarMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLogged: false,
            popoverOpen:false,
            searchKey:""
        };
    }
    handleClose = () => {
        this.setState({
            popoverOpen : false
        })
    };
    handleClick = () => {
        this.setState({
            popoverOpen : true
        })
    };
    render(){
        return (
            <React.Fragment>
                <AppBar aria-describedby={"books"} position="static" style={{flexDirection:'row', justifyContent:"space-between"}}>
                    <Toolbar>
                        <NavLink to={"/"} style={{color:"white"}}>
                        <Button color="inherit" style={{margin:10}} href={"/"}>
                            <img src={require("./logo3.jpg")} width={32} height={32} alt={"logo"}/>
                        </Button>
                        </NavLink>
                        <Button color="inherit" style={{margin:10}} onClick={this.handleClick}>
                            Книги
                            <ArrowDropDownIcon style={{fontSize:24}}/>
                        </Button>
                        <Popover
                            id={"books"}
                            anchorReference="anchorPosition"
                            anchorPosition={{ top: 75, left: 100 }}
                            open={this.state.popoverOpen}
                            anchorEl={this.state.popoverOpen}
                            onClose={this.handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <SideBooksMenu/>
                        </Popover>
                        <NavLink to={"/news"} style={{color:"white"}}><Button color="inherit" style={{margin:10}}>Новости</Button></NavLink>
                        <NavLink to={"/authors"} style={{color:"white"}}><Button color="inherit" style={{margin:10}}>Авторы</Button></NavLink>

                    </Toolbar>
                    <Toolbar>
                        <Box style={{opacity: 1}}>
                            <Tooltip title={"Введите название книги, автора или ключевое слово..."}>
                                <InputBase
                                    style={{
                                        color:"inherit",
                                        borderWidth: 1,
                                        borderStyle: 'solid',
                                        borderColor: "#ADD8E6",
                                        borderRadius: 16,
                                        padding: 5
                                    }}
                                    value = {this.state.searchKey}
                                    onChange = {(obj)=>this.setState({searchKey:obj.target.value})}
                                    placeholder={"Поиск..."}/>
                            </Tooltip>
                            <NavLink to={"/search?keyword="+this.state.searchKey} style={{color:"white"}}><Button color="inherit" style={{margin:10}}>
                                <SearchIcon width={32} height={32}/>
                            </Button></NavLink>
                        </Box>
                        {!this.state.isLogged && <NavLink to={"/login"} style={{color:"white"}}><Button color="inherit" style={{margin:10}} onClick={()=>{this.setState({isLogged: true})}}>Вход</Button></NavLink>}
                        {!this.state.isLogged && <NavLink to={"/registration"} style={{color:"white"}}><Button color="inherit" style={{margin:10}} >Регистрация</Button></NavLink>}
                            {this.state.isLogged && <NavLink to={"/account"} style={{color:"white"}}><Button color="inherit" style={{margin:10}} ><AccountCircleIcon style={{marginRight:5}}/><b>Личный профиль</b></Button></NavLink>}
                            {this.state.isLogged && <NavLink to={"/"} style={{color:"white"}}><Button color="inherit" style={{margin:10}} onClick={()=>{this.setState({isLogged: false})}}><ExitToAppIcon/></Button></NavLink>}
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }
}

export default HeaderBarMenu;
/*render(){
        return(
            <div className={classes.HeaderBarMenu}>
                <div className={classes.Navigation}>
                    <div className={classes.Section}>
                        Лого
                    </div>
                    <div className={classes.Section}>
                        Книги
                    </div>
                    <div className={classes.Section}>
                        Авторы
                    </div>
                    <div className={classes.Section}>
                        Новости
                    </div>
                </div>
                <div className={classes.Account}>
                    <div className={classes.Section}>
                        <input style={{margin:5}}/>
                        <button>Поиск</button>
                    </div>
                    <button className={classes.Section}>
                        Вход
                    </button>
                    <button className={classes.Section}>
                        Регистрация
                    </button>
                </div>
            </div>
        );
    }*/