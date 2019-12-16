import React from 'react';
import {Grid,Button} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import classes from './AuthorPage.css'
import RecommendContainer from '../../container/RecommendContainer/RecommendContainer';
import BookInfo from '../../components/BookInfo/BookInfo';
import PageListSwitcher from '../../components/PageListSwitcher/PageListSwitcher';
import GET_API from '../../libs/api/GET_API';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import GradeIcon from '@material-ui/icons/Grade';
class AuthorPage extends React.Component{
    constructor(props){
        super(props);

        let authorKey = GET_API.getParametersFromSearch(this.props.location.search,"user");
        this.state = {
            authorKey:authorKey,
            avatar: require('./avatar.jpg'),
            startBooks: 0,
            endBooks: 5,
            isBeginBooks: true,
            isEndBooks: false,
            AuthorBooks: [],
            AuthorInfo: {},
            showBooks:[],
            isLoaded:false,
            isFavorite:false,
            isLogged: false,
            isAuthor:false
        };
    }
    componentDidMount(){
        fetch("http://91.231.86.36/author/get/?user="+this.state.authorKey)
            .then((response)=>{return response.json();})
            .then((responseJSON) => {
                console.log("Author,",responseJSON);
                this.setState({
                    AuthorInfo:responseJSON.AuthorInfo,
                    AuthorBooks:responseJSON.AuthorBooks,
                    isLoaded: true
                });
                if(responseJSON.AuthorInfo.avatar.length>10) this.setState({avatar:responseJSON.AuthorInfo.avatar});
                let user = localStorage.getItem("user");
                if(user !== null) {
                    this.setState({isLogged : true});
                }
                if(this.state.isLogged) {
                    let user = JSON.parse(localStorage.getItem("user")).id;
                    if(user === this.state.AuthorInfo.user) this.setState({isAuthor:true});
                    fetch("http://91.231.86.36/author/catch/?user=" + user + "&author=" + this.state.authorKey)
                        .then(response => response.json())
                        .then(responseJSON => {
                            this.setState({isFavorite: responseJSON.isFavorite});
                        })
                }
                this.generateBooks(this.state.startBooks, this.state.endBooks);
            });

    }
    handleBackBooks(){
        this.setState({startBooks: this.state.startBooks-5, endBooks:this.state.endBooks-5});
        if(this.state.start === 0) this.setState({isBeginBooks:true,isEndBooks:false});
        else this.setState({isBeginBooks:false,isEndBooks:false});
        this.generateBooks(this.state.startBooks,this.state.endBooks);
    }
    handleNextBooks(){
        this.setState({startBooks: this.state.startBooks+5, endBooks:this.state.endBooks+5});
        if(this.state.end >= this.state.AuthorBooks.length) this.setState({isBeginBooks:false,isEndBooks:true});
        else this.setState({isBeginBooks:false,isEndBooks:false});
        this.generateBooks(this.state.startBooks,this.state.endBooks);
    }
    generateBooks(start,end){
        let arr = [];
        for(let i=start;i<end && i < this.state.AuthorBooks.length;i++){
            arr.push(this.state.AuthorBooks[i]);
        }
        this.setState({showBooks:arr});
        console.log('showBooks',arr)
    }
    render(){
        const handleAddFavorite = () => {
            let user = JSON.parse(localStorage.getItem("user"));
            const data = {author:this.state.authorKey,user:user.id};

            fetch("http://91.231.86.36/author/addfav/",{
                method:"POST",
                body: JSON.stringify(data),
                headers : {
                    "Content-Type":"application/json"
                }
            }).then(response=>response.json())
                .then(responseJSON=>{
                    console.log("AddFavorite",responseJSON);
                    this.setState({isFavorite:true})
                })
        };
        const handleDelFavorite = () => {
            let user = JSON.parse(localStorage.getItem("user"));
            const data = {author:this.state.authorKey, user : user.id};
            fetch("http://91.231.86.36/author/delfav/",{
                method:"POST",
                body : JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(response=>response.json())
                .then(responseJSON=>{
                    console.log("DelFavorite",responseJSON);
                    this.setState({isFavorite:false})
                })
        };
        return(
            <RecommendContainer>
                {this.state.isLoaded &&
                <Grid container item xs className={classes.FontTable} direction={"column"} spacing={4}>
                    <Grid container item xs className={classes.Table} direction={"row"} justify={"space-between"}>
                        <Grid item xs={4}>
                            <img src={this.state.avatar} height={196} width={196}
                                 style={{backgroundColor: "skyblue", borderRadius: 98}}/>
                        </Grid>
                        <Grid item container direction="column" xs={8} alignItems={"center"} spacing={1}>
                            <Grid item xs style={{fontSize: 32, textAlign: "center"}}>
                                {this.state.AuthorInfo.firstname + " " + this.state.AuthorInfo.surname}
                            </Grid>
                            <Grid item xs style={{fontSize: 24, textAlign: "center", color: "purple"}}>
                                <i>"{this.state.AuthorInfo.quote}"</i>
                            </Grid>
                            <Grid item xs style={{fontSize: 24}}>
                                Мастер жанра: <b style={{color: "skyblue"}}>{this.state.AuthorInfo.master}</b>
                            </Grid>
                            <Grid item xs style={{fontSize: 24}}>
                                Рейтинг: {this.state.AuthorInfo.rate}
                            </Grid>
                            <Grid container item xs style={{fontSize: 24}} justify={"center"} direction={"row"}>
                                <Grid item xs={6}>
                                    {!this.state.isFavorite && this.state.isLogged && !this.state.isAuthor &&
                                    <Button onClick={handleAddFavorite} variant={"contained"} color={"primary"} style={{marginLeft:10, alignText: "center"}}>
                                        <GradeIcon  style={{color: "white", rotate: 90}}/> Добавить в избранныe
                                    </Button>}
                                    {this.state.isFavorite && this.state.isLogged && !this.state.isAuthor &&
                                    <Button onClick={handleDelFavorite} variant={"contained"} color={"secondary"} style={{marginLeft:10, alignText: "center"}}>
                                        <GradeIcon  style={{color: "gold", rotate: 90}}/> Избранный автор
                                    </Button>}

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container justify={"space-between"} direction={"column"} alignItems={"center"} item xs={1}>
                        <DoubleArrowIcon
                            className={classes.IconToBottom} style={{marginLeft: 326, fontSize: 48}}/>
                    </Grid>
                    <Grid container item lg className={classes.Table} direction={"column"} spacing={1}>
                        <Grid item xs><h2>Книги автора:</h2></Grid>
                        {this.state.showBooks.map((currElem, index, arr) => {
                            return (
                                <Grid item xs>
                                    <BookInfo datas={currElem}/>
                                </Grid>
                            );
                        })}
                        {this.state.showBooks.length > 7 &&
                        <PageListSwitcher
                            ShowText={true}
                            handleNext={this.handleNextBooks}
                            handleBack={this.handleBackBooks}
                            disNext={this.state.isEndBooks}
                            disBack={this.state.isBeginBooks}
                        />
                        }
                        {this.state.showBooks.length === 0 &&
                            <Grid item xs>
                                <h4 style={{textAlign:"center"}}>Данный автор еще не публиковал свои произведения.</h4>
                            </Grid>
                        }
                    </Grid>
                </Grid>
                }
            </RecommendContainer>
        );
    }
}

export default AuthorPage;

