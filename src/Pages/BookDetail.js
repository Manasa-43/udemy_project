import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import BookStatic from "../Assets/dashBook1.png"
import { BrowserRouter, Router, Route, Routes, useNavigate ,useParams} from 'react-router-dom'
import Navbar from "../Components/Navbar";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid";
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from "axios"
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// #e3f7f4



export default function BookDetail() {

    const navigate = useNavigate()
    let {id} = useParams()

    function handleAdd() {

        navigate('/Add')
    }

    function CrudButton({ type, onAdd }) {
        return (
            <Button
                onClick={onAdd}
                variant="contained"
                sx={{
                    textTransform: 'none',
                    color: 'primary.light',
                    backgroundColor: 'primary.dark',
                    m: '1rem',
                    width: '2rem'
                }}
            >{type}</Button>
        )
    }
    function Item({ heading, value }) {
        return (
            <ListItem>
                {/* <Grid container display='flex'
                justifyContent="space-evenly"
                alignItems="center"


            >
                <Grid item md={4} sm={4} >
                    
                    <Typography
                        variant="h6"
                        className='extraBold'
                        sx={{
                            color: '#e63946',
                            my: '1.5rem',
                            textAlign: 'center'
                        }}>
                       Title :
                    </Typography>
                </Grid>
                <Grid item md={8} sm={8} >
                    <Box>Understanding ECMAScript 6</Box>
                </Grid>

            </Grid> */}
                <Grid container display='flex' alignItems='top' justifyContent='flex-start' sx={{ color: 'primary.contrastText' }}>
                    <Grid item md={4} sm={6} xs={12} className="semiBold" >{heading}  </Grid>
                    <Grid item md={8} sm={6} xs={12} className='poppinsMedium'>{value}</Grid>
                </Grid>
            </ListItem>
        )
    }

    let books = [
        {
            userId: "T1FW7",
            isbn: "9781491950296",
            title: "Programming JavaScript Applications",
            subTitle: "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
            author: "Eric Elliott",
            publishDate: "2014-07-01T00:00:00",
            publisher: "O'Reilly Media",
            pages: 254,
            description: "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in  this practical book, experienced JavaScript developers will learn how to write flex",
            website: "http://chimera.labs.oreilly.com/books/1234000000262/index.html"
        },
        {
            userId: "T1FW7",
            isbn: "9781593277574",
            title: "Understanding ECMAScript 6",
            subTitle: "The Definitive Guide for JavaScript Developers",
            author: "Nicholas C. Zakas",
            publishDate: "2016-09-03T00:00:00",
            publisher: "No Starch Press",
            pages: 352,
            description: "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E",
            website: "https://leanpub.com/understandinges6/read"
        }
    ]
    let name = localStorage.getItem('userName')
    // let id = localStorage.getItem('userId')

    const [bookList, setBookList] = useState([])
    useEffect(() =>
        async () => {
            try {
                const bookOutput = await axios.get(`http://localhost:8080/BookStore/Books/${id}`)
                console.log(bookOutput)
                setBookList(bookOutput.data)
            }
            catch (error) {
                console.log(error)
            }

        }


        , [])
    return (

        // <Box>Book detail</Box>
        <>
            <Navbar />
            {bookList.length !==0 && (
                <Grid container display='flex' justifyContent='center' alignItems='center' >
                <Card sx={{ minWidth: 500,maxWidth:1200, mt:'2rem',mx:'1rem',mb:'1rem', backgroundColor: '#effaf8' }}>
                    <CardContent>
                        <Item heading='ISBN' value={bookList.isbn} />
                        <Item heading='Title' value={bookList.title} />
                        <Item heading='Sub Title' value={bookList.subTitle} />
                        <Item heading='Author' value={bookList.author} />
                        <Item heading='Publish Date' value={bookList.publishDate} />
                        <Item heading='Publisher' value={bookList.publisher}/>
                        <Item heading='Pages'value={bookList.pages} />
                        <Item heading='Description' value={bookList.description} />
                        <ListItem>
                
                <Grid container display='flex' alignItems='top' justifyContent='flex-start' sx={{ color: 'primary.contrastText' }}>
                    <Grid item md={4} sm={6} xs={12} className="semiBold" >Website  </Grid>
                    <Grid item md={8} sm={6} xs={12} className='poppinsMedium'>
                        <a href={bookList.website} target="_blank" >
                        {bookList.website}
                        </a>
                    </Grid>
                </Grid>
            </ListItem>
                    </CardContent>
                </Card>
            </Grid>
            )}
            
        </>

    );
}

