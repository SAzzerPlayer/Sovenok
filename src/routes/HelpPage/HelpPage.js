import React from 'react';
import {Button,Grid,Typography, ExpansionPanel, ExpansionPanelSummary,ExpansionPanelDetails,List,ListItem} from '@material-ui/core';
import WorkContainer from '../../container/WorkContainer/WorkContainer';
import classes from './HelpPage.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
class HelpPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <WorkContainer>
                <Grid container item xs
                    className={classes.Table}
                      direction="row"
                      justify={"space-between"}
                      spacing={3}
                      >
                    <Grid container item xs={3} direction={"column"} style={{borderRightWidth:1,borderColor:"gray"}}>
                        <Grid item xs>
                            <ExpansionPanel disabled>
                                <ExpansionPanelSummary>
                                    Разделы помощи для:
                                </ExpansionPanelSummary>
                            </ExpansionPanel>
                        </Grid>
                        <Grid item xs>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    Читателя
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <List>
                                        <ListItem button>1. Вход</ListItem>
                                        <ListItem button>2. Регистрация</ListItem>
                                        <ListItem button>3. Чтение</ListItem>
                                        <ListItem button>4. Автор</ListItem>
                                        <ListItem button>5. Обратная связь</ListItem>
                                        <ListItem button>6. Поиск</ListItem>
                                    </List>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                        <Grid item xs>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    Автора
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <List>
                                        <ListItem button>1. Как стать автором</ListItem>
                                        <ListItem button>2. Добавление новой книги</ListItem>
                                        <ListItem button>3. Редактирование книги</ListItem>
                                        <ListItem button>4. Статистика книги</ListItem>
                                        <ListItem button>5. Редагування розділів</ListItem>
                                    </List>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                    </Grid>
                    <Grid container item xs={8} direction={"column"} alignItems="center" className={classes.Table} style={{textAlign:"center"}}>

                            <h2>Раздел "Помощь"</h2>
                        <h3>Здесь собраны основные ответы на вопросы и инструкции по использованию сайтом.</h3><h3> Чтобы получить полную информацию относительно вашего вопроса, пожалуйста, выберите нужный вопрос или раздел. </h3>
                    </Grid>
                </Grid>
            </WorkContainer>
        );
    }
}

export default HelpPage;