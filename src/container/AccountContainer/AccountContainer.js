
import React from 'react';
import Radium from 'radium';
import classes from "./AccountContainer.css";
import {Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle,Grid, Divider,Button,TextField} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
class AccountContainer extends React.Component{
    constructor(props){
        super(props);
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        let avatar = '';
        if(user.avatar.length < 10) avatar = require('./avatar.jpg');
        else avatar = user.avatar;
        this.state={
            firstname:user.firstname,
            surname:user.surname,
            avatar:avatar,
            userKey:user.id,
            isOpenDialog:false,
            isAuthor:false,
            isSended:false,
            note:''
        };
    }
    componentDidMount(){
        fetch("http://91.231.86.36/account/check/author?user="+this.state.userKey)
            .then((response)=>{return response.json();})
            .then((responseJSON) =>
                this.setState({isAuthor:responseJSON.isAuthor,isSended:responseJSON.isSended})
            );
    }
    handleApplicationOn(){
        let userKey = JSON.parse(localStorage.getItem("user")).id;
        fetch("http://91.231.86.36/account/update/author",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({key:userKey,note:this.state.note})
        })
            .then(response=>response.json())
            .then(responseJSON=>{
                if(responseJSON.isApply){
                    console.log("you are invited to be an author");
                }
                else console.log("We have a problem");
            });
    }
    render(){
        return (
            <Grid
                style={{flex:1, margin:20}}
                container
                direction={"row"}
                justify={"space-around"}
                spacing={5}
            >
                <Grid item xs={1}>
                </Grid>
                <Grid container item lg={7} maxWidth={"lg"} style={{}}>
                    {this.props.children}
                </Grid>
                <Grid container item lg={2} style={{marginTop:5,paddingLeft:25,backgroundColor:"snow"}} direction={"column"} spacing={1} className={classes.Table}>
                    <Divider/>
                    <Grid container item xs={2} direction={"column"}  spacing={2}>
                        <Grid item xs style={{paddingLeft:25}}>
                            <img width={146} height={146} src={this.state.avatar} style={{backgroundColor:"skyblue", borderRadius:73}}/>
                        </Grid>
                        <Grid item xs style={{paddingLeft:25}} justify={"center"} container direction={"row"} alignItems={"center"}>
                            <Grid item xs >{this.state.firstname + " " + this.state.surname}</Grid>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container item xs={4} direction={"column"} style={{paddingLeft:15}}>
                        <Button
                            disabled
                            variant={"outlined"}
                            style={{marginTop:10,marginBottom:10}}
                            color={"primary"}
                        >
                            {this.state.isAuthor && "Автор"}
                            {!this.state.isAuthor && "Читатель"}
                        </Button>
                        <Button variant={"outlined"} style={{marginTop:10}}>
                            <NavLink style={{color:"black"}} to={"/account/edit"}>Редактировать профиль</NavLink>
                        </Button>
                    <Button variant={"outlined"} style={{marginTop:10}}>
                        <NavLink style={{color:"black"}} to={"/account"}>
                            Моя библиотека
                        </NavLink>
                    </Button>
                    <Button variant={"outlined"} style={{marginTop:10}}>
                        <NavLink style={{color:"black"}} to={"/account/favorites"}>
                            Избранные авторы
                        </NavLink>
                    </Button>
                    <Button variant={"outlined"} style={{marginTop:10}}>
                        <NavLink style={{color:"black"}} to={"/account/grades"}>
                            Наградил
                        </NavLink>
                    </Button>
                    {this.state.isAuthor && <Button variant={"outlined"} style={{marginTop:10}}>
                        <NavLink style={{color:"black"}} to={"/account/mybooks"}>
                            Мои романы
                        </NavLink>
                    </Button>}
                    {this.state.isAuthor && <Button variant={"outlined"} style={{marginTop:10,marginBottom:10}}>
                        <NavLink style={{color:"black"}} to={"/account/statistics"}>
                        Статистика книг
                        </NavLink>
                    </Button>}
                    {!this.state.isSended && !this.state.isAuthor && <Button
                        variant={"outlined"}
                        style={{marginTop:10,marginBottom:10}}
                        color={"secondary"}
                        onClick={()=>{this.setState({isOpenDialog:true})}}
                    >
                            Стать автором
                    </Button>}
                    {this.state.isSended && !this.state.isAuthor && <Button
                        disabled
                        variant={"outlined"}
                        style={{marginTop:10,marginBottom:10}}
                        color={"primary"}
                        onClick={()=>{this.setState({isOpenDialog:true})}}
                    >
                            Заявка подана
                    </Button>}

                    </Grid>
                    <Divider/>
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Dialog
                    open={this.state.isOpenDialog}
                    onClose={()=>{this.setState({isOpenDialog:false})}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Заявка на авторство"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Данным действием вы подаёте заявку на обработку ваших персональных данных.
                            При успешном их соответствии ваш статус будет изменён на "Автор" и вы сможете опубликовать свои произведения.
                            Предлагаем описать вам вашу мотивацию стать автором на нашем портале.
                        </DialogContentText>
                        <TextField
                            label={'Мотивация'}
                            fullWidth
                            rows={4}
                            value={this.state.note}
                            onChange={(obj)=>{this.setState({note:obj.target.value})}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{this.setState({isOpenDialog:false})}} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={()=>{
                            this.setState({isOpenDialog:false});
                            this.handleApplicationOn();
                        }} color="primary" autoFocus>
                            Отправить
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        );
    }
}

export default AccountContainer;