import React from 'react';
import {Grid, Button, TextField,Dialog, DialogContent, DialogContentText,DialogActions,DialogTitle,Tooltip, Snackbar} from '@material-ui/core';
import AccountContainer from '../../container/AccountContainer/AccountContainer';
import classes from './EditProfilePage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
class EditProfile extends React.Component{
    constructor(props){
        super(props);
        let user = JSON.parse(localStorage.getItem("user"));
        this.state={
            userKey:user.id,
            birthday : new Date(),
            noEdit: true,
            personalData: {},
            ///////////////////////////////
            firstname:"",
            surname:'',
            avatar:'',
            announce:'',
            /////////////////////
            pass:'',
            newPass:'',
            newRePass:'',
            //////////////////
            isOpenDialog:false,
            isAuthor:false,
            notes:"",
            ///////////////////
            isOpenSnackInvalid: false,
            isOpenSnackSuccess: false,
            isOpenSnackEmpty: false
        }
    }
    componentDidMount(){
        fetch("http://91.231.86.36/account/userinfo?user="+this.state.userKey)
            .then((response)=>{return response.json();})
            .then((responseJSON) => this.setState(
                {
                    personalData:responseJSON.user,
                    firstname:responseJSON.user.firstname,
                    surname:responseJSON.user.surname,
                    avatar:responseJSON.user.avatar,
                    birthday:new Date(responseJSON.user.birthday),
                    announce:responseJSON.user.quote,
                    isAuthor:responseJSON.isAuthor
                }));
    }

