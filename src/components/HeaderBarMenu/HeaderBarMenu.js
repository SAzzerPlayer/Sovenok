import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Box} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import classes from './HeaderBarMenu.css';


class HeaderBarMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return (
            <React.Fragment>
                <AppBar position="static" style={{flexDirection:'row', justifyContent:"space-between"}}>
                    <Toolbar>
                        <Button color="inherit" style={{margin:10}}>
                            <img src={require("./logo3.jpg")} width={48} height={48} sizes={"cover"}/>
                        </Button>
                        <Button color="inherit" style={{margin:10}}>Books</Button>
                        <Button color="inherit" style={{margin:10}}>Articles</Button>
                        <Button color="inherit" style={{margin:10}}>Authors</Button>

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
                                placeholder={"Search..."}/>
                            <Button color="inherit">
                                <SearchIcon width={32} height={32}/>
                            </Button>
                        </Box>
                        <Button color="inherit" style={{margin:10}}>Login</Button>
                        <Button color="inherit" style={{margin:10}}>Register</Button>
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