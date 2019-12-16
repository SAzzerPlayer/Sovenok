import React from 'react';
import {Grid,List,ListItem,Button} from '@material-ui/core';
import classes from './BooksSortBy.css';
class BooksSortBy extends React.Component{
    constructor(props){
        super(props);
        this.state={
            turnOn: Array()
        };

    }
    componentDidMount() {
        if(this.props.value === "rate") this.setState({turnOn:["contained","outlined","outlined","outlined"]});
        if(this.props.value === "new") this.setState({turnOn:["outlined","contained","outlined","outlined"]});
        if(this.props.value === "read") this.setState({turnOn:["outlined","outlined","contained","outlined"]});
        if(this.props.value === "edit") this.setState({turnOn:["outlined","outlined","outlined","contained"]});
    }

    render(){
        return(
            <Grid container item xs direction={"row"} alignItems={"center"} className={classes.SortTable}>
                <Grid item xs={3}><b>Сортировать по:</b></Grid>
                <Grid container item xs={9} direction={"row"} justify={"space-between"}>
                    <Grid item xs>
                        <Button variant={this.state.turnOn[0]}
                                onClick={()=>{
                                    this.props.onChange("rate");
                                    this.setState({turnOn:["contained","outlined","outlined","outlined"]});
                                }}
                        >Популярные</Button>
                    </Grid>
                    <Grid item xs>
                        <Button variant={this.state.turnOn[1]}
                                onClick={()=>{
                                    this.props.onChange("new");
                                    this.setState({turnOn:["outlined","contained","outlined","outlined"]});
                                }}
                        >Новинки</Button>
                    </Grid>
                    <Grid item xs>
                        <Button variant={this.state.turnOn[2]}
                                onClick={()=>{
                                    this.props.onChange("read");
                                    this.setState({turnOn:["outlined","outlined","contained","outlined"]})
                                }}
                        >Бестридеры</Button>
                    </Grid>
                    <Grid item xs>
                        <Button variant={this.state.turnOn[3]}
                                onClick={()=>{
                                    this.props.onChange("edit");
                                    this.setState({turnOn:["outlined","outlined","outlined","contained"]});
                                }}
                        >Обновленные</Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default BooksSortBy;