import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HeaderBarMenu from './components/HeaderBarMenu/HeaderBarMenu';
import Page404 from './routes/404Page/404Page';
import BottomBarMenu from './components/BottomBarMenu/BottomBarMenu';
import IndexPage from './routes/IndexPage/IndexPage';
import LoginPage from './routes/LoginPage/LoginPage';
import RegistrationPage from './routes/RegistrationPage/RegistrationPage';
import SupportPage from './routes/SupportPage/SupportPage';
import SearchPage from './routes/SearchPage/SearchPage';
import AccountPage from './routes/AccountPage/AccountPage';
import AboutPage from './routes/AboutPage/AboutPage';
import HelpPage from './routes/HelpPage/HelpPage';
import BooksPage from './routes/BooksPage/BooksPage';
import BookPage from './routes/BookPage/BookPage';
import AuthorPage from './routes/AuthorPage/AuthorPage';
import AuthorsPage from './routes/AuthorsPage/AuthorsPage';
import EditProfilePage from './routes/EditProfile/EditProfilePage';
import EditBookPage from './routes/EditBook/EditBookPage';
import EditorPage from './routes/EditorPage/EditorPage';
import FavoritesAuthorsPage from './routes/FavoritesAuthorsPage/FavoritesAuthorsPage';
import GradesBookPage from './routes/GradesBooksPage/GradesBookPage';
import MyBooksPage from './routes/MyBooksPage/MyBooksPage';
import BookStatisticPage from './routes/BookStatisticPage/BookStatisticPage';
import CreateBookPage from './routes/CreateBookPage/CreateBookPage';
import AdminPage from './routes/AdminPage/AdminPage';
import AdminDelUserPage from './routes/AdminDelUserPage/AdminDelUserPage';
import AdminDelBookPage from './routes/AdminDelBookPage/AdminDelBookPage';
import ReaderPage from './routes/ReaderPage/ReaderPage';
import classes from './App.css';

class InKey extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }
  };
  render(){
    return (<div className={classes.App}>
      <Route path={'/'} component={HeaderBarMenu}/>
      <Switch>
        <Route exact path={"/"} component={IndexPage}/>
        <Route exact path={"/login"} component={LoginPage}/>
        <Route exact path={"/registration"} component={RegistrationPage}/>
        <Route exact path={"/support"} component={SupportPage}/>
        <Route exact path={"/search"} component={SearchPage}/>
        <Route exact path={"/about"} component={AboutPage}/>
        <Route exact path={"/account"} component={AccountPage}/>
        <Route exact path={"/account/edit"} component={EditProfilePage}/>
        <Route exact path={"/help"} component={HelpPage}/>
        <Route exact path={"/books"} component={BooksPage}/>
        <Route exact path={"/book"} component={BookPage}/>
        <Route exact path={"/book/edit"} component={EditBookPage}/>
        <Route exact path={"/book/create"} component={CreateBookPage}/>
        <Route exact path={"/book/read"} component={ReaderPage}/>
        <Route exact path={"/book/text/edit"} component={EditorPage}/>
        <Route exact path={"/author"} component={AuthorPage}/>
        <Route exact path={"/authors"} component={AuthorsPage}/>
        <Route exact path={"/account/favorites"} component={FavoritesAuthorsPage}/>
        <Route exact path={"/account/grades"} component={GradesBookPage}/>
        <Route exact path={"/account/mybooks"} component={MyBooksPage}/>
        <Route exact path={"/account/statistics"} component={BookStatisticPage}/>
        <Route exact path={"/admin"} component={AdminPage}/>
        <Route exact path={"/admin/users/del"} component={AdminDelUserPage}/>
        <Route exact path={"/admin/books/del"} component={AdminDelBookPage}/>
        <Route path={"/help/reader"} component={SearchPage}/>
        <Route path={"/help/writer"} component={AboutPage}/>
        <Route path={"/search/:name?"} component={SearchPage}/>
        <Route component={Page404}/>
      </Switch>
      <BottomBarMenu/>
    </div>);
  }
}

const App = InKey;

export default App;