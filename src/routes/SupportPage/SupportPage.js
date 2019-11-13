import React from 'react';
import WorkContainer from '../../container/WorkContainer/WorkContainer';
import {Grid,Container,Button} from '@material-ui/core';
import classes from "./SupportPage.css";
import TextField from '@material-ui/core/TextField';

class SupportPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <WorkContainer>
                <Grid container item
                      className={classes.Table}
                      alignItems={'center'}
                      justify={"center"}
                      direction={"column"}
                      spacing={4}
                      >
                    <Grid container item
                        justify={"center"}
                          xs
                    >
                        <Grid>
                            <h2>Обратная связь</h2>
                        </Grid>
                    </Grid>
                    <Grid container item
                          justify={"center"}
                          xs
                          spacing={2}
                          >
                        <Grid item xs justify={"center"} alignContent={"center"} direction={"row"}>
                            <b>Имя</b>
                            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Имя"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        /></Grid>
                        <Grid item xs>
                            <b>Фамилия</b>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Фамилия"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs>
                            <b>Электронная почта</b>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Электронная почта"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>
                    </Grid>
                    <Grid container item
                          justify={'center'}
                          xs
                          >
                        <Grid item xs>
                            <b>Тема письма</b>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Тема письма"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>
                    </Grid>
                    <Grid container item
                          justify={'center'}
                          xs
                          >
                        <Grid item xs>
                            <b>Письмо</b>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                id="email"
                                label="Текст письма"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                fullWidth
                                rows={10}
                                multiline
                            />
                        </Grid>
                    </Grid>
                    <Grid container item
                          justify={"center"}
                          xs>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Отправить
                        </Button>
                    </Grid>
                </Grid>
            </WorkContainer>
        );
    }
}

export default SupportPage;