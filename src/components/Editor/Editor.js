import React from "react"
import { EditorState, RichUtils,KeyBindingUtil } from "draft-js"
import {Grid} from '@material-ui/core'
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
            editorState: EditorState.createEmpty(),
        }
        this.plugins = [
            highlightPlugin,
            addLinkPlugin,
        ];
    }

    toggleBlockType = (blockType) => {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    };
    onAddLink = () => {
        const editorState = this.state.editorState;
        const selection = editorState.getSelection();
        const link = window.prompt('Paste the link -')
        if (!link) {
            this.onChange(RichUtils.toggleLink(editorState, selection, null));
            return 'handled';
        }
        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
        const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
    }
    onChange = (editorState) => {
        this.setState({
            editorState
        })
    }

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    onUnderlineClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }

    onBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
    }

    onItalicClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
    }
    onHighlight = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'HIGHLIGHT'))
    }

    render() {
        return(
            <Grid container item xs direction="column" className="editorContainer" alignItems = 'center'>
                <Grid container item xs direction={"row"} justify={"center"}>
                    <BlockStyleToolbar
                        editorState={this.state.editorState}
                        onToggle={this.toggleBlockType}
                    />
                    <button className="highlight" onClick={this.onHighlight}>
                        <span style={{ background: "yellow" }}>H</span>
                    </button>
                    <button onClick={this.onUnderlineClick}>U</button>
                    <button onClick={this.onBoldClick}><b>B</b></button>
                    <button onClick={this.onItalicClick}><em>I</em></button>
                    <button onClick={this.onAddLink}><em>A</em></button>
                </Grid>
                <Grid className="editors" container item xs direction={"row"} justify={"center"}>
                    <div className={classes.FontTable} style={{width:1000,height:400, borderWidth:1, borderStyle:'solid', borderColor:"gray",overflow:"auto"}}>
                        <Editor
                            blockStyleFn={getBlockStyle}
                            editorState={this.state.editorState}
                            onChange={this.onChange}
                            plugins={this.plugins}
                        />
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default EditorManip;