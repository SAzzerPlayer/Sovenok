import React from 'react';
import WorkContainer from '../../container/WorkContainer/WorkContainer';
import {Grid,Icon} from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import classes from './404Page.css';

const Page404 = () => {
    return(
        <WorkContainer>
            <Grid container xs={12}
                  direction={"column"}
                  alignItems={"center"}
                  justify={"center"}
            className={classes.Table}>
                <Grid item xs={8}>
                    <h1>Ошибка 404. Страница не найдена!</h1>
                </Grid>
                <Grid item xs={4}>
                    <ErrorOutlineIcon style={{fontSize:256, color:'purple'}}/>
                </Grid>
            </Grid>
        </WorkContainer>
    );
};

export default Page404;