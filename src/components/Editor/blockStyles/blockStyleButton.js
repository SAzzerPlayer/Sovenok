import React from "react"
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
            <button onClick={this.onToggle}>
                <span >
                    {this.props.label}
                </span>
            </button>
        );
    }
}
export default BlockStyleButton