    handleToEdit=()=>{
        this.setState({noEdit:false});
    };
    handleToClose=()=>{
        this.setState({noEdit:true});
        this.setState({
            firstname:this.state.personalData.firstname,
            surname:this.state.personalData.surname,
            avatar:this.state.personalData.avatar,
            announce:this.state.personalData.announce,
            birthday:new Date(this.state.personalData.birthday)
        })
    };
    handleToSave=()=>{
        this.setState({noEdit:true});
        let data = {
            firstname:this.state.firstname,
            surname: this.state.surname,
            avatar: this.state.avatar,
            quote:this.state.announce,
            birthday: this.state.birthday,
            key: this.state.userKey
        };
        fetch("http://91.231.86.36/account/update/info/", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
        })
            .then(response => response.json())
            .then(responseJSON => {
                if(responseJSON.isApply) {
                    let user = JSON.parse(localStorage.getItem("user"));
                    user.firstname = data.firstname;
                    user.surname = data.surname;
                    user.birthday = data.birthday;
                    user.quote = data.quote;
                    user.avatar = data.avatar;
                    localStorage.setItem("user", JSON.stringify(user));
                }
            })
    };

    render(){
        const handleToChangePass = ()=>{
            console.log(this);

            if(this.state.newPass === this.state.newRePass) {
                let data = {
                    pass:this.state.pass,
                    newPass:this.state.newPass,
                    key:this.state.userKey
                };
                fetch("http://91.231.86.36/account/update/password/", {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
                })
                    .then(response => response.json())
                    .then(responseJSON => {this.setState({isOpenSnackSuccess:true})})
            }
            else this.setState({isOpenSnackInvalid: true});
        };
        const handleToDeleteUser = ()=>{
            let user = JSON.parse(localStorage.getItem("user")).id;
            let data = {user:user,isAuthor:this.state.isAuthor,notes:this.state.notes};
            fetch("http://91.231.86.36/account/delete",
                {
                    method:"POST",
                    body:JSON.stringify(data),
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                .then(response=>response.json())
                .then(responseJSON => {
                    localStorage.clear();
                    this.props.history.push("/");
                })
        };
        return(
            <AccountContainer>
                <Grid container item xs direction={"column"} alignItems={"center"} className={classes.Table} spacing={1}>
                    <Grid item xs><h1>Персональная информация</h1></Grid>
                    <Grid container item xs>
                        <Grid container item xs alignItems={"center"}>
                            Ваше имя:
                            <Tooltip title={"Введите ваше имя кириллицей или латиницей"}>
                                <TextField
                                    disabled={this.state.noEdit}
                                    style={{marginLeft:5}}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    value={this.state.firstname}
                                    onChange={(obj)=>{this.setState({firstname:obj.target.value})}}
                                    name="firstname"
                                    label="Имя"
                                    id="firstname"
                                />
                            </Tooltip>
                        </Grid>
                        <Grid container item xs alignItems={"center"}>
                            Ваша фамилия:
                            <Tooltip title={"Введите вашу фамилию кириллицей или латиницей"}>
                                <TextField
                                    disabled={this.state.noEdit}
                                    style={{marginLeft:5}}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    value={this.state.surname}
                                    onChange={(obj)=>{this.setState({surname:obj.target.value})}}
                                    name="surname"
                                    label="Фамилия"
                                    id="surname"
                                />
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Grid container item xs style={{paddingTop:15}}>
                        <span style={{marginRight:10}}>Ваша дата рождения:</span>
                        <Tooltip title={"Выберите вашу дату рождения. Нужно для проверки на возрастную группу"}>
                            <DatePicker
                                disabled={this.state.noEdit}
                                selected={this.state.birthday}
                                onChange={(date)=>{
                                    this.setState({birthday:date});
                                }}
                            />
                        </Tooltip>
                    </Grid>
                    <Grid container item xs>
                        Аватар(URL-путь к изображению):
                        <Tooltip title={"Введите корректный путь на рабочую ссылку с изображением. В случае ошибки, будет отображаться аватарка по умолчанию"}>
                            <TextField
                                disabled={this.state.noEdit}
                                style={{marginLeft:5}}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={this.state.avatar}
                                onChange={(obj)=>{this.setState({avatar:obj.target.value})}}
                                name="avatar"
                                label="URL-адрес"
                                id="avatar"
                            />
                        </Tooltip>
                    </Grid>
                    <Grid container item xs style={{borderBottomColor:"gray",borderWidth:1,borderBottomStyle:"solid"}}>
                        Ваша цитата:<br/>
                        <Tooltip title={"Введите надпись, которую смогут прочесть гости вашей личной страницы"}>
                            <TextField
                                disabled={this.state.noEdit}
                                style={{marginLeft:5}}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                required
                                value={this.state.announce}
                                onChange={(obj)=>{this.setState({announce:obj.target.value})}}
                                name="quote"
                                label="Quote"
                                id="quote"
                            />
                        </Tooltip>
                    </Grid>
                    <Grid container item xs justify={"flex-end"}>

                        {this.state.noEdit && <Button variant={"contained"} color={"primary"} onClick={this.handleToEdit}>Редактировать</Button>}
                        {!this.state.noEdit && <Button variant={"contained"} color={"primary"} onClick={this.handleToClose}>Отмена</Button>}
                        {!this.state.noEdit && <Button variant={"contained"} color={"primary"} onClick={this.handleToSave} style={{marginLeft:10}}>Сохранить</Button>}
                    </Grid>
                    <Grid container item xs >
                        <Grid container item xs direction={"column"} alignItems={"center"} justify={"center"}>
                            <h2>Хотите изменить пароль?</h2>
                            <h3>Тогда заполните данные поля -></h3>
                        </Grid>
                        <Grid container item xs direction={"column"} alignItems={"center"}>
                            <Grid container item xs justify={"space-between"} alignItems={"center"}>
                            Текущий пароль:
                            <Tooltip title={"Введите ваш текущий пароль. Он должен содержать 1 символ нижнего и высшего регистра латиницы, 1 цифру и 1 спец.символ"}>
                                <TextField
                                    style={{marginLeft:5}}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    name="currPass"
                                    type={"password"}
                                    value={this.state.pass}
                                    onChange={(obj)=>{this.setState({pass:obj.target.value})}}
                                    label="Пароль"
                                    id="currPass"
                                />
                            </Tooltip>
                            </Grid>
                            <Grid container item xs justify={"space-between"} alignItems={"center"}>
                            Новый пароль:
                            <Tooltip title={"Введите новый пароль. Он должен содержать 1 символ нижнего и высшего регистра латиницы, 1 цифру и 1 спец.символ"}>
                                <TextField
                                    style={{marginLeft:5}}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    name="newPass"
                                    type={"password"}
                                    value={this.state.newPass}
                                    onChange={(obj)=>{this.setState({newPass:obj.target.value})}}
                                    label="Новый пароль"
                                    id="newPass"
                                />
                            </Tooltip>
                            </Grid>
                            <Grid container item xs justify={"space-between"} alignItems={"center"}>
                            Повторите пароль:
                            <Tooltip title={"Повторите свой новый пароль"}>
                                <TextField
                                    style={{marginLeft:5}}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    name="newRePass"
                                    type={"password"}
                                    value={this.state.newRePass}
                                    onChange={(obj)=>{this.setState({newRePass:obj.target.value})}}
                                    label="Новый пароль"
                                    id="newRePass"
                                />
                            </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs justify={"flex-end"}>
                        <Button onClick={handleToChangePass} variant={"contained"} color={"primary"}>Изменить</Button>
                    </Grid>
                    <Grid container item xs justify={"space-between"}
                          style={{borderTopWidth:1, borderTopStyle:"solid",paddingTop:20,paddingBottom:10,marginTop:10}}>
                        <b>Заявка на удаление аккаунта</b>
                        <Button variant={"contained"} color={"secondary"}
                                onClick={()=>{this.setState({isOpenDialog:true})}}
                        >Отправить</Button>
                        <Dialog
                            open={this.state.isOpenDialog}
                            onClose={()=>{this.setState({isOpenDialog:false})}}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Заявка на авторство"}</DialogTitle>
                            <DialogContent>
                                {!this.state.isAuthor && <DialogContentText id="alert-dialog-description">
                                    Данным действием вы подаёте заявку на удаление вашего аккаунта.
                                    Вы уверены в этом?
                                </DialogContentText>}
                                {this.state.isAuthor && <DialogContentText id="alert-dialog-description">
                                    Данным действием вы подаёте заявку на удаление вашего аккаунта.
                                    Также будут удалены все ваши произведения и их содержание.
                                    Опишите, пожалуйста, причину вашего решения.
                                </DialogContentText>}
                                {this.state.isAuthor && <TextField
                                    fullWidth
                                    label={'Причина'}
                                    value = {this.state.notes}
                                    onChange = {(obj)=>{this.setState({notes:obj.target.value})}}
                                    variant={'outlined'}
                                />}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={()=>{this.setState({isOpenDialog:false})}} color="primary">
                                    {!this.state.isAuthor && "Нет"}
                                    {this.state.isAuthor && "Отмена"}
                                </Button>
                                <Button onClick={()=>{
                                    this.setState({isOpenDialog:false});
                                    handleToDeleteUser();
                                }} color="primary" autoFocus>
                                    {!this.state.isAuthor && "Да"}
                                    {this.state.isAuthor && "Подтвердить"}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                    open={this.state.isOpenSnackInvalid}
                    onClose={()=>{this.setState({isOpenSnackInvalid:false})}}
                    ContentProps={{
                        'aria-describedby': 'message-passwordsInvalid',
                    }}
                    message={<span id="message-idNonValid">Пароли введены неверно!</span>}
                />
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                    open={this.state.isOpenSnackSuccess}
                    onClose={()=>{this.setState({isOpenSnackSuccess:false})}}
                    ContentProps={{
                        'aria-describedby': 'message-passwordsInvalid',
                    }}
                    message={<span id="message-idNonValid">Пароли успешно изменены!</span>}
                />
            </AccountContainer>
        );
    }
}

export default EditProfile;