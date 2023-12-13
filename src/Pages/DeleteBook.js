import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import BookStatic from "../Assets/dashBook1.png"
import { BrowserRouter, Router, Route, Routes, useNavigate } from 'react-router-dom'
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
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Paper from '@mui/material/Paper';
import stles from "../App.css"
import { CssBaseline } from "@mui/material";
import Alert from '@mui/material/Alert';
import EnhancedTable from "../Components/Table"
// #e3f7f4






export default function DeleteBook() {
    const navigate = useNavigate()
   

    
    
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
    

    
    

    return (
        <>
        
        <Navbar/>
        <EnhancedTable/>
        </>
       


    );
}

