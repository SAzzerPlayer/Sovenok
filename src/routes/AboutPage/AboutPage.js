import React from 'react';
import {Grid,Button} from '@material-ui/core';
import WorkContainer from '../../container/WorkContainer/WorkContainer';
import classes from './AboutPage.css';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';

class AboutPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <WorkContainer>
                <Grid container xs
                      className={classes.Table}
                    direction={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      spacing={4}
                >
                    <Grid item xs><img width={256} height={256} src={require('./logo.png')}/></Grid>
                    <Grid container item xs
                          direction={"column"}
                          alignItems={'center'}
                          justifyContent={"center"}
                          className={classes.FontTable}
                          spacing={6}
                          >
                        <Grid item xs >
                            <b style={{fontSize:24}}>Литературная платформа, которая превращает чтение и публикацию книг в удовольствие! </b>
                        </Grid>
                        <Grid item xs style={{fontSize:18}}>
                            На Sovenok авторы публикуют свои книги на бесплатной основе или продают их по подписке.
                            Таким образом, можно монетизировать книги, которые находятся в процессе написания.
                            Продавая черновики по подписке, у авторов есть возможность зарабатывать задолго до того, как их романы будут завершены.
                        </Grid>
                        <Grid item container xs
                              direction = "row"
                              justifyContent={"space-between"}
                              spacing={8}
                              >
                            <Grid container item xs={4}
                                direction={"column"}
                                  justifyContent={'center'}
                                  alignItems={'center'}
                                  spacing={2}
                            >
                                <PrintOutlinedIcon style={{fontSize:128}}/>
                                Sovenok помогает авторам найти свое место под солнцем, благодаря рекламе книг в соцсетях и поисковиках.
                                Публикуя бесплатные книги - вы привлекаете читателей, часть из них, будут покупать ваши платные книги в будущем.
                            </Grid>
                            <Grid container item xs={4}
                                  direction={"column"}
                                  justifyContent={'center'}
                                  alignItems={'center'}
                                  spacing={2}
                            >
                                <BookOutlinedIcon style={{fontSize:128}}/>
                                У каждого писателя есть возможность получить коммерческий статус и открыть продажи подписок на книги, которые находятся в процессе написания.
                                Средняя длительность подписки 3 месяца.
                                После ее окончания автор может продолжить продажи уже завершенной книги.
                            </Grid>
                            <Grid container item xs={4}
                                  direction={"column"}
                                  justifyContent={'center'}
                                  alignItems={'center'}
                                  spacing={2}
                            >
                                <LibraryBooksOutlinedIcon style={{fontSize:128}}/>
                                Автор может продавать свои завершенные книги как на Sovenok, так и в любом другом виртуальном магазине.
                                Однако только те авторы, которые открыли хотя бы одну подписку, могут продавать завершенные книги на нашей платформе.
                            </Grid>
                            <br/>
                        </Grid>
                        <Grid container item xs
                            className={classes.TableShow}
                              direction={"column"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              spacing={3}
                        >
                            <Grid item xs><b style={{color:"white", fontSize:32}}>ОСВОБОДИ СВОЮ КРЕАТИВНОСТЬ</b></Grid>
                            <Grid item xs><b style={{color:"white", fontSize:24}}>Станьте автором на Sovenok и расскажите всем свои истории!</b></Grid>
                            <Grid item xs><Button color={"primary"} variant={"contained"}>Я стану писателем!</Button></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </WorkContainer>
        );
    }
}

export default AboutPage;