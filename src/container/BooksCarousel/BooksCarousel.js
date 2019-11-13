import React from 'react';
import {Container, Divider, Grid,IconButton,Typography} from "@material-ui/core";
import {NavigateNext, NavigateBefore} from "@material-ui/icons";
import BookOfCarousel from '../../components/BookOfCarousel/BookOfCarousel';
import classes from './BooksCarousel.css';
class BooksCarousel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            "genre":"Фантастика"
        };
    }
    render(){
        return(
          <Container >
            <h3>{this.props.title}</h3>
              <Divider/>
              <Grid
                  style={{margin:5}}
                  container
                  alignItems={"center"}
                  alignContent={"center"}
                  direction={"row"}
                  justify={"space-evenly"}
              >
                  <Grid item xs={1}>
                      <IconButton >
                        <NavigateBefore/>
                      </IconButton>
                  </Grid>
                  <BookOfCarousel/>
                  <BookOfCarousel/>
                  <BookOfCarousel/>
                  <BookOfCarousel/>
                  <BookOfCarousel/>
                  <Grid item xs={1}>
                      <IconButton >
                        <NavigateNext/>
                      </IconButton>
                  </Grid>
              </Grid>
          </Container>
        );
    }
}
export default BooksCarousel;