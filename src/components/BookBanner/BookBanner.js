import React from 'react';
import {Container,Box,Grid} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import classes from './BookBanner.css';

class BookBanner extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cover : require('./page.png')
        };
    }
    componentDidMount(){
        let cover = this.props.datas.cover || '';
        if(cover.length > 10) this.setState({cover : cover});
    }
    render(){
        return(
            <Grid container item xs direction={"column"} style={{margin:10}}>
                <img width={135} height={180} style={{backgroundColor:"skyblue"}} src={this.state.cover}/>
                <div style={{fontSize:16, color: "purple", textAlign:"center",marginBottom:0}}>
                    <NavLink className={classes.Link} to={"/book?book="+this.props.datas.key}><b>{this.props.datas.name}</b></NavLink>
                    <br/>
                    <i>{this.props.datas.firstname + " " + this.props.datas.surname}</i>
                </div>
            </Grid>
        );
    }
}

export default BookBanner;