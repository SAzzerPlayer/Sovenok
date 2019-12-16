import React from 'react';
import {Grid,List,ListItem,Button} from "@material-ui/core";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
class PageListSwitcher extends React.Component{
    constructor(props){
        super(props);
        this.state={ShowText: this.props.ShowText};
    }
    render(){
        return(
            <Grid container item xs
                direction={"row"}
                  justify={"space-between"}
            >
                <Grid item xs={3}>
                    <Button
                        variant={"outlined"}
                        onClick={this.props.handleBack}
                        disabled={this.props.disBack}
                    >
                    <KeyboardBackspaceIcon style={{fontSize:18}}/>
                    {this.state.ShowText && "Назад"}
                </Button></Grid>
                <Grid item xs={6}/>

                <Grid item xs={3}>
                    <Grid container item xs justify={"flex-end"}>
                        <Button
                            variant={"outlined"}
                            onClick={this.props.handleNext}
                            disabled={this.props.disNext}
                        >
                        {this.state.ShowText && "Вперёд"}
                        <ArrowRightAltIcon/>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default PageListSwitcher;