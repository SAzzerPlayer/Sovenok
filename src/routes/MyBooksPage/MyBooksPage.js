import React from 'react';
import {Grid,Divider,Button} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import AccountContainer from '../../container/AccountContainer/AccountContainer';
import BookInfo from '../../components/BookInfo/BookInfo';
import PageListSwitcher from '../../components/PageListSwitcher/PageListSwitcher';
import classes from './MyBooksPage.css';
import PostAddIcon from '@material-ui/icons/PostAdd';
class MyBooksPage extends React.Component{
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
            emptyArr:[]
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
        let emptyLen = end - this.state.Books.length;
        let emptyArr = [];
        for(let i=0;i<emptyLen;i++) emptyArr.push("1");
        console.log(emptyArr);
        this.setState({showBooks : arr, emptyArr:emptyArr});
    }
    componentDidMount(){
        console.log(this.state.userKey);
        fetch("http://91.231.86.36/account/authorbooks/?author="+this.state.userKey,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
            .then((response)=>{return response.json();})
            .then((responseJSON) =>{
                console.log(responseJSON);
                this.setState({Books:responseJSON.Books || []});
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
                      spacing={2}
                >
                    <Grid container item xs
                          direction={"column"}
                          spacing={2}
                    >
                        <Grid container direction='row' xs justify={"space-between"} alignItems={'center'}>
                            <h3>Мои книги: </h3>
                            <NavLink to={"/book/create"} >
                                <Button variant={"outlined"} color={"primary"}>
                                    Добавить новую книгу<PostAddIcon style={{marginLeft:10}}/>
                                </Button>
                            </NavLink>
                        </Grid>
                        <Divider/>
                        <Grid container direction={"column"} item xs>
                            {this.state.showBooks.length === 0 && <h4>В данный момент список пуст</h4>}

                            {this.state.showBooks.map((currElem,index,array)=>{
                                return (
                                    <Grid item xs><BookInfo datas={currElem}/><br/><Divider/></Grid>
                                );
                            })}

                            {this.state.emptyArr.map((currElem, index, array)=>{
                                return (<Grid item xs><div style={{height:100,width:20}}/></Grid>);
                            })}

                        </Grid>
                        {this.state.showBooks.length > 7 &&
                        <PageListSwitcher
                            ShowText={true}
                            handleBack={this.handleBackBooks}
                            handleNext={this.handleNextBooks}
                            disBack={this.state.isBegin}
                            disNext={this.state.isEnd}
                        />
                        }
                    </Grid>
                </Grid>
            </AccountContainer>
        );
    }
}

export default MyBooksPage;