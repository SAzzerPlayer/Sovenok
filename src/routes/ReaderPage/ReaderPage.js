import React from 'react';
import {Grid,Button,Select,MenuItem, InputLabel} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import classes from './ReaderPage.css';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js';

import GET_API from '../../libs/api/GET_API';
import EditorManip from '../../components/Editor/Editor';

class ReaderPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookKey : GET_API.getParametersFromSearch(this.props.location.search,"book"),
            editorState: EditorState.createEmpty(),
            bookInfo:{},
            bookContents:[],
            currPriority:1,
            currName:'',
            isLogged:false
        };
    }
    componentDidMount(){
        fetch("http://91.231.86.36/book/get?book="+this.state.bookKey)
            .then(response => response.json())
            .then(responseJSON => {
                console.log("reader",responseJSON);
                this.setState({
                    bookInfo : responseJSON.BookInfo,
                    bookContents:responseJSON.BookContents
                });
                fetch("http://91.231.86.36/book/get/text?book="+this.state.bookKey+"&priority="+this.state.bookContents[0].priority)
                    .then(response=>response.json())
                    .then(responseJSON => {
                        this.setState({
                            editorState:EditorState.createWithContent(convertFromRaw(responseJSON.contentInfo.file)),
                            currName:responseJSON.contentInfo.name
                        })
                    })
            })
        let user = localStorage.getItem("user");
        if(user !== null) this.setState({isLogged:true});
    }
    render(){

        const onChange = (editorState) => {
            this.setState({
                editorState : editorState
            })
        };
        const handleChangeParagraph = (obj) => {
            fetch("http://91.231.86.36/book/get/text?book="+this.state.bookKey+"&priority="+obj.target.value)
                .then(response=>response.json())
                .then(responseJSON => {
                    this.setState({
                        editorState:EditorState.createWithContent(convertFromRaw(responseJSON.contentInfo.file)),
                        currName:responseJSON.contentInfo.name
                    })
                })
        };
        return(
            <Grid container item direction={"row"} xs alignItems={"center"}>
                <Grid item xs={1}/>
                <Grid item direction={"column"} container xs={10} alignItems={'center'} className={classes.Table}>
                    <Grid item xs>
                        <h1>{this.state.bookInfo.name}</h1>
                    </Grid>
                    <Grid item xs>
                        <h2>{this.state.currName}</h2>
                    </Grid>
                    <Grid container item xs justify={"space-between"} alignItems>
                        <Grid item xs={1}/>
                        <Grid item xs={4}>
                            <NavLink to={"/book?book="+this.state.bookKey}>
                                <Button variant={"contained"} color={"primary"}>Вернуться к книге</Button>
                            </NavLink>
                        </Grid>
                        <Grid container item xs={6} justify={"flex-end"} alignItems={"center"} alignContent={"center"}>
                            <InputLabel id={"selectContent"} style={{marginRight:10}}>Выбрать раздел:</InputLabel>
                            <Select
                                label={"Выбрать раздел"}
                                onChange={handleChangeParagraph}
                                style={{minWidth:200}}
                                labelId={"selectContent"}
                            >
                                {this.state.bookContents.map((currElem, index,array)=>{
                                    let bool = false;
                                    if(this.state.isLogged === false && index >= 2) bool=true;
                                    console.log(bool);
                                    return (
                                        <MenuItem value={currElem.priority} disabled={bool}>
                                            {currElem.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={1}/>
                    </Grid>
                    <Grid item xs>
                        <EditorManip
                            closeTab = {true}
                            readOnly={true}
                            editorState = {this.state.editorState}
                            onChange = {onChange}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        );
    }
}
export default ReaderPage;