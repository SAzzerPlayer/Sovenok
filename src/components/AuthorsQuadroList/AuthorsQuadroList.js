import React from 'react';
import {Grid,Button} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import classes from './AuthorsQuadroList.css';
import PageListSwitcher from '../../components/PageListSwitcher/PageListSwitcher';
class AuthorsQuadroList extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        const Genres = () => {
            return (
                <Grid container item xs direction={"rom"} justify={"space-between"}>
                    <Grid item xs>
                        <Button><ChevronLeftIcon/></Button>
                    </Grid>
                    <Grid item xs>
                        <Button>Фантастика</Button>
                    </Grid>
                    <Grid item xs>
                        <Button>Триллер</Button>
                    </Grid>
                    <Grid item xs>
                        <Button>Ужасы</Button>
                    </Grid>
                    <Grid item xs>
                        <Button>Фэнтези</Button>
                    </Grid>
                    <Grid item xs>
                        <Button>Детектив</Button>
                    </Grid>
                    <Grid item xs>
                        <Button><ChevronRightIcon/></Button>
                    </Grid>
                </Grid>
            );
        };

        const Author = () => {
          return(
              <Grid container item xs={6} direction={"row"} justify={"space-between"}>
                  <Grid item xs={3}><img src={require('./avatar.jpg')} width={64} height={64} style={{backgroundColor:"skyblue",borderRadius:32}}/></Grid>
                  <Grid container xs={9} item direction={"column"}>
                      <Grid item xs>
                          <NavLink style={{color:"black"}} to={"/author"}><b>Лалаленд Лалалендович</b></NavLink>
                      </Grid>
                      <Grid item xs>
                          <u>Рейтинг: 100</u>
                      </Grid>
                  </Grid>
              </Grid>
          );
        };
        return(
            <Grid container item xs direction={"column"} spacing={1}>
                <Grid item xs>
                    <h1>{this.props.title}</h1>
                </Grid>
                {this.props.withGenres && <Genres/>}
                <Grid item container xs direction={"row"} justify="space-between" spacing={2}>
                    <Author/>
                    <Author/>
                </Grid>
                <Grid item container xs direction={"row"} justify="space-between" spacing={2}>
                    <Author/>
                    <Author/>
                </Grid>
                <Grid item xs>
                    <PageListSwitcher ShowText={true}/>
                </Grid>
            </Grid>
        );
    }
}

export default AuthorsQuadroList;