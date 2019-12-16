import React from 'react';
import {Grid,Button} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import classes from './AuthorsQuadroList.css';
import PageListSwitcher from '../../components/PageListSwitcher/PageListSwitcher';
class AuthorsQuadroList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            start: 0,
            end: 4,
            isBegin: true,
            isEnd: false,
            isSecondPage: false,
            isEmpty: false,
            showAuthors: [],
            emptyArr: [],
            emptyMessage: ""
        };
        let datas = this.props.datas || [];
        if (datas.length <= this.state.end) this.setState({isEnd: true});
        if (this.props.withGenres === false) this.setState({emptyMessage: "Подходящих авторов под данный жанр нет"});
        else this.setState({emptyMessage: "В данный момент список пуст"})
    }


    componentDidMount(){
        this.generateArr(this.state.start,this.state.end);
    }
    generateArr(start,end){
        let arr=[];
        for(let i = start;i<end && i<this.props.datas.length;i++){
            arr.push(this.props.datas[i]);
        }
        let emptyLen = end - start;
        let emptyArr = [];
        for ( let i = 0; i < emptyLen; i++){
            emptyArr.push(1);
        }
        this.setState({showAuthors:arr,emptyArr:emptyArr});
    }
    handleAuthorBack(){
        this.setState({start:this.state.start-4,end:this.state.end-4});
        if(this.state.begin === 0) this.setState({isEnd:false,isBegin:true});
        else this.setState({isEnd:false,isBegin:false});
        this.generateArr(this.state.start,this.state.end);
    }
    handleAuthorNext(){
        this.setState({start:this.state.start+4,end:this.state.end+4});
        if(this.state.end >= this.props.data.length) this.setState({isEnd:true,isBegin:false});
        else this.setState({isEnd:false,isBegin:false});
        this.generateArr(this.state.start,this.state.end);
    }
    render(){
        const Genres = () => {
            const genres = {
                true:[
                    {name:"genre1",show:"Фантастика"},
                    {name:"genre2",show:"Триллер"},
                    {name:"genre3",show:"Ужасы"},
                    {name:"genre4",show:"Фэнтези"},
                    {name:"genre5",show:"Детектив"}
                ],
                false:[
                    {name:'genre6',show:'Боевик'},
                    {name:'genre7',show:'Проза'},
                    {name:'genre8',show:'Любовные романы'},
                    {name:'genre9',show:'Разное'}
                ]
            };

            return (
                <Grid container item xs direction={"rom"} justify={"space-between"}>
                    <Grid item xs>
                        <Button onClick={()=>{this.setState({isSecondPage:!this.state.isSecondPage})}}><ChevronLeftIcon/></Button>
                    </Grid>
                    {genres[this.state.isSecondPage].map((currElem,index,arr)=>{
                        return(
                            <Grid item xs>
                                <Button onClick={()=>{this.props.value.setState({genre:currElem['name']})}}>{currElem.show}</Button>
                            </Grid>
                        );
                    })}
                    <Grid item xs>
                        <Button onClick={()=>{this.setState({isSecondPage:!this.state.isSecondPage})}}><ChevronRightIcon/></Button>
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
                    {this.state.showAuthors.map((currElem,index,arr)=>{
                        let avatar = require('./avatar.jpg');
                        if(currElem.avatar.length > 10) avatar = currElem.avatar;
                        if(index%2===0){
                            return (
                                <Grid container item xs={6} direction={"row"} justify={"space-between"}>
                                    <Grid item xs={3}><img src={avatar} width={64} height={64} style={{backgroundColor:"skyblue",borderRadius:32}}/></Grid>
                                    <Grid container xs={9} item direction={"column"}>
                                        <Grid item xs>
                                            <NavLink style={{color:"black"}} to={"/author?user="+currElem.id}><b>{currElem.firstname+" "+currElem.surname}</b></NavLink>
                                        </Grid>
                                        <Grid item xs>
                                            <u>Рейтинг: {currElem.rate}</u>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            );
                        }
                    })}

                    {this.state.emptyArr.map((currElem,index,arr)=>{
                        if(index%2 === 0){
                            return(
                                <Grid container item xs={6} direction={"row"} justify={"space-between"}>
                                    <div style={{width:48,height:48}}/>
                                </Grid>
                            )
                        }
                    })}

                </Grid>
                <Grid item container xs direction={"row"} justify="space-between" spacing={2}>

                    {this.state.showAuthors.map((currElem,index,arr)=>{
                        let avatar = require('./avatar.jpg');
                        if(currElem.avatar.length > 10) avatar = currElem.avatar;
                        if(index%2===1){
                            return (
                                <Grid container item xs={6} direction={"row"} justify={"space-between"}>
                                    <Grid item xs={3}><img src={avatar} width={64} height={64} style={{backgroundColor:"skyblue",borderRadius:32}}/></Grid>
                                    <Grid container xs={9} item direction={"column"}>
                                        <Grid item xs>
                                            <NavLink style={{color:"black"}} to={"/author?user="+currElem.id}><b>{currElem.firstname+" "+currElem.surname}</b></NavLink>
                                        </Grid>
                                        <Grid item xs>
                                            <u>Рейтинг: {currElem.rate}</u>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            );
                        }
                    })}

                    {this.state.emptyArr.map((currElem,index,arr)=>{
                        if(index%2 === 1){
                            return(
                                <Grid container item xs={6} direction={"row"} justify={"space-between"}>
                                    <div style={{width:48,height:48}}/>
                                </Grid>
                            )
                        }
                    })}
                </Grid>
                {this.state.showAuthors.length > 0 && <Grid item xs>
                    <PageListSwitcher
                        ShowText={true}
                        handleNext={this.handleAuthorNext}
                        handleBack={this.handleAuthorBack}
                        disBack={this.state.isBegin}
                        disNext={this.state.isEnd}
                    />
                </Grid> }
                {this.state.showAuthors.length === 0 && <Grid item xs><h4 style={{textAlign:"center"}}>{this.state.emptyMessage}</h4></Grid>}
            </Grid>
        );
    }
}

export default AuthorsQuadroList;