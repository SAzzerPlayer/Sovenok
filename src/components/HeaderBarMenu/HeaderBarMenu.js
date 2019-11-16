import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Box,Popover,Typography} from "@material-ui/core";
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
            isLogged: true,
            popoverOpen:false
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
                        <Button color="inherit" style={{margin:10}} href={"/"}>
                            <img src={require("./logo3.jpg")} width={32} height={32} alt={"logo"}/>
                        </Button>
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
                        <Button color="inherit" style={{margin:10}} href={"/news"}>Новости</Button>
                        <Button color="inherit" style={{margin:10}} href={"/authors"}>Авторы</Button>

                    </Toolbar>
                    <Toolbar>
                        <Box style={{opacity: 1}}>
                            <InputBase
                                style={{
                                    color:"inherit",
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                    borderColor: "#ADD8E6",
                                    borderRadius: 16,
                                    padding: 5
                                }}
                                placeholder={"Поиск..."}/>
                            <Button color="inherit" style={{margin:10}} href={"/search"}>
                                <SearchIcon width={32} height={32}/>
                            </Button>
                        </Box>
                        {!this.state.isLogged && <Button color="inherit" style={{margin:10}} href={"/login"} onClick={()=>{this.setState({isLogged: true})}}>Вход</Button>}
                        {!this.state.isLogged && <Button color="inherit" style={{margin:10}} href={"/registration"}>Регистрация</Button>}
                        {this.state.isLogged && <Button color="inherit" style={{margin:10}} href={"/account"}><AccountCircleIcon style={{marginRight:5}}/><b>Личный профиль</b></Button>}
                        {this.state.isLogged && <Button color="inherit" style={{margin:10}} href={"/logout"} onClick={()=>{this.setState({isLogged: false})}}><ExitToAppIcon/></Button>}
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