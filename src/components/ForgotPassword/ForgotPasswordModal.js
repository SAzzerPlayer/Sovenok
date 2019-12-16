import React from 'react';
import Modal from '@material-ui/core/Modal';
import classes from './ForgotPasswordModel.css';
import {Button,IconButton,TextField,Snackbar} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
export default class ForgotPasswordModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isSent:false,
            email:"",
            emailCheck:true
        };
    }
    render(){
        const checkEmail = (obj) => {
            let regExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
            this.setState({email:obj.target.value});
            if(obj.target.value.match(regExp) === null || obj.target.value.length === 0) this.setState({emailCheck:true});
            else this.setState({emailCheck:false});
        };
        const handleClick = (obj) => {
            this.setState({isSent:true});
            let data = {email:this.state.email};
            fetch("http://91.231.86.36/login/recovery",
                {
                    method:"POST",
                    body:JSON.stringify(data),
                    headers:{
                        "Content-Type":"application/json"
                    }
                }).then(response=>response.json())
                .then(responseJSON => {
                    console.log(responseJSON);
                })
        };
        return(
            <Modal
                aria-labelledby={"forgotModal"}
                aria-describedby={"ForgotPasswordModal"}
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <div className={classes.modal}>
                    <div className={classes.header}>
                        <u><h2>Восстановление пароля<IconButton style={{marginLeft:20}} onClick = {this.props.onClose}><CloseIcon/></IconButton></h2></u>
                        <h3>Чтобы получить доступ к своему аккаунту, введите электронную почту и мы отправим вам письмо с новым паролем для входа</h3>
                        <TextField
                            label={"Электронная почта"}
                            value={this.state.email}
                            error={this.state.emailCheck}
                            onChange={checkEmail}
                        />
                        <Button
                            required
                            variant={"outlined"}
                            style={{marginLeft:20,marginTop:15}}
                            disabled={this.state.emailCheck}
                            onClick={handleClick}
                        >Отправить</Button>
                    </div>
                    <Snackbar
                        anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                        open={this.state.isSent}
                        onClose={(obj)=>{
                            this.setState({isSent:false});
                            this.props.onClose(Object());
                        }}
                        ContentProps={{
                            'aria-describedby': 'message-idLogin',
                        }}
                        message={<span id="message-idLogin">Запрос на изменение пароля был отправлен. Ожидайте письмо... </span>}
                    />
                </div>
            </Modal>
        );
    }
}