import React from 'react';
import {Link} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import {NavLink} from 'react-router-dom';
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
            email : '',
            emailCheck : false,
            pass: '',
            passCheck : false,
            snackWarnOpen: false,
            snackLoginOpen: false,
            snackUnExistOpen:false,
            snackNonValidOpen:false,
            remember:false,
            showModal: false

        };
    }
    render() {
        const Login = async () => {
            const data = {
                email:this.state.email,
                pass: this.state.pass
            };
            let query = fetch("http://91.231.86.36/login?email="+data.email+"&pass="+data.pass,{
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // no-referrer, *client
            })
                .then((response)=>response.json())
                .then((responseJSON) => {
                    if(responseJSON.isExisted === true){
                        if(responseJSON.validPass === true){
                            //Внесение в локал хранилище и переход в аккаунт пользователя
                        }
                        else{
                            this.setState({snackNonValid:true});
                        }
                    }
                    else{
                        this.setState({snackUnExist:true});
                    }
                })
        };
        const checkEmail = (obj) => {
            let regExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
            this.setState({email:obj.target.value});
            if(obj.target.value.match(regExp) === null || obj.target.value.length === 0) this.setState({emailCheck:true});
            else this.setState({emailCheck:false});
        };
        const checkPass = (obj) => {
            let regExp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
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
                            <div style={{alignItems:"flex-start"}}>
                                <Checkbox value={this.state.remember} color="primary"
                                onChange={(obj)=>{this.setState({remember:obj.target.checked})}}/>Запомнить меня
                            </div>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick = {()=>{
                                    if(this.state.emailCheck || this.state.passCheck) this.setState({snackWarnOpen:true});
                                    else this.setState({snackLoginOpen:true});
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