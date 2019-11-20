
import React from 'react';
import Radium from 'radium';
import classes from "./AccountContainer.css";
import {Container, Grid, Divider,Button} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
class AccountContainer extends React.Component{
    constructor(props){
        super(props);
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
                            <img width={146} height={146} src={require('./avatar.jpg')} style={{backgroundColor:"skyblue", borderRadius:73}}/>
                        </Grid>
                        <Grid item xs style={{paddingLeft:25}} justify={"center"} container direction={"row"} alignItems={"center"}>
                            <Grid item xs >Лалаленд Лалалендович</Grid>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container item xs={4} direction={"column"} style={{paddingLeft:15}}>
                        <Button variant={"outlined"} style={{marginTop:10}}>
                            <NavLink style={{color:"black"}} to={"/account/edit"}>Редактировать профиль</NavLink>
                        </Button>
                    <Button variant={"outlined"} style={{marginTop:10}}>
                        <NavLink style={{color:"black"}} to={"/account"}>
                            Моя библиотека
                        </NavLink>
                    </Button>
                    <Button variant={"outlined"} style={{marginTop:10}}>Избранные авторы</Button>
                    <Button variant={"outlined"} style={{marginTop:10}}>Наградил</Button>
                    <Button variant={"outlined"} style={{marginTop:10}}>Мои романы</Button>
                    <Button variant={"outlined"} style={{marginTop:10,marginBottom:10}}>Статистика прочтений</Button>
                    </Grid>
                    <Divider/>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        );
    }
}

export default AccountContainer;