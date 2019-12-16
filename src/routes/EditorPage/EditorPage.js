import React from 'react';
import {Grid,Button,IconButton,TextField,Input} from '@material-ui/core';
import classes from './EditorPage.css';
import {NavLink} from 'react-router-dom';
import {EditorState, convertFromRaw, convertToRaw,convertFromHTML,ContentState} from 'draft-js';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import EditorManip from '../../components/Editor/Editor';
import GET_API from '../../libs/api/GET_API';
class EditorPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editorState:EditorState.createEmpty(),
            bookKey:GET_API.getParametersFromSearch(this.props.location.search,"book"),
            priorityKey:GET_API.getParametersFromSearch(this.props.location.search,"priority"),
            nameOrig:'',
            name : "",
            nameCheck: false,
            isChangingName: false,
            fileInput: React.createRef()
        };
    }

    onChange = (State) => {
        this.setState({
            editorState:State
        })
    }
    componentDidMount(){
        fetch("http://91.231.86.36/book/get/text/?book="+this.state.bookKey+"&priority="+this.state.priorityKey)
            .then(response=>response.json())
            .then(responseJSON=>{
                console.log(responseJSON);
                this.setState({
                        editorState: EditorState.createWithContent(convertFromRaw(responseJSON.contentInfo.file)),
                        name: responseJSON.contentInfo.name.trim(),
                        nameOrig: JSON.parse(JSON.stringify({name:responseJSON.contentInfo.name})).name.trim()
                        }
                    );
            })
    }
    render(){
        const checkName = (obj) => {
            let regExp = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
            this.setState({name:obj.target.value});
            if(obj.target.value.match(regExp) === null || obj.target.value.length === 0) this.setState({nameCheck:true});
            else this.setState({nameCheck:false});
        };
        const handleSaveName = () => {
            let name = this.state.name;
            let book = this.state.bookKey;
            let priority = this.state.priorityKey;
            const data = {name:name, book:book, priority:priority};
            fetch("http://91.231.86.36/book/update/text/info",{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(response=>response.json())
                .then(responseJSON=>{
                    this.setState({isChangingName:false});
                })
        };
        const handleSaveText = () => {
            let contentState = this.state.editorState.getCurrentContent();
            let rawObj = convertToRaw(contentState);
            const data = {
                name : this.state.name,
                book : this.state.bookKey,
                priority: this.state.priorityKey,
                file : rawObj
            };
            fetch("http://91.231.86.36/book/update/text/file",{
                method:"POST",
                body: JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(response => response.json())
                .then(responseJSON => {
                    this.props.history.push("/book/edit?book="+this.state.bookKey);
                })
        };
        const onChange = (editorState) => {
            this.setState({
                editorState : editorState
            })
        };
        const handleLoadFile = async (obj) => {
            let reader = new FileReader();
            reader.onload = ()=>{
                const blocksFromHTML = convertFromHTML(reader.result);
                const state = ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap
                );
                this.setState({editorState: EditorState.createWithContent(state),})
            };
            reader.readAsText(this.state.fileInput.current.files[0])

        }
        return(
            <Grid container item xs direction={"column"} alignItems = {"center"} className={classes.Table}>
                <Grid item xs><h2>Редактирование текста</h2></Grid>
                <Grid container item xs direction={"row"} justify={"space-between"}>
                    <Grid container direction={'column'} item xs justify={"flex-end"} alignItems={'center'}>
                        <b>Загрузить из файла(.txt, .html)</b>
                        <input type={"file"} ref={this.state.fileInput} onChange={handleLoadFile} style={{margin:10,paddingLeft:12}}/>
                    </Grid>
                    <Grid container item xs style={{textAlign:"center"}} direction={"row"} justify={"center"}>
                        <TextField
                            disabled = {!this.state.isChangingName}
                            variant={"outlined"}
                            value={this.state.name}
                            error={false}
                            label={"Название раздела"}
                            onChange={checkName}
                            style={{marginRight:15,minWidth:200,marginBottom:5}}
                        />
                        {!this.state.isChangingName && <IconButton style={{fontSize:14}} onClick={()=>{this.setState({isChangingName:true})}}><EditIcon/></IconButton>}
                        {this.state.isChangingName && <IconButton style={{fontSize:14}} onClick={handleSaveName}><SaveIcon/></IconButton>}
                    </Grid>
                    <Grid container item xs alignItems={"center"}>
                        <NavLink to={"/book/edit?book="+this.state.bookKey}>
                            <Button variant={"contained"} color={"primary"} style={{marginRight:10}}>
                                Назад
                            </Button>
                        </NavLink>
                        <Button onClick={handleSaveText} variant={"contained"} color={"secondary"}>Сохранить</Button>
                    </Grid>
                </Grid>
                <EditorManip
                    readOnly={false}
                    closeTab = {false}
                    editorState={this.state.editorState}
                    onChange = {onChange}
                />
            </Grid>
        );
    }
}

export default EditorPage;