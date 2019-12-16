
import React from 'react';
import MainInfoTable from "../../components/MainInfoTable/MainInfoTable";
import {Divider, Grid,Snackbar} from "@material-ui/core";
import WorkContainer from '../../container/WorkContainer/WorkContainer';
import BooksCarousel from '../../container/BooksCarousel/BooksCarousel';
import BottomAboutMenu from "../../components/BottomAboutMenu/BottomAboutMenu";
import BooksKeyWords from '../../components/BooksKeyWords/BooksKeyWords';
import classes from "./IndexPage.css";
import GET_API from "../../libs/api/GET_API";
import Loading from '../../components/Loading/Loading'
class IndexPage extends React.Component{
    constructor(props) {
        super(props);
        let param = GET_API.getParametersFromSearch(this.props.location.search, "activate");

        this.state = {
            activate: param,
            TopBooks: [],
            NewBooks: [],
            ReadBooks: [],
            KeyWords: [],
            loadingError: false,
            snackActivateFalse: false,
            snackActivateTrue: false,
            isLoading: true,
            isClosedInfo:false
        };
    }
    componentWillMount(){
        fetch("http://91.231.86.36/index/recommend/")
            .then((response)=>{return response.json();})
            .then((responseJSON) => {
                console.log(responseJSON);
                this.setState({
                    TopBooks:responseJSON.TopBooks,
                    KeyWords: responseJSON.KeysWords,
                    ReadBooks:responseJSON.ReadBooks,
                    NewBooks:responseJSON.NewBooks,
                    isLoading : false
                })

                let tab = sessionStorage.getItem("closeTab");
                if(tab !== null){
                    this.setState({isClosedInfo:true});
                    console.log("66666666666666666666666");
                }
            })
            .catch((err)=>{
                this.setState({
                    loadingError:true
                })
            });

        if(this.state.activate.length > 0 ){
            let data = {activateCode:this.state.activate};
            fetch("http://91.231.86.36/register/activate",{
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
            })
                .then(response=>response.json())
                .then(responseJSON=>{
                    if(responseJSON.isActivated){
                        this.setState({snackActivateTrue:true})}
                    else this.setState({snackActivateFalse:true});
                });

        }
    }
    render(){
        const handleCloseTab = () => {this.setState({isClosedInfo:true})};
        if(this.state.isLoading) return (<Loading/>);
        else return(
            <WorkContainer>
                {!this.state.isClosedInfo && <MainInfoTable onChange = {handleCloseTab}/>}
                <Grid container item
                      style={{marginTop:20}}
                      direction={"row"}
                      justify={"space-between"}
                      xs={12}
                >
                    <Grid item xs={8} className={classes.Table} style={{backgroundColor: "snow",padding:4}} spacing={2}>
                        <h2>Подборки книг по разным критериям:</h2>
                        <Divider/>
                        <BooksCarousel datas = {this.state.TopBooks} title={"Топ в разных жанрах"}/>
                        <BooksCarousel datas = {this.state.ReadBooks} title={"Бестридеры"}/>
                        <BooksCarousel datas = {this.state.NewBooks} title={"Новинки"}/>
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={3} className={classes.Table} style={{backgroundColor:"snow",padding:4}} >
                        <h2>Подборка книг по <span style={{color:"skyblue"}}>ключевым</span> словам:</h2>
                        <BooksKeyWords title="hello" datas={this.state.KeyWords} history={this.props.history}/>
                    </Grid>
                </Grid>
                <BottomAboutMenu/>
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                    open={this.state.snackActivateFalse}
                    onClose={()=>{this.setState({snackActivateFalse:false})}}
                    ContentProps={{
                        'aria-describedby': 'message-idRegister',
                    }}
                    message={<span id="message-idRegister">Ключ активации аккаунта не действителен.</span>}
                />
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                    open={this.state.snackActivateTrue}
                    onClose={()=>{this.setState({snackActivateTrue:false})}}
                    ContentProps={{
                        'aria-describedby': 'message-idRegister',
                    }}
                    message={<span id="message-idRegister">Аккаунт успешно активирован!</span>}
                />
            </WorkContainer>
        );
    }
}
export default IndexPage;
