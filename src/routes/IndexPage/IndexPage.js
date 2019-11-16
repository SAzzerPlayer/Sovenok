
import React from 'react';
import MainInfoTable from "../../components/MainInfoTable/MainInfoTable";
import {Divider, Grid} from "@material-ui/core";
import WorkContainer from '../../container/WorkContainer/WorkContainer';
import BooksCarousel from '../../container/BooksCarousel/BooksCarousel';
import BottomAboutMenu from "../../components/BottomAboutMenu/BottomAboutMenu";
import BooksKeyWords from '../../components/BooksKeyWords/BooksKeyWords';
import classes from "./IndexPage.css";
class IndexPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <WorkContainer>
                {true && <MainInfoTable/>}
                <Grid container item
                      style={{marginTop:20}}
                      direction={"row"}
                      justify={"space-between"}
                      xs={12}
                >
                    <Grid item xs={8} className={classes.Table} style={{backgroundColor: "snow",padding:4}} spacing={2}>
                        <h2>Подборки книг по разным критериям:</h2>
                        <Divider/>
                        <BooksCarousel title={"Топ в разных жанрах"}/>
                        <BooksCarousel title={"Бестридеры"}/>
                        <BooksCarousel title={"Новинки"}/>
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={3} className={classes.Table} style={{backgroundColor:"snow",padding:4}} >
                        <h2>Подборка книг по <span style={{color:"skyblue"}}>ключевым</span> словам:</h2>
                        <BooksKeyWords/>
                    </Grid>
                </Grid>
                <BottomAboutMenu/>
            </WorkContainer>
        );
    }
}
export default IndexPage;
