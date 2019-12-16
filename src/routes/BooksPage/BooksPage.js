import React from 'react';
import {Divider, Grid} from '@material-ui/core';
import WorkContainer from '../../container/WorkContainer/WorkContainer';
import {NavLink} from 'react-router-dom';
import GET_API from '../../libs/api/GET_API';
import BookInfo from '../../components/BookInfo/BookInfo';
import BooksKeyWords from '../../components/BooksKeyWords/BooksKeyWords';
import PageListSwitcher from '../../components/PageListSwitcher/PageListSwitcher';
import BooksSortBy from '../../components/BooksSortBy/BooksSortBy';
import classes from './BooksPage.css';
class BooksPage extends React.Component{
    constructor(props){
        super(props);
        let genres = ["Все","Фантастика","Разное","Фэнтези","Боевик","Проза","Мистика","Мистика","Триллер","Любовь","Разное","Детектив"];
        let sorts = ["new","rate","edit","read"];
        let Genre = decodeURIComponent(GET_API.getParametersFromSearch(this.props.location.search,"genre")) || 'all';
        let OrderBy = decodeURIComponent(GET_API.getParametersFromSearch(this.props.location.search,"sort")) || 'rate';
        let KeyWord = decodeURIComponent(GET_API.getParametersFromSearch(this.props.location.search,"key")) || '';
        if(!(genres.includes(Genre))) Genre = "Все";
        if(!(sorts.includes(OrderBy))) OrderBy = "new";
        if(Genre === 'Любовь') Genre = "Любовные романы";
        this.state = {
            params: [Genre,OrderBy,KeyWord],
            genre:Genre,
            order: OrderBy,
            KeyWords: [],
            Books: [],
            showBooks: [],
            showKeys: [],
            isBeginBook: true,
            isEndBook: false,
            isBeginKeys: true,
            isEndKeys: false,
            startBook:0,
            startKey:0,
            endBook:5,
            endKey:20
        };
    }
    componentDidMount(){
        let params="";
        if(this.state.params[2].length === 0){
            params="?genre="+this.state.params[0]+"&sort="+this.state.params[1];
        }
        else params = "?key="+this.state.params[2]+"&sort="+this.state.params[1];
        fetch("http://91.231.86.36/books/get/"+params)
            .then((response)=>{return response.json();})
            .then((responseJSON) => {
                this.setState({
                    Books:responseJSON.Books,
                    KeyWords:responseJSON.KeyWords,
                });
                if(this.state.Books.length <=5) this.setState({isBeginBook:true,isEndBook:true});
                if(this.state.KeyWords.length <=20) this.setState({isBeginKeys:true,isEndKeys:true});
            });
    }


    render(){
        const handleSortBy = (obj) => {
            this.setState({order:obj});
            let params = this.state.params;
            params[1] = obj;
            this.setState({params:params});
            let query="";
            if(this.state.params[2].length === 0){
                query="?genre="+this.state.params[0]+"&sort="+this.state.params[1];
            }
            else query = "?key="+this.state.params[2]+"&sort="+this.state.params[1];
            this.props.history.push('/');
            setTimeout(()=>{
                this.props.history.push('/books'+query);
            },100);
        }
        const handleBackKeys = () => {
            this.setState({
                startKey:this.state.startKey-20,
                endKey: this.state.endKey-20
            });
            if(this.state.startKey===0){
                this.setState({isBeginKeys:true,isEndKeys:false});
            }
            else this.setState({isBeginKeys:false,isEndKeys:false});
            generateKeysArray(this.state.startKey,this.state.endKey);
        }
        const handleNextKeys = () => {
            this.setState({
                startKey:this.state.startKey+20,
                endKey: this.state.endKey+20
            });
            if(this.state.endKey>=this.state.KeyWords.length){
                this.setState({isEndKeys:true,isBeginKeys:false});
            }
            else this.setState({isEndKeys:false,isBeginKeys:false});
            generateKeysArray(this.state.startKey,this.state.endKey)
        }
        const handleBackBooks = () => {
            this.setState({
                startBook:this.state.startBook-5,
                endBook: this.state.endBook-5
            });
            if(this.state.startBook===0){
                this.setState({isBeginBook:true,isEndBook:false});
            }
            else this.setState({isBeginBook:false,isEndBook:false});

            generateBooksArray(this.state.startBook,this.state.endBook);
        }
        const handleNextBooks = () => {
            this.setState({
                startBook:this.state.startBook+5,
                endBook: this.state.endBook+5
            });
            if(this.state.endBook>=this.state.Books.length){
                this.setState({isEndBook:true,isBeginBook:false});
            }
            else this.setState({isEndBook:false,isBeginBook:false});
            generateBooksArray(this.state.startBook,this.state.endBook);
        }

        const generateBooksArray = (start,end) => {
            let data = this.state.Books;
            let arr = Array();
            for(let i=start; i < end && i < data.length;i++){
                arr.push(data[i]);
            }
            this.setState({showBooks: arr});
        }
        const generateKeysArray = (start,end) => {
            let data = this.state.KeyWords;
            let arr = Array();
            for(let i=start; i < end && i < data.length;i++){
                arr.push(data[i]);
            }
            this.setState({showKeys: arr});
        }
        const BookItem = (props) => {return (
            <React.Fragment>
                <Divider/>
                <BookInfo datas={props.datas}/>
                <br/>
            </React.Fragment>
        );};
        return(
            <WorkContainer>
                <Grid container item
                      style={{marginTop:20}}
                      direction={"row"}
                      justify={"space-between"}
                      xs={12}
                >
                    <Grid item xs={8} className={classes.Table} style={{backgroundColor: "snow",padding:15}} spacing={2}>
                        <h1>{this.props.genre}</h1>
                        <BooksSortBy onChange = {handleSortBy} value={this.props.order}/>
                        <h2>Перечень книг:</h2>
                        {this.state.Books.map((currElem,index,arr)=>{
                            return (<BookItem datas={currElem}/>);
                        })}
                        {this.state.Books.length > 0 &&
                        <PageListSwitcher
                            ShowText={true}
                            handleBack={handleBackBooks}
                            handleNext={handleNextBooks}
                            disBack={this.state.isBeginBook}
                            disNext={this.state.isEndBook}
                        />}
                        {this.state.Books.length === 0 && <h4>Отображение невозможно</h4>}
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={3} className={classes.Table} style={{backgroundColor:"snow",padding:10}} >
                        <h2>Подборка книг по <span style={{color:"skyblue"}}>ключевым</span> словам:</h2>
                        <BooksKeyWords datas={this.state.KeyWords} history={this.props.history}/>
                        {this.state.KeyWords.length > 0 && <PageListSwitcher
                            ShowText={false}
                            handleBack={handleBackKeys}
                            handleNext={handleNextKeys}
                            disBack={this.state.isBeginKeys}
                            disNext={this.state.isEndKeys}
                        />}
                    </Grid>
                </Grid>
            </WorkContainer>
        );
    }

}

export default BooksPage;