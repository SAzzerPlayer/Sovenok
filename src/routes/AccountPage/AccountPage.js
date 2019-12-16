import React from 'react';
import {Grid,Divider} from '@material-ui/core';
import AccountContainer from '../../container/AccountContainer/AccountContainer';
import BooksCarousel from '../../container/BooksCarousel/BooksCarousel';
import BookInfo from '../../components/BookInfo/BookInfo';
import PageListSwitcher from '../../components/PageListSwitcher/PageListSwitcher';
import classes from './AccountPage.css';
class AccountPage extends React.Component{
    constructor(props){
        super(props);
        let user = JSON.parse(localStorage.getItem("user"));
        this.state={
            favBooks:[],
            libBooks:[],
            isLoaded: false,
            start:0,
            end:7,
            isBegin:true,
            isEnd:false,
            showBooks:[],
            userKey:user.id,

        }
    }

    handleBackBooks(){
        this.setState({start:this.state.start-7,end:this.state.end-7});
        if(this.state.start === 0) this.setState({isBegin:true,isEnd:false});
        else this.setState({isBegin:false,isEnd:false});
        this.generateBooks(this.state.start,this.state.end);
    }
    handleNextBooks(){
        this.setState({start:this.state.start+7, end:this.state.end+7});
        if(this.state.end >= this.state.libBooks.length) this.setState({isBegin: false, isEnd: true});
        else this.setState({isBegin:false, isEnd: false});
        this.generateBooks(this.state.start,this.state.end);
    }
    generateBooks(start,end){
        let arr = [];
        for(let i=start;i<end && i < this.state.libBooks.length;i++){
            arr.push(this.state.libBooks[i]);
        }
        this.setState({showBooks : arr});
    }
    componentWillMount(){
        fetch("http://91.231.86.36/account/library/?user="+this.state.userKey)
            .then((response)=>{return response.json();})
            .then((responseJSON) => {
                console.log(responseJSON);
                this.setState({libBooks:responseJSON.LibBooks,favBooks:responseJSON.FavBooks})
                this.setState({isLoaded:true})
                this.generateBooks(0,7);
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
                    {this.state.isLoaded && <BooksCarousel title={"Книги избранных авторов"} datas={this.state.favBooks}/>}
                    <Grid container item xs
                        direction={"column"}
                          spacing={3}
                    >
                        <h3>Моя библиотека: </h3>
                        <Divider/>
                        {this.state.libBooks.map((currElem,index,array)=>{
                            return (
                                <Grid item xs><BookInfo datas={currElem}/><br/><Divider/></Grid>
                            );
                        })}
                        {this.state.libBooks.length > 0 &&
                        <PageListSwitcher
                            ShowText={true}
                            handleBack={this.handleBackBooks}
                            handleNext={this.handleNextBooks}
                            disBack={this.state.isBegin}
                            disNext={this.state.isEnd}
                        />
                        }
                        {this.state.libBooks.length === 0 && <h4>В данный момент список пуст</h4>}
                    </Grid>
                </Grid>
            </AccountContainer>
        );
    }
}

export default AccountPage;