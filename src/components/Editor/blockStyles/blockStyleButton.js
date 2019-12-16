import React from "react"
import {Button} from '@material-ui/core'
class BlockStyleButton extends React.Component {
    onToggle = (e) => {
        e.preventDefault()
        this.props.onToggle(this.props.style)
    }
    render() {
        let className = "RichEditor-styleButton"
        if (this.props.active) {
            className += " RichEditor-activeButton"
        }
        return (
            <Button
                variant={'outlined'}
                onClick={this.onToggle}>
                <span >
                    {this.props.label}
                </span>
            </Button>
        );
    }
}
export default BlockStyleButton