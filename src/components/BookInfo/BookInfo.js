import React from 'react';
import {Grid,Link} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import classes from './BookInfo.css';
class BookInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cover : require("./page.png")
        };
    }
    componentDidMount() {
        console.log("BookInfo",this.props.datas);
        if(this.props.datas.cover.trim().length > 10) this.setState({cover:this.props.datas.cover})
    }

    render(){
        return(
            <Grid container item xs direction={"row"}>
                <Grid item xs={2}>
                    <img width={90} height={120} style={{backgroundColor: "skyblue"}} src={this.state.cover}/>
                </Grid>
                <Grid container item xs={10} direction={"column"} justify={"space-between"}>
                    <Grid item xs><NavLink className={classes.Link} to={"/book?book="+this.props.datas.key}><b>{this.props.datas.name}</b></NavLink><i style={{fontSize:12, color:'gray'}}> / {this.props.datas.genre}</i></Grid>
                    <Grid item xs><i><u>{this.props.datas.annotation}</u></i></Grid>
                    <Grid item xs><b>{this.props.datas.firstname + " " + this.props.datas.surname}</b></Grid>
                    <Grid container item xs direction={"row"} justify={"space-between"}>
                        <i>{this.props.datas.views} просмотров</i>
                        <i>Рейтинг:{this.props.datas.rate}</i>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default BookInfo;