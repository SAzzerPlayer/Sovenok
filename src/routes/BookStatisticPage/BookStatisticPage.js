import React from 'react';
import {Grid,Table,TableBody,TableCell,TableHead,TableRow,Button,Divider} from '@material-ui/core';
import AccountContainer from '../../container/AccountContainer/AccountContainer';
import classes from './BookStatisticPage.css';
class BookStatisticPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            stats:[],
            gradeStats:[],
            isLoaded:false,
            isFirstTable:true,
            tableButton:{
                true:"contained",
                false:"outlined"
            }
        }
    }
    componentDidMount(){
        let user = JSON.parse(localStorage.getItem("user"));
        fetch("http://91.231.86.36/author/statistics/views/?user="+user.id)
            .then(response=>response.json())
            .then(responseJSON=>{
                console.log("StatisticsView",responseJSON)
                this.setState({stats:responseJSON.ViewStats})
                fetch("http://91.231.86.36/author/statistics/grades/?user="+user.id)
                    .then(response=>response.json())
                    .then(responseJSON=>{
                        console.log("StatisticsGrade",responseJSON)
                        this.setState({gradeStats:responseJSON.GradeStats,isLoaded:true})
                    })
            })
    }
    render(){
        const StatViewTable = () =>{
            return (
                <TableBody>
                    {this.state.stats.map((currElem,index,array)=>{
                        return (<TableRow>
                            <TableCell>{currElem.name}</TableCell>
                            <TableCell>{currElem.day}</TableCell>
                            <TableCell>{currElem.week}</TableCell>
                            <TableCell>{currElem.month}</TableCell>
                            <TableCell>{currElem.year}</TableCell>
                            <TableCell>{currElem.all}</TableCell>
                        </TableRow>);
                    })}
                </TableBody>
            );
        };
        const StatGradeTable = () => {
            return (
                <TableBody>
                    {this.state.gradeStats.map((currElem,index,array)=>{
                        return (<TableRow>
                            <TableCell>{currElem.name}</TableCell>
                            <TableCell>{currElem.day}</TableCell>
                            <TableCell>{currElem.week}</TableCell>
                            <TableCell>{currElem.month}</TableCell>
                            <TableCell>{currElem.year}</TableCell>
                            <TableCell>{currElem.all}</TableCell>
                        </TableRow>);
                    })}
                </TableBody>
            );
        }
        return(
            <AccountContainer>
                <Grid container item xs
                      className={classes.Table}
                      direction={"column"}
                      alignItems={"center"}
                      spacing={4}
                >
                    <h2>Статистика</h2>
                    <div>
                        <Button
                            variant={this.state.tableButton[this.state.isFirstTable]}
                            color={"primary"}
                            style={{marginRight:20}}
                            onClick={()=>{this.setState({isFirstTable:true})}}
                        >Просмотры</Button>
                        <Button
                            variant={this.state.tableButton[!this.state.isFirstTable]}
                            color={"primary"}
                            onClick={()=>{this.setState({isFirstTable:false})}}
                        >Награды</Button>
                    </div>
                    <Divider/>
                    <Table className={classes.TableMain}>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Название книги</b></TableCell>
                                <TableCell><b>За день</b></TableCell>
                                <TableCell><b>За неделю</b></TableCell>
                                <TableCell><b>За месяц</b></TableCell>
                                <TableCell><b>За год</b></TableCell>
                                <TableCell><b>Всего</b></TableCell>
                            </TableRow>
                        </TableHead>
                        {this.state.isFirstTable && <StatViewTable/>}
                        {!this.state.isFirstTable && <StatGradeTable/>}
                    </Table>
                </Grid>
            </AccountContainer>
        );
    }
}

export default BookStatisticPage;