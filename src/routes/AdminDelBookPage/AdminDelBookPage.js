import React from 'react';
import {
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, DialogContentText, TextField
} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import classes from './AdminDelBookPage.css';
import AdminContainer from '../../container/AdminContainer/AdminContainer';

class TableUserRow extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isOpenDialog:false
        }
    }
    render(){
        return(
            <TableRow>
                <TableCell>{this.props.task.name}</TableCell>
                <TableCell><NavLink to={"/book?book="+this.props.task.book}>Профиль</NavLink></TableCell>
                <TableCell><Button onClick={()=>{this.setState({isOpenDialog:true})}}>Посмотреть</Button></TableCell>
                <TableCell><Button variant={"contained"} color={"primary"} onClick={()=>{this.props.handleAccept(this.props.task.user,this.props.task.book)}}>Принять</Button></TableCell>
                <TableCell><Button variant={"contained"} color={"secondary"} onClick={()=>{this.props.handleDecline(this.props.task.user,this.props.task.book)}}>Отклонить</Button></TableCell>
                <Dialog
                    open={this.state.isOpenDialog}
                    onClose={()=>{this.setState({isOpenDialog:false})}}
                >
                    <DialogTitle id="alert-dialog-title">{"Мотивационный лист"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.task.notes}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{this.setState({isOpenDialog:false})}} color="primary">
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
            </TableRow>
        );
    }
}
class AdminDelBookPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tasks:[],
            users:[]
        }
    }
    componentDidMount(){
        fetch("http://91.231.86.36/admin/booktasks/get/")
            .then(response=>response.json())
            .then(responseJSON=>{
                this.setState({tasks:responseJSON.tasks});
            })
    }


    render(){
        const handleDecline = (user,book) => {
            fetch("http://91.231.86.36/admin/bookdelete/decline",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({user:user,book:book})
            }).then(response=>response.json())
                .then(responseJSON=>{
                    this.setState({tasks:this.state.tasks.map((currElem)=>{
                            if(currElem.book !== book) return currElem;
                        })});
                })
        };
        const handleAccept = (user,book) => {
            fetch("http://91.231.86.36/admin/bookdelete/accept",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({user:user,book:book})
            }).then(response=>response.json())
                .then(responseJSON=>{
                    this.setState({tasks:this.state.tasks.map((currElem)=>{
                            if(currElem.book !== book) return currElem;
                        })});
                })
        };
        return(
            <AdminContainer>
                <Grid container item xs={9} direction={"column"} justify={"center"} className={classes.Table}>
                    <Grid container justify={'center'} item xs>
                        <h2>Список заявок на удаление произведений</h2>
                    </Grid>
                    <Grid item xs>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{overflow:"hidden"}}>Название</TableCell>
                                    <TableCell>Ссылка на книгу</TableCell>
                                    <TableCell>Письмо</TableCell>
                                    <TableCell>Принять</TableCell>
                                    <TableCell>Отклонить</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.tasks.map((currElem,index,array)=>{
                                    if(currElem) {
                                        return (<TableUserRow
                                            task={currElem}
                                            handleAccept={handleAccept}
                                            handleDecline={handleDecline}
                                        />);
                                    }
                                })}
                                <TableRow>
                                    <TableCell>--------------</TableCell>
                                    <TableCell>--------------</TableCell>
                                    <TableCell>--------------</TableCell>
                                    <TableCell>--------------</TableCell>
                                    <TableCell>--------------</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </AdminContainer>
        );
    }
}

export default AdminDelBookPage;