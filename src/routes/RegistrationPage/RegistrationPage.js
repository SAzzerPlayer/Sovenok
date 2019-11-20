import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import classes from './RegistrationPage.css';
import {Snackbar} from "@material-ui/core";
import WorkContainer from "../SupportPage/SupportPage";



export default class SignInSide extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            emailCheck:false,
            pass:'',
            passCheck:false,
            rePass:'',
            rePassCheck:false,
            first:'',
            firstCheck:false,
            surname:'',
            surnameCheck:false,
            snackWarnOpen:false,
            snackRegisterOpen:false,
            snackWarnPassOpen : false,
            snackFinishOpen:false,
            snackErrOpen:false
        }
    }
    render() {
        const Register = async () => {
            const data = {
                email : this.state.email,
                first: this.state.first,
                surname: this.state.surname,
                pass: this.state.pass
            };
            let query = await fetch("http://91.231.86.36/register", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
            })
                .then(response => response.json())
                .then(responseJSON => {
                    if(responseJSON.isExisted === false) {
                        this.setState({snackWaitOpen: false, snackFinishOpen: true});
                    }
                    else{
                        this.setState({snackErrOpen:true});
                    }
                });
        };
        const checkFirstName = (obj) => {
            console.log(obj);
            let regExp = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
            this.setState({first:obj.target.value});
            if(obj.target.value.match(regExp) === null || obj.target.value.length === 0) this.setState({firstCheck:true});
            else this.setState({firstCheck:false});
        };
        const checkSurname = (obj) => {
            console.log(obj);
            let regExp = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
            this.setState({surname:obj.target.value});
            if(obj.target.value.match(regExp) === null || obj.target.value.length === 0) this.setState({surnameCheck:true});
            else this.setState({surnameCheck:false});
        };
        const checkEmail = (obj) => {
            console.log(obj);
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
        const checkRePass = (obj) => {
            let regExp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
            this.setState({rePass:obj.target.value});
            if(obj.target.value.match(regExp) === null || obj.target.value.length === 0) this.setState({rePassCheck:true});
            else this.setState({rePassCheck:false});
        };
        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <AccountCircleIcon style={{color: "skyblue"}}/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Регистрация
                        </Typography>
                        <div className={classes.form}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Электронная почта"
                                name="email"
                                value={this.state.email}
                                error={this.state.emailCheck}
                                onChange={checkEmail}
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
                                id="password"
                                value={this.state.pass}
                                error={this.state.passCheck}
                                onChange={checkPass}
                                autoComplete="current-password"
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="re-password"
                                label="Повторите пароль"
                                type="password"
                                id="re-password"
                                value={this.state.rePass}
                                error={this.state.rePassCheck}
                                onChange={checkRePass}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="firstname"
                                label="Имя"
                                id="firstname"
                                value={this.state.first}
                                error={this.state.firstCheck}
                                onChange={checkFirstName}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="surname"
                                label="Фамилия"
                                id="surname"
                                value={this.state.surname}
                                error={this.state.surnameCheck}
                                onChange={checkSurname}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={()=>{
                                    if(this.state.firstCheck || this.state.surnameCheck ||
                                    this.state.passCheck || this.state.rePassCheck ||
                                    this.state.emailCheck) {
                                        this.setState({snackWarnOpen: true})
                                    }
                                    else{
                                        if(this.state.pass.indexOf(this.state.rePass)===-1){
                                            this.setState({
                                                snackWarnPassOpen : true,
                                                checkPass: true,
                                                checkRePass: true
                                            })
                                        }
                                        else {
                                            this.setState({snackRegisterOpen: true})

                                        }
                                    }
                                }}
                            >
                                Зарегистрировать
                            </Button>
                        </div>
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
                    open={this.state.snackRegisterOpen}
                    onClose={()=>{this.setState({snackRegisterOpen:false})}}
                    ContentProps={{
                        'aria-describedby': 'message-idRegister',
                    }}
                    message={<span id="message-idRegister">Идёт регистрация, подождите...</span>}
                />
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                    open={this.state.snackWarnPassOpen}
                    onClose={()=>{this.setState({snackWarnPassOpen:false})}}
                    ContentProps={{
                        'aria-describedby': 'message-idWarnPass',
                    }}
                    message={<span id="message-idWarnPass">Пароли не совпадают! Заполните их верно.</span>}
                />
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                    open={this.state.snackFinishOpen}
                    onClose={()=>{this.setState({snackFinishOpen:false})}}
                    ContentProps={{
                        'aria-describedby': 'message-idFinish',
                    }}
                    message={<span id="message-idFinish">Регистрация успешна! Пожалуйста, проверьте свою почту на письмо активации аккаунта.</span>}
                />
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                    open={this.state.snackErrOpen}
                    onClose={()=>{this.setState({snackErrOpen:false})}}
                    ContentProps={{
                        'aria-describedby': 'message-idErr',
                    }}
                    message={<span id="message-idErr">Веденная электронная почта уже используется! Введите другой адрес почты.</span>}
                />
            </Grid>
        );
    }
}