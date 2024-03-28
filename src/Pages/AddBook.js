import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import BookStatic from "../Assets/dashBook1.png"
import { BrowserRouter, Router, Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from "../Components/Navbar";

import Grid from "@mui/material/Grid";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from "axios"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';

import Alert from '@mui/material/Alert';
// #e3f7f4






export default function AddBook() {
    const navigate = useNavigate()
    const [alert, setAlert] = useState('')
    const [form, setForm] = useState({
        isbn: '',
        title: '',
        subTitle: '',
        author: '',
        publishDate: '',
        publisher: '',
        pages: '',
        description: '',
        website: ''
    })
    const [formError, setFormError] = useState({
        isbnError: '',
        titleError: '',
        subTitleError: '',
        authorError: '',
        publishDateError: '',
        publisherError: '',
        pagesError: '',
        descriptionError: '',
        websiteError: ''
    })

    function handleForm(e) {
    
        let { name, value } = e.target

        if (name === 'pages') {
            setForm((prev) => ({ ...prev, [name]: Number(value) }))
        }
        
        
        else {
            setForm((prev) => ({ ...prev, [name]: value }))
        }


        // switch (name) {
        //     case 'isbn':
        //         console.log('isbn', value)
        //         break;
        //     case 'title':
        //         console.log('title', value)
        //         break
        //     default:
        //         break;
        // }
    }
    const onAddBook = async () => {
        const isValidPages = /^\d+$/.test(form.pages);
        const isValidIsbn = /^\d+$/.test(form.isbn);

        // let obj = { ...form, publishDate: '04-12-2023' }

        if (form.isbn.length !== 12 ) {
            setFormError((prev) => ({ ...prev, isbnError: true }))
        }
        else {
            console.log('is it coming in else')
            setFormError((prev) => ({ ...prev, isbnError: false }))
        }

        if (form.subTitle === '') {
            setFormError((prev) => ({ ...prev, subTitleError: true }))
        }
        else {
            setFormError((prev) => ({ ...prev, subTitleError: false }))
        }

        if (form.author === '') {
            setFormError((prev) => ({ ...prev, authorError: true}))
        }
        else {
            setFormError((prev) => ({ ...prev, authorError: false }))
        }

        if (form.publisher === '') {
            setFormError((prev) => ({ ...prev, publisherError: true }))
        }
        else {
            setFormError((prev) => ({ ...prev, publisherError: false }))
        }

        if (form.description === '') {
            setFormError((prev) => ({ ...prev, descriptionError: true }))
        }
        else {
            setFormError((prev) => ({ ...prev, descriptionError: false }))
        }

        if (form.title === '') {
            setFormError((prev) => ({ ...prev, titleError: true }))
        }
        else {
            setFormError((prev) => ({ ...prev, titleError: false }))
        }

        if (form.pages.length <= 0 || Number(form.pages) === 0 || isValidPages) {
            setFormError((prev) => ({ ...prev, pagesError: true }))
        }
        else {
            setFormError((prev) => ({ ...prev, pagesError: false }))
        }

        if (form.publishDate === '') {
            setFormError((prev) => ({ ...prev, publishDateError: true }))
        }
        else {
            setFormError((prev) => ({ ...prev, publishDateError: false }))
        }

        if (form.website === '') {
            setFormError((prev) => ({ ...prev, websiteError: true }))
        }
        else {
            setFormError((prev) => ({ ...prev, websiteError: false }))
        }
        console.log(formError)
        console.log(formError.isbnError )
        console.log(true && true)
        if (
            formError.isbnError === false &&
            formError.titleError === false &&
            formError.authorError === false &&
            formError.subTitleError === false &&
            formError.publisherError === false &&
            formError.publishDateError === false &&
            formError.pagesError === false &&
            formError.descriptionError === false &&
            formError.websiteError === false
        ) 
        {
            console.log(' coming if')
            try{
                console.log('why')
                
                let dt =new Date(form.publishDate)
            let modDate = `${dt.getDate()}-${dt.getMonth() +1}-${dt.getFullYear()}`
                let obj = {...form,publishDate:modDate}
                let auth = localStorage.getItem('token')
                let user = localStorage.getItem('userName')
                let pass = 'Manas1234'
                // let user = localStorage.getItem('userName')
                let addBookOp = await axios.post('http://localhost:8080/BookStore/Books',obj,{
                    headers: {
                        "Content-Type":'application/json',
                        // 'Authorization': auth,
                        'Authorization': `Basic ${btoa('admin:admin')}`
                    }
                }


                )
                console.log(addBookOp)
                setAlert('Book added succesfully')
                navigate('/Dashboard')
                setAlert('')
            }
            catch(error){
                console.log(error)
                setAlert(error.message)
            }
        }
        else{
            console.log('not coming')
        }
    }
    console.log(form)
    function CustomTextfield({ label, onFieldChange, name }) {
        return (
            <ListItem >
                <TextField
                    variant='standard'
                    id="standard-basic"
                    label={label}
                    name={name}
                    color='secondary'
                    sx={{ width: '70%', }}
                    value={form[name]}
                    onChange={(e) => { onFieldChange(e) }}
                />
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
    let id = localStorage.getItem('userId')

    const [bookList, setBookList] = useState(books)
    // useEffect(() =>
    //     async () => {
    //         try {
    //             const bookOutput = await axios.get('http://localhost:8080/BookStore/Books')
    //             console.log(bookOutput)
    //             // setBookList(bookOutput.data)
    //         }
    //         catch (error) {
    //             console.log(error)
    //         }

    //     }


    //     , [])

    return (
        // {/* <ThemeProvider theme={theme}> */}

        <>
            <Navbar />
            {alert && (
        <Box>
          <Alert severity="error">{alert}</Alert>
        </Box>
      )}

            <Grid container display='block' sx={{
                // backgroundColor: '#effaf8', height: '100vh',
                // margin: 0,
                // padding: 0, overflowY: 'hidden'
            }}>
                <Box

                >
                    <Typography sx={{ color: 'primary.contrastText', textAlign: 'center', py: '1rem' }}>Required fields</Typography>
                    <Paper
                        sx={{
                            mx: '2rem',
                            backgroundColor: '#e5f9f5',
                            border: 2,
                            borderRadius: '5px',
                            borderColor: 'primary.contrastText',

                        }}>
                        <Grid container display='flex' sx={{
                            mx: 'auto',
                            height: 400,
                            overflow: 'scroll'
                        }}>
                            <Grid container display='flex' justifyContent='center' >
                                <Grid item md={6}>
                                    <List  >
                                        <ListItem >
                                           
                                            <TextField
                                                variant='standard'
                                                id="standard-basic"
                                                label='ISBN'
                                                color='secondary'
                                                sx={{ width: '70%', }}
                                                name='isbn'
                                                value={form.isbn}
                                                onChange={(e) => { handleForm(e) }}
                            
                                                error = {formError.isbnError}
                                                helperText={formError.isbnError ? ('ISBN should be 12 digits') : ('')}
                                                size="small"

                                            />
                                        </ListItem>
                                        <ListItem>
                                            <TextField
                                                variant='standard'
                                                id="standard-basic"
                                                label='Title'
                                                color='secondary'
                                                sx={{ width: '70%' }}
                                                name='title'
                                                value={form.title}
                                                onChange={(e) => { handleForm(e) }}
                                                error={formError.titleError }
                                                helperText={formError.titleError ? ("Title can't be empty") : ('')}
                                                size="small"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <TextField
                                                variant='standard'
                                                id="standard-basic"
                                                label='Author'
                                                color='secondary'
                                                sx={{ width: '70%' }}
                                                name='author'
                                                value={form.author}
                                                onChange={(e) => { handleForm(e) }}
                                                error={formError.authorError}
                                                helperText={formError.authorError ? ("Author can't be empty") : ('')}
                                                size="small"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <TextField
                                                variant='standard'
                                                id="standard-basic"
                                                label='Publisher'
                                                color='secondary'
                                                sx={{ width: '70%' }}
                                                name='publisher'
                                                value={form.publisher}
                                                onChange={(e) => { handleForm(e) }}
                                                error={formError.publisherError}
                                                helperText={formError.publisherError ? ("Publisher can't be empty") : ('')}
                                                size="small"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <TextField
                                                variant='standard'
                                                id="standard-basic"
                                                label='Pages'
                                                color='secondary'
                                                sx={{ width: '70%' }}
                                                name='pages'
                                                value={form.pages}
                                                onChange={(e) => { handleForm(e) }}
                                                error={formError.pagesError}
                                                helperText={formError.pagesError ? ("Pages can't be empty") : ('')}
                                                size="small"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <TextField
                                                variant='standard'
                                                type='date'
                                                id="standard-basic"
                                                label='Published Date'
                                                color='secondary'
                                                sx={{ width: '70%' }}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                name='publishDate'
                                                value={form.publishDate}
                                                onChange={(e) => { handleForm(e) }}
                                                error={formError.publishDateError}
                                                helperText={formError.publishDateError ? ("Published date can't be empty") : ('')}
                                                size="small"
                                                
                                            />
                                        </ListItem>
                                        {/* <CustomTextfield label='ISBN' onFieldChange={handleForm} name='isbn'/>
                                    <CustomTextfield label='Title' onFieldChange={handleForm}name='title' />
                                    <CustomTextfield label='Author' onFieldChange={handleForm} name='author'/>
                                    <CustomTextfield label='Publisher' onFieldChange={handleForm}name='publisher' />
                                    <CustomTextfield label='Pages' onFieldChange={handleForm} name='pages'/>
                                    <CustomTextfield label='Publish date' onFieldChange={handleForm} name='publishDate'/> */}

                                    </List>
                                </Grid>
                                <Grid item md={6}>
                                    <List>
                                        <ListItem  >
                                            <TextField
                                                variant='outlined'
                                                id="standard-basic"
                                                label='Subtitle'
                                                color='secondary'
                                                multiline
                                                rows={3}
                                                fullWidth
                                                name='subTitle'
                                                value={form.subTitle}
                                                onChange={(e) => { handleForm(e) }}
                                                error={formError.subTitleError}
                                              
                                                helperText={formError.subTitleError ? ("Subtitle can't be empty") : ('')}
                                            // sx={{mb:'2.5rem'}}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <TextField
                                                variant='outlined'
                                                id="standard-basic"
                                                label='Description'
                                                color='secondary'
                                                multiline
                                                rows={3}
                                                fullWidth
                                                name='description'
                                                value={form.description}
                                                onChange={(e) => { handleForm(e) }}
                                                error={formError.descriptionError}
                                                helperText={formError.descriptionError ? ("Description can't be empty") : ('')}
                                            // sx={{mt:'2.5rem'}}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <TextField
                                                variant='outlined'
                                                id="standard-basic"
                                                label='Website'
                                                type="url" 
                                                color='secondary'
                                                multiline
                                                rows={3}
                                                fullWidth
                                                name='website'
                                                value={form.website}
                                                onChange={(e) => { handleForm(e) }}
                                                error={formError.websiteError}
                                                helperText={formError.websiteError ? ("Website can't be empty") : ('')}
                                            // sx={{mt:'2.5rem'}}
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>


                            </Grid>
                        </Grid>
                    </Paper>

                </Box>
                <Box sx={{ textAlign: 'end', }}>
                    <Button
                        onClick={() => onAddBook()}
                        variant="contained"
                        sx={{
                            textTransform: 'none',
                            color: 'primary.light',
                            backgroundColor: 'primary.dark',
                            mx: '2rem',
                            width: '2rem',
                            my: '1rem',

                        }}
                    >Add </Button>
                </Box>

            </Grid>

        </>
        // </ThemeProvider>


    );
}

