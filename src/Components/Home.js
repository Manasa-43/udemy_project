import { useState } from "react";
import Box from '@mui/material/Box';
import Navbar from "./Navbar"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Book from "../Assets/books6.jpg"
import Typography from '@mui/material/Typography';


export default function Home() {


    return (

        <Box sx={{
            backgroundImage: ` url(${Book})`,
            backgroundSize: 'cover',
            height: "100vh",

            position: 'relative',


        }}>

            <Navbar />
            <Box sx={{
                position: 'absolute',
                top: '50%',
                width: '100%',
                textAlign: 'left',
                color: 'primary.contrastText',
                left: '15%',


            }} >
                <Typography variant="h4" component="div" sx={{ mx: '2rem', letterSpacing: '4px' }} className='extraBoldItalic'>
                    WELCOME TO BOOKS STORE
                </Typography>
                <Typography variant="h6" component="div" sx={{ mx: '2rem', color: 'secondary.main', letterSpacing: '1px' }} className='extraSemiBoldItalic'>
                    Your curated bookshelf. Always at your fingertips
                </Typography>



            </Box>

        </Box>


    );
}

