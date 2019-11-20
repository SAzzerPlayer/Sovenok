import React from 'react';
import {Grid, Button, TextField,Divider} from '@material-ui/core';
import AccountContainer from '../../container/AccountContainer/AccountContainer';
import classes from './EditProfilePage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
class EditProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            birthday : new Date(),
            noEdit: true
        }
    }
    handleToEdit=()=>{
        this.setState({noEdit:false});
    };
    handleToClose=()=>{
        this.setState({noEdit:true});
    };
    handleToSave=()=>{
        this.setState({noEdit:true});
    };
    render(){
        return(
            <AccountContainer>
                <Grid container item xs direction={"column"} alignItems={"center"} className={classes.Table} spacing={1}>
                    <Grid item xs><h1>Персональная информация</h1></Grid>
                    <Grid container item xs>
                        <Grid container item xs alignItems={"center"}>
                            Ваше имя:
                            <TextField

                                disabled={this.state.noEdit}
                                style={{marginLeft:5}}
                                variant="outlined"
                                margin="normal"
                                required
                                name="surname"
                                label="Имя"
                                id="surname"
                            />
                        </Grid>
                        <Grid container item xs alignItems={"center"}>
                            Ваша фамилия:
                            <TextField

                                disabled={this.state.noEdit}
                                style={{marginLeft:5}}
                                variant="outlined"
                                margin="normal"
                                required
                                name="surname"
                                label="Фамилия"
                                id="surname"
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs style={{paddingTop:15}}>
                        <span style={{marginRight:10}}>Ваша дата рождения:</span>
                        <DatePicker

                            disabled={this.state.noEdit}
                            selected={this.state.birthday}
                            onChange={(date)=>{
                                this.setState({birthday:date});
                            }}
                        />
                    </Grid>
                    <Grid container item xs>
                        Аватар(URL-путь к изображению):
                        <TextField

                            disabled={this.state.noEdit}
                            style={{marginLeft:5}}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            name="surname"
                            label="URL-адрес"
                            id="surname"
                        />
                    </Grid>
                    <Grid container item xs style={{borderBottomColor:"gray",borderWidth:1,borderBottomStyle:"solid"}}>
                        Ваша цитата:<br/>
                        <TextField
                            disabled={this.state.noEdit}
                            style={{marginLeft:5}}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            required
                            name="quote"
                            label="Quote"
                            id="quote"
                        />
                    </Grid>
                    <Grid container item xs justify={"flex-end"}>

                        {this.state.noEdit && <Button variant={"contained"} color={"secondary"} onClick={this.handleToEdit}>Редактировать</Button>}
                        {!this.state.noEdit && <Button variant={"contained"} color={"primary"} onClick={this.handleToClose}>Отмена</Button>}
                        {!this.state.noEdit && <Button variant={"contained"} color={"secondary"} onClick={this.handleToSave} style={{marginLeft:10}}>Сохранить</Button>}
                    </Grid>
                    <Grid container item xs >
                        <Grid container item xs direction={"column"} alignItems={"center"} justify={"center"}>
                            <h2>Хотите изменить пароль?</h2>
                            <h3>Тогда заполните данные поля -></h3>
                        </Grid>
                        <Grid container item xs direction={"column"} alignItems={"center"}>
                            <Grid container item xs justify={"space-between"} alignItems={"center"}>
                            Текущий пароль:
                            <TextField
                                style={{marginLeft:5}}
                                variant="outlined"
                                margin="normal"
                                required
                                name="currPass"
                                label="Пароль"
                                id="currPass"
                            />
                            </Grid>
                            <Grid container item xs justify={"space-between"} alignItems={"center"}>
                            Новый пароль:
                            <TextField
                                style={{marginLeft:5}}
                                variant="outlined"
                                margin="normal"
                                required
                                name="newPass"
                                label="Новый пароль"
                                id="newPass"
                            />
                            </Grid>
                            <Grid container item xs justify={"space-between"} alignItems={"center"}>
                            Повторите пароль:
                            <TextField
                                style={{marginLeft:5}}
                                variant="outlined"
                                margin="normal"
                                required
                                name="newPass"
                                label="Новый пароль"
                                id="newPass"
                            />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs justify={"flex-end"}>
                        <Button variant={"contained"} color={"secondary"}>Изменить</Button>
                    </Grid>

                </Grid>
            </AccountContainer>
        );
    }
}

export default EditProfile;