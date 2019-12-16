import React from 'react';
import {Link,Tooltip} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import {NavLink,Redirect} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import classes from './LoginPage.css';
import {Snackbar} from "@material-ui/core";
import ForgotPasswordModal from '../../components/ForgotPassword/ForgotPasswordModal';



export default class SignInSide extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ////////
            email : '',
            emailCheck : false,
            //////////
            pass: '',
            passCheck : false,
            //////////
            snackWarnOpen: false,
            snackLoginOpen: false,
            snackUnExistOpen:false,
            snackNonValidOpen:false,
            remember:false,
            showModal: false

        };
    }
    Login(){
        const data = {
            email:this.state.email,
            pass: this.state.pass
        };
        fetch("http://91.231.86.36/login/?email="+data.email+"&pass="+data.pass,{
            headers:{
                "Access-Control-Allow-Origin":"http://91.231.86.36"
            }
        })
            .then((response)=>response.json())
            .then((responseJSON) => {
                if(responseJSON.isExisted === true){
                    if(responseJSON.validPass === true){
                        //Внесение в локал хранилище и переход в аккаунт пользователя
                        this.setState({snackLoginOpen:false});
                        localStorage.setItem("user",JSON.stringify(responseJSON.user));
                        console.log(this.props);
                        this.props.history.push("/account");
                    }
                    else{
                        this.setState({snackNonValidOpen:true});
                    }
                }
                else{
                    this.setState({snackUnExistOpen:true});
                }
            })
            .catch((err)=>{console.log(err);})
    }
    render() {
        const checkEmail = (obj) => {
            let regExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
            this.setState({email:obj.target.value});
            if(obj.target.value.match(regExp) === null || obj.target.value.length === 0) this.setState({emailCheck:true});
            else this.setState({emailCheck:false});
        };
        const checkPass = (obj) => {
            let regExp = /(?=.*[0-9])(?=.*[!@$%^*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@$%^*]{6,}/g;
            this.setState({pass:obj.target.value});
            if(obj.target.value.match(regExp) === null || obj.target.value.length === 0) this.setState({passCheck:true});
            else this.setState({passCheck:false});
        };
        const handleClose = (obj) => {
            this.setState({showModal:false})
        }
        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon style={{color: "skyblue"}}/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Авторизация
                        </Typography>
                            <Tooltip title={"Введите вашу электронную почту"}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Электронная почта"
                                    value = {this.state.email}
                                    check = {this.state.emailCheck}
                                    onChange = {checkEmail}
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                            </Tooltip>
                            <Tooltip title={"Пароль должен содержать 1 символ нижнего и верхнего регистра, 1 цифру и 1 спец.символ." +
                            " Длина пароля не менее 6 символов."}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Пароль"
                                    type="password"
                                    value = {this.state.pass}
                                    error = {this.state.passCheck}
                                    onChange = {checkPass}
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Tooltip>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick = {()=>{
                                    if(this.state.emailCheck || this.state.passCheck) {
                                        this.setState({snackWarnOpen: true});
                                    }
                                    else {
                                        this.setState({snackLoginOpen:true});
                                        this.Login();
                                    }
                                }}
                            >
                                Войти
                            </Button>
                            <Grid container style={{marginTop: 10}}>
                                <Grid item xs>
                                    <Link onClick={(ref)=>{this.setState({showModal:true})}} variant="body2"
                                        style={{cursor:"pointer"}}
                                    >
                                        Забыли пароль?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <NavLink to="/registration" variant="body2">
                                        {"Все еще не имеете аккаунта? Зарегистрируйтесь"}
                                    </NavLink>
                                </Grid>
                            </Grid>
                    </div>
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                    open={this.state.snackWarnOpen}
                    onClose={()=>{this.setState({snackWarnOpen:false})}}
                    ContentProps={{
                        'aria-describedby': 'message-idWarn',
                    }}
                    message={<span id="message-idWarn">Поля введены неверно, пожалуйста, заполните их.</span>}
                />
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                    open={this.state.snackLoginOpen}
                    onClose={()=>{this.setState({snackLoginOpen:false})}}
                    ContentProps={{
                        'aria-describedby': 'message-idLogin',
                    }}
                    message={<span id="message-idLogin">Авторизация, подождите... </span>}
                />
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                    open={this.state.snackUnExistOpen}
                    onClose={()=>{this.setState({snackUnExistOpen:false})}}
                    ContentProps={{
                        'aria-describedby': 'message-idUnExist',
                    }}
                    message={<span id="message-idUnExist">Аккаунта с таким почтовым адресом не найдено! </span>}
                />
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                    open={this.state.snackNonValidOpen}
                    onClose={()=>{this.setState({snackNonValidOpen:false})}}
                    ContentProps={{
                        'aria-describedby': 'message-idNonValid',
                    }}
                    message={<span id="message-idNonValid">Неверный пароль входа! </span>}
                />
                <ForgotPasswordModal
                    open={this.state.showModal}
                    onClose={handleClose}
                />
            </Grid>
        );
    }
}