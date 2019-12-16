import React from 'react';
import {Container, Divider, Grid,IconButton,Typography} from "@material-ui/core";
import {NavigateNext, NavigateBefore} from "@material-ui/icons";
import BookOfCarousel from '../../components/BookOfCarousel/BookOfCarousel';
import classes from './BooksCarousel.css';
class BooksCarousel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            genre: "Фантастика",
            showData: [],
            begin: 0,
            end: 5,
            isBegin: true,
            isEnd: false,
            isLoaded: false,
            emptyArr: []
        };

    }
    componentDidMount() {
        console.log(this.state);
        this.generateAuxArr(this.state.begin,this.state.end);
    }

    generateAuxArr(begin,end){
            let data = this.props.datas;
            const arr = [];
            let i = begin;
            for(;i < end && i < data.length;i++){
                arr.push(data[i]);
            }
            let emptyLen = end - i;
            let emptyArr = [];
            for(let j = 0; j<emptyLen;j++){
                emptyArr.push(1);
            }
            this.setState({showData:arr, isLoaded:true,emptyArr: emptyArr});
            if(data.length < 6) this.setState({isEnd:true});

    }
    handleNext(obj){
        this.setState({end:this.state.end+1,begin:this.state.begin+1});
        if(this.state.end === this.props.datas.length) this.setState({isEnd: true,isBegin:false});
        else this.setState({isEnd:false,isBegin:false});
        this.generateAuxArr(this.state.begin,this.state.end);
    }
    handleBack(obj){
        this.setState({end:this.state.end-1,begin:this.state.begin-1});
        if(this.state.begin === 0) this.setState({isEnd: false,isBegin:true});
        else this.setState({isEnd:false, isBegin:false});
        this.generateAuxArr(this.state.begin,this.state.end);
    }
    render(){

        const Inside = (props) =>{
            return(
                <Grid
                style={{margin:5}}
                container
                alignItems={"center"}
                alignContent={"center"}
                direction={"row"}
                justify={"space-evenly"}
            >
                <Grid item xs={1}>
                    <IconButton
                        disabled={this.state.isBegin}
                        onClick={this.handleBack}
                    >
                        <NavigateBefore/>
                    </IconButton>

                </Grid>

                    {this.state.isLoaded && this.state.showData.map((currElem,index,array)=>{
                        return (<BookOfCarousel data={currElem} cover={currElem.cover}/>);
                    })}
                    {this.state.isLoaded && this.state.emptyArr.map((currElem)=>{
                        return (<div style={{width:90,height:120}}/>);
                    })}
                <Grid item xs={1}>
                    <IconButton
                        disabled={this.state.isEnd}
                        onClick={this.handleNext}
                    >
                        <NavigateNext/>
                    </IconButton>
                </Grid>
            </Grid>
            );
        };
        return(
          <Container>
            <h3>{this.props.title}</h3>
              <Divider/>
              { this.props.datas.length === 0 && <h4>В данный момент список пуст</h4> }
              { this.props.datas.length > 0 && <Inside/>}
          </Container>
        );
    }
}
export default BooksCarousel;