import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import BookStatic from "../Assets/dashBook1.png"
import { BrowserRouter, Router, Route, Routes ,useNavigate} from 'react-router-dom'
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
// #e3f7f4


   
export default function Dashboard() {
    const navigate = useNavigate()
    function handleAdd (){
    
        navigate('/Add')
    }

function CrudButton ({type,onAdd}) {
    return(
        <Button
        onClick={onAdd}
        variant="contained"
        sx={{
            textTransform: 'none',
            color: 'primary.light',
            backgroundColor: 'primary.dark',
            m: '1rem',
            width:'2rem'
        }}
    >{type}</Button>
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
    let id = localStorage.getItem('userId')

    const [bookList, setBookList] = useState(books)
    useEffect(() =>
        async () => {
            try {
                const bookOutput = await axios.get('http://localhost:8080/BookStore/Books')
                console.log(bookOutput)
                setBookList(bookOutput.data)
            }
            catch (error) {
                console.log(error)
            }

        }


        , [])
    return (

        <Box sx={{ height: '100vh' }}>
            <Navbar />
            <Typography
                variant="h6"
                className='poppinsMedium'
                sx={{
                    color: 'primary.contrastText',
                    my: '1.5rem',
                    textAlign: 'center'
                }}>
                Welcome {name} !!
            </Typography>
            <Box my='1rem' mx='2rem' >
                {bookList.length === 0
                    ? (
                        <Typography
                            variant="h6"
                            className='extraBold'
                            sx={{
                                color: '#e63946',
                                my: '1.5rem',
                                textAlign: 'center'
                            }}>
                            No books found !!
                        </Typography>
                    )
                    : (
                        <Box>
                            <Grid container display='flex' spacing={2}>

                                {bookList.map((book, index) => (
                                    <Grid item md={4} sm={4} xs={12} key={book.isbn}>
                                        <Card sx={{ maxWidth: 300, backgroundColor: '#effaf8',cursor:'pointer',minHeight:200}}
                                        onClick= {()=>{navigate(`/Book/${book.isbn}`)}}
                                        >
                                            <CardContent>
                                                <Grid container display='flex' alignItems='center' justifyContent='space-between'>
                                                    <Grid item md={4} sm={12}spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                                        <CardMedia sx={{ height: 100, width: 80, margin: 'auto' }}
                                                            image={BookStatic}
                                                        />

                                                    </Grid>
                                                    <Grid item md={8} sm={12}>
                                                        <List className='poppinsMed' sx={{ fontSize: '0.75rem', color: 'primary.contrastText' }}>
                                                            <ListItem>
                                                                <Grid container alignItems='top' justifyContent='space-evenly'>
                                                                    <Grid item md={4} sm={6} xs={12} className="semiBold">Title : </Grid>
                                                                    <Grid item md={8} sm={6} xs={12}>{book.title}</Grid>
                                                                </Grid>
                                                            </ListItem>
                                                            <ListItem>
                                                                <Grid container alignItems='top' justifyContent='space-evenly'>
                                                                    <Grid item md={4} sm={6} xs={12} className="semiBold">Author : </Grid>
                                                                    <Grid item md={8} sm={6} xs={12}>{book.author} </Grid>
                                                                </Grid>
                                                            </ListItem>

                                                        </List>
                                                    </Grid>
                                                </Grid>


                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}

                            </Grid >
                            <Grid container justifyContent='end' >
                            <CrudButton type = 'Add' onAdd={handleAdd} navigate={navigate}/>
                           <CrudButton type = 'Delete'/> 
                            </Grid>
                           
                        </Box>

                    )}


            </Box>
        </Box>

    );
}

