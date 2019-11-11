import React from 'react';
import {Icon,Divider,List,ListItem,ListItemText,Grid,Box,Container,Typography} from "@material-ui/core";
import classes from './BottomAboutMenu.css';
import FaceIcon from '@material-ui/icons/Face';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import CloseIcon from '@material-ui/icons/Close';
class BottomAboutMenu extends React.Component{
    render(){
        return(
            <Grid container
                  justify={"center"}
                  alignItems={"center"}
                  style={{backgroundColor:"snow",marginTop:10,marginBottom:10}}
                  className={classes.Table}
            >
                <Grid item xs={10}
                style={{
                    fontSize:14,
                    backgroundColor: "snow",
                }}>
                    <i><p><b>В</b>ам интересны фанфики? Юмор? Различные жанры произведений? - Вы можете читать на <b style={{color:"skyblue"}}>Sovenok</b> онлайн, а можете и бесплатно скачать книги.
                        Кроме того у наших читателей есть возможность купить электронные книги.
                        Наша бесплатная библиотека электронных книг непрерывно пополняется новыми произведениями от популярных авторов и молодых талантов.
                        Подростковая проза соседствует с любовными романами, а вместе с книгами о попаданцах вы увидите фантастику, современную прозу и боевик.</p>
                        <p>Есть уникальная возможность для молодых авторов или уже популярных писателей – когда ваш аккаунт достигнет коммерческого статуса,
                            вы сможете публиковать книги онлайн.</p>
                    <p>Хотите найти самые популярные книги? - вам поможет удобная система рейтингов и поиск книг. Хотите читать короткие любовные романы?
                        ! В библиотеке электронных книг<b style={{color:"skyblue"}}> Sovenok</b> вы найдете множество романов про миллионеров, а также другие направления любовных романов,
                        к тому же вы сможете читать бесплатно книги онлайн без регистрации. Выбор книг онлайн еще никогда не был так прост.
                        Исторические романы, женские книги, книги для девочек и книги для подростков также очень легко найти на <b style={{color:"skyblue"}}>Sovenok</b>.</p></i>
                </Grid>
            </Grid>
        );
    }
}

export default BottomAboutMenu;
