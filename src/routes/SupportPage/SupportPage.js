import React from 'react';
import WorkContainer from '../../container/WorkContainer/WorkContainer';
import {Grid,Container,Button,Snackbar,Tooltip} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import classes from "./SupportPage.css";
import TextField from '@material-ui/core/TextField';

class SupportPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstname : "",
            firstnameCheck:false,
            surname: "",
            surnameCheck:false,
            email: "",
            emailCheck: false,
            theme: "",
            themeCheck: false,
            text: "",
            textCheck: false,
            snackFinishOpen:false,
            snackWaitOpen:false,
            snackWarnOpen:false
        };
    }
    render(){

        const SendLetter = () => {
            const data = {
                email:this.state.email,
                first:this.state.firstname,
                surname:this.state.surname,
                text:this.state.text,
                theme:this.state.theme
            };
            fetch("http://91.231.86.36/feedback/", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
            })
                .then(response => response.json())
                .then(responseJSON => {
                    this.setState({snackWaitOpen:false,snackFinishOpen:true});
                });
        };
        const checkFirstName = (obj) => {
            console.log(obj);
            let regExp = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
            this.setState({firstname:obj.target.value});
            if(obj.target.value.match(regExp) === null || obj.target.value.length === 0) this.setState({firstnameCheck:true});
            else this.setState({firstnameCheck:false});
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
        return(
            <WorkContainer>
                <Grid container item
                      className={classes.Table}
                      alignItems={'center'}
                      justify={"center"}
                      direction={"column"}
                      spacing={4}
                      >
                    <Grid container item
                        justify={"center"}
                          xs
                    >
                        <Grid>
                            <h2>Обратная связь</h2>
                        </Grid>
                    </Grid>
                    <Grid container item
                          justify={"center"}
                          xs
                          spacing={2}
                          >
                        <Grid item xs justify={"center"} alignContent={"center"} direction={"row"}>
                            <b>Имя</b>
                            <Tooltip title={"Введите ваше имя. Допустимы символы кириллицы и латиницы"}>
                                <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                error={this.state.firstnameCheck}
                                fullWidth
                                id="firstname"
                                label="Имя"
                                name="firstname"
                                value={this.state.firstname}
                                onChange = {checkFirstName}
                                autoFocus
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs>
                            <b>Фамилия</b>
                            <Tooltip title={"Введите вашу фамилию. Допустимы символы кириллицы и латиницы"}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="surname"
                                    label="Фамилия"
                                    error={this.state.surnameCheck}
                                    value={this.state.surname}
                                    onChange={checkSurname}
                                    name="surname"
                                    autoFocus
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs>
                            <b>Электронная почта</b>
                            <Tooltip title={"Введите вашу электронную почту"}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Электронная почта"
                                    error={this.state.emailCheck}
                                    value={this.state.email}
                                    onChange={checkEmail}
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Grid container item
                          justify={'center'}
                          xs
                          >
                        <Grid item xs>
                            <b>Тема письма</b>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                error={this.state.themeCheck}
                                value={this.state.theme}
                                onChange = {(obj)=>{
                                    this.setState({theme:obj.target.value});
                                    if(obj.target.value.length === 0)this.setState({themeCheck : true})
                                    else this.setState({themeCheck:false});
                                }}
                                id="theme"
                                label="Тема письма"
                                name="theme"
                                autoFocus
                            />
                        </Grid>
                    </Grid>
                    <Grid container item
                          justify={'center'}
                          xs
                          >
                        <Grid item xs>
                            <b>Письмо</b>
                            <Tooltip title={"Опишите вашу проблему"}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    id="text"
                                    label="Текст письма"
                                    error={this.state.textCheck}
                                    value={this.state.text}
                                    onChange = {(obj)=>{
                                        this.setState({text:obj.target.value});
                                        if(obj.target.value.length === 0)this.setState({textCheck : true})
                                        else this.setState({textCheck:false});
                                    }}
                                    name="text"
                                    autoFocus
                                    fullWidth
                                    rows={10}
                                    multiline
                                />
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Grid container item
                          justify={"center"}
                          xs>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={()=>{


                                if(!this.state.firstnameCheck && !this.state.surnameCheck &&
                                !this.state.emailCheck && !this.state.themeCheck &&
                                    !this.state.textCheck){
                                    this.setState({snackWaitOpen:true})
                                    SendLetter();
                                }
                                else this.setState({snackWarnOpen:true})
                            }}
                            className={classes.submit}
                        >
                            Отправить
                        </Button>
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                    open={this.state.snackWaitOpen}
                    onClose={()=>{this.setState({snackWaitOpen:false})}}
                    ContentProps={{
                        'aria-describedby': 'message-idWaiting',
                    }}
                    message={<span id="message-idWaiting">Письмо отправляется, подождите...</span>}
                />
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                    open={this.state.snackFinishOpen}
                    onClose={()=>{this.setState({snackFinishOpen:false})}}
                    ContentProps={{
                        'aria-describedby': 'message-idFinish',
                    }}
                    message={<span id="message-idFinish">Письмо было отправлено!</span>}
                />
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                    open={this.state.snackWarnOpen}
                    onClose={()=>{this.setState({snackWarnOpen:false})}}
                    ContentProps={{
                        'aria-describedby': 'message-idWarn',
                    }}
                    message={<span id="message-idWarn">Поля введены неверно, пожалуйста, заполните их.</span>}
                />
            </WorkContainer>
        );
    }
}

export default SupportPage;