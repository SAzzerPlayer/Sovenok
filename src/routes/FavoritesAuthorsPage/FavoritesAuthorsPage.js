import React from 'react';
import {Grid,Divider} from '@material-ui/core';
import AccountContainer from '../../container/AccountContainer/AccountContainer';
import BooksCarousel from '../../container/BooksCarousel/BooksCarousel';
import AuthorsQuadroList from '../../components/AuthorsQuadroList/AuthorsQuadroList';
import classes from './FavoritesAuthorsPage.css';
class AccountPage extends React.Component{
    constructor(props){
        super(props);
        let user = JSON.parse(localStorage.getItem("user"));
        this.state = {
            userKey:user.id,
            FavAuthors:[],
            FavBooks: [],
            isLoaded:false
        }
    }
    componentDidMount() {
        fetch("http://91.231.86.36/account/favorites?user="+this.state.userKey,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
            .then((response)=>{return response.json();})
            .then((responseJSON) => {
                console.log(responseJSON);
                this.setState({FavAuthors:responseJSON.FavAuthors,FavBooks:responseJSON.FavBooks})
                this.setState({isLoaded:true})
            });

    }

    render(){
        return(
            <AccountContainer>
                <Grid container item xs
                      className={classes.Table}
                      direction={"column"}
                      alignItems={"center"}
                      spacing={4}
                >
                    {this.state.isLoaded && <BooksCarousel title={"Книги избранных авторов"} datas={this.state.FavBooks}/>}
                    <Grid container item xs
                          direction={"column"}
                          justify={"flex-start"}
                          spacing={3}
                    >
                        <Divider/>
                        <Grid item xs>{this.state.isLoaded && <AuthorsQuadroList title={"Мои избранные авторы"} datas={this.state.FavAuthors}/>}</Grid>
                    </Grid>
                </Grid>
            </AccountContainer>
        );
    }
}

export default AccountPage;