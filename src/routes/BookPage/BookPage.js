import React from 'react';
import {Grid,Button,Badge,ExpansionPanel ,ExpansionPanelDetails,ExpansionPanelSummary,List,ListItem} from '@material-ui/core';
import classes from './BookPage.css';
import AccountContainer from '../../container/AccountContainer/AccountContainer';
import RecommendContainer from '../../container/RecommendContainer/RecommendContainer';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import GradeIcon from '@material-ui/icons/Grade';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
class BookPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLogged: false
        };
    }

    render(){
        const Container = (props) => {
            if(this.state.isLogged) return (<AccountContainer>{props.children}</AccountContainer>);
            else return(<RecommendContainer>{props.children}</RecommendContainer>);
        };
        return(
            <Container>
                <Grid container item xs direction={"column"} className={classes.FontTable} spacing={4}>
                    <Grid container item xs direction={"row"}>
                        <Grid item xs>
                            <img height={400} width={300} src={require('./page.png')}/>
                        </Grid>

                        <Grid container item xs direction={"column"} className={classes.Table}>
                            <Grid container item xs direction={"row"} justify={"space-between"}>
                                <Grid item xs><b style={{fontSize:32}}>Алиса в стране чудес</b></Grid>
                            </Grid>
                            <Grid item xs><i style={{fontSize:24}}>Лалаленд Лалалендович</i></Grid>
                            <Grid item xs><span style={{fontSize:24}}>Жанр: Фантастика</span></Grid>
                            <Grid container item xs direction={"row"} justify={"space-between"}>
                                <Grid item xs={6}>
                                    <span style={{fontSize:18}}>
                                        <i><u>Просмотров: 10000</u></i>
                                    </span>
                                </Grid>
                                <Grid item xs={5}>
                                    <span style={{fontSize:18}}>
                                        <i><u>Рейтинг: 543</u></i>
                                    </span>
                                </Grid>
                            </Grid>
                            <Grid container item xs direction={"row"} justify={"space-between"}>
                                <Grid item  xs={5}>
                                    <Button color="secondary" variant="contained" style={{fontSize:14}}>
                                        <GradeIcon style={{color:"gold"}}/>Похвалить
                                    </Button>
                                </Grid>
                                <Grid item  xs={6}>
                                    <Button variant="contained" color="primary" style={{fontSize:14}}>
                                        В библиотеку<LibraryAddIcon/>
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container item xs direction={"row"} justify={"center"}>
                                <Grid item xs={6}  >
                                    <Button color="primary" style={{width:"100%"}} variant={"contained"}><ChromeReaderModeIcon style={{marginRight:10}}/>Читать</Button>
                                </Grid>
                            </Grid>
                            <Grid container item xs direction={"row"} justify={"center"}>
                                <Grid item xs={6}  >
                                    <Button color="primary" style={{width:"100%"}} variant={"contained"}><EditIcon style={{marginRight:10}}/>Редактировать</Button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid container item xs direction={"column"} alignItems={"center"} className={classes.Table}>
                        <Grid item xs>
                            <h1> Аннотация </h1>
                        </Grid>
                        <Grid item xs style={{minHeight:150}}>
                            <p>Аннотация к книге. Лалаленд Лалалендович одобряет всей душой. Не забудь поставить лайк и добавить себе в библиотечку)</p>
                        </Grid>
                    </Grid>
                    <Grid container item xs direction={"column"}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ListIcon/>}>
                                Содержание книги
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <List>
                                    <ListItem>
                                        0. Пролог
                                    </ListItem>
                                    <ListItem>
                                        1. Раздел 1
                                    </ListItem>
                                    <ListItem>
                                        2. Раздел 2
                                    </ListItem>
                                    <ListItem>
                                        3. Раздел 3
                                    </ListItem>
                                    <ListItem>
                                        4. Раздел 4
                                    </ListItem>
                                    <ListItem>
                                        5. Раздел 5
                                    </ListItem>
                                    <ListItem>
                                        6. Раздел 6
                                    </ListItem>
                                    <ListItem>
                                        7. Раздел 7
                                    </ListItem>
                                </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default BookPage;