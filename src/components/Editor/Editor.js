import React from "react"
import { EditorState, RichUtils,KeyBindingUtil } from "draft-js"
import {Grid,Button,ButtonGroup} from '@material-ui/core'
import Editor from "draft-js-plugins-editor"
import createHighlightPlugin from './HighlightPlugin'
import addLinkPlugin from './addLinkPlugin'
import BlockStyleToolbar, {getBlockStyle} from "./blockStyles/blockStyleToolbar";
import classes from './Editor.css';


const highlightPlugin = createHighlightPlugin();

class EditorManip extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            export : this.props.onChange,
            editorState: this.props.editorState,
        }
        this.plugins = [
            highlightPlugin,
            addLinkPlugin,
        ];
    }

    toggleBlockType = (blockType) => {
        this.props.onChange(RichUtils.toggleBlockType(this.props.editorState, blockType));
    };
    onAddLink = () => {
        const editorState = this.props.editorState;
        const selection = editorState.getSelection();
        const link = window.prompt('Paste the link -')
        if (!link) {
            this.props.onChange(RichUtils.toggleLink(editorState, selection, null));
            return 'handled';
        }
        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
        const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        this.props.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
    }
    onChange = (editorState) => {
        this.setState({
            editorState
        })
    }

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.props.editorState, command);
        if (newState) {
            this.props.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    onUnderlineClick = () => {
        this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'UNDERLINE'));
    }

    onBoldClick = () => {
        this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'BOLD'))
    }

    onItalicClick = () => {
        this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'ITALIC'))
    }
    onHighlight = () => {
        this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'HIGHLIGHT'))
    }

    render() {
        return(
            <Grid container item xs direction="column" className="editorContainer" alignItems = 'center'>
                {!this.props.closeTab && <Grid container item xs direction={"row"} justify={"center"} style={{margin:10}}>
                    <ButtonGroup>
                    <BlockStyleToolbar
                        editorState={this.state.editorState}
                        onToggle={this.toggleBlockType}
                    />
                        <Button variant='outlined' className="highlight" onClick={this.onHighlight}>
                            <span style={{ background: "yellow" }}>H</span>
                        </Button>
                        <Button variant='outlined' onClick={this.onUnderlineClick}>U</Button>
                        <Button variant='outlined'onClick={this.onBoldClick}><b>B</b></Button>
                        <Button variant='outlined'onClick={this.onItalicClick}><em>I</em></Button>
                        <Button variant='outlined'onClick={this.onAddLink}><em>A</em></Button>
                    </ButtonGroup>
                </Grid>}
                <Grid className="editors" container item xs direction={"row"} justify={"center"}>
                    <div className={classes.FontTable} style={{width:1000,height:400, borderWidth:1, borderStyle:'solid', borderColor:"gray",overflow:"auto"}}>
                        <Editor
                            blockStyleFn={getBlockStyle}
                            editorState={this.props.editorState}
                            onChange={(obj)=>{this.props.onChange(obj)}}
                            plugins={this.plugins}
                            readOnly={this.props.readOnly}
                        />
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default EditorManip;