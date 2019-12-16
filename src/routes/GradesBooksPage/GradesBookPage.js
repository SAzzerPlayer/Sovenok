import React from 'react';
import {Grid,Divider} from '@material-ui/core';
import AccountContainer from '../../container/AccountContainer/AccountContainer';
import BookInfo from '../../components/BookInfo/BookInfo';
import PageListSwitcher from '../../components/PageListSwitcher/PageListSwitcher';
import classes from './GradesBookPage.css';
class GradesBookPage extends React.Component{
    constructor(props){
        super(props);
        let user = JSON.parse(localStorage.getItem("user"));
        this.state={
            userKey:user.id,
            start:0,
            end:7,
            isBegin:true,
            isEnd:false,
            Books:[],
            showBooks:[],
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
        if(this.state.end >= this.state.Books.length) this.setState({isBegin: false, isEnd: true});
        else this.setState({isBegin:false, isEnd: false});
        this.generateBooks(this.state.start,this.state.end);
    }
    generateBooks(start,end){
        let arr = [];
        for(let i=start;i<end && i < this.state.Books.length;i++){
            arr.push(this.state.Books[i]);
        }
        this.setState({showBooks : arr});
    }
    componentDidMount(){
        fetch("http://91.231.86.36/account/grades?user="+this.state.userKey)
            .then((response)=>{return response.json();})
            .then((responseJSON) => {
                console.log(responseJSON);
                this.setState({Books: responseJSON.GradeBooks});
                this.generateBooks(this.state.start,this.state.end);
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
                    <Grid container item xs
                           direction={"column"}
                           spacing={3}
                    >
                        <h3>Награжденные книги: </h3>
                        <Divider/>
                        {this.state.showBooks.map((currElem,index,array)=>{
                            return (
                                <Grid item xs><BookInfo datas={currElem}/><br/><Divider/></Grid>
                            );
                        })}
                        {this.state.showBooks.length > 0 &&
                        <PageListSwitcher
                            ShowText={true}
                            handleBack={this.handleBackBooks}
                            handleNext={this.handleNextBooks}
                            disBack={this.state.isBegin}
                            disNext={this.state.isEnd}
                        />}
                        {this.state.showBooks.length === 0 && <h4>В данный момент отображение невозможно</h4>}
                    </Grid>
                </Grid>
            </AccountContainer>
        );
    }
}

export default GradesBookPage;