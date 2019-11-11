import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Box} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import classes from './HeaderBarMenu.css';


class HeaderBarMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLogged: false
        };
    }

    render(){
        return (
            <React.Fragment>
                <AppBar position="static" style={{flexDirection:'row', justifyContent:"space-between"}}>
                    <Toolbar>
                        <Button color="inherit" style={{margin:10}} href={"/"}>
                            <img src={require("./logo3.jpg")} width={32} height={32} alt={"logo"}/>
                        </Button>
                        <Button color="inherit" style={{margin:10}} href={"/books"}>Книги</Button>
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
                        {!this.state.isLogged && <Button color="inherit" style={{margin:10}} href={"/login"}>Вход</Button>}
                        {!this.state.isLogged && <Button color="inherit" style={{margin:10}} href={"/registration"}>Регистрация</Button>}
                        {this.state.isLogged && <Button color="inherit" style={{margin:10}} href={"/account"}><AccountCircleIcon/><b>Личный профиль</b></Button>}
                        {this.state.isLogged && <Button color="inherit" style={{margin:10}} href={"/logout"}><ExitToAppIcon/></Button>}
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