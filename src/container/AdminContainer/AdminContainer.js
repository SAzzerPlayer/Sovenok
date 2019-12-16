import React from 'react';
import {Grid,Table,TableHead,TableRow,TableCell,TableBody,Button} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import classes from './AdminContainer.css';
class AdminContainer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Grid container item xs direction={"row"} justify={"space-around"} style={{minHeight:600, maxHeight:600}}>
                {this.props.children}
                <Grid container item xs={2} direction={"column"} style={{padding:15}} className={classes.Table}>
                    <Grid container item xs direction={"column"} alignItems={'center'} spacing={4}>
                        <h3 style={{textAlign:"center",paddingLeft:20}}>Меню действий</h3>
                        <NavLink to={"/admin"} style={{margin:10,marginLeft:40}}><Button fullWidth variant={"outlined"}>Авторство</Button></NavLink>
                        <NavLink to={"/admin/books/del"} style={{margin:10,marginLeft:40}}><Button fullWidth variant={"outlined"}>Удаление книг</Button></NavLink>
                        <NavLink to={"/admin/users/del"} style={{margin:10,marginLeft:40}}><Button fullWidth variant={"outlined"}>Удаление авторов</Button></NavLink>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default AdminContainer;