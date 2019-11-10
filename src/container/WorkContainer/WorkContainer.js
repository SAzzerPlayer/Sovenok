import React from 'react';
import Radium from 'radium';
import classes from "./WorkContainer.css";

class WorkContainer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={classes.container}>
                <div className={classes.container}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Radium(WorkContainer);