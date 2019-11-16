import React from 'react';
import {Grid,Link} from '@material-ui/core';

class BookInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(
            <Grid container item xs direction={"row"}>
                <Grid item xs={2}>
                    <img width={90} height={120} style={{backgroundColor: "skyblue"}}/>
                </Grid>
                <Grid container item xs={10} direction={"column"} justify={"space-between"}>
                    <Grid item xs><Link><b>Название книги</b></Link><i style={{fontSize:12, color:'gray'}}> / жанр книги</i></Grid>
                    <Grid item xs><i><u>Аннотация книги lorem ipsum fffff ssssss</u></i></Grid>
                    <Grid item xs><b>Автор книги</b></Grid>
                    <Grid container item xs direction={"row"} justify={"space-between"}>
                        <i>234 просмотров</i>
                        <i>Рейтинг: 54</i>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default BookInfo;