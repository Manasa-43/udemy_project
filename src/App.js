import { useState } from "react";
import BillCalculator from "./BillCalculator";
import TextExp from "./TextExp";
import Home from './Components/Home'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./App.css";
import Sidebar from './Components/Sidebar'
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import AddBook from "./Pages/AddBook";
import BookDetail from "./Pages/BookDetail";
import DeleteBook from "./Pages/DeleteBook";


const theme = createTheme({
  // typography: {
  //     fontFamily: 'montserrat',
  //   },
  
  palette: {
    primary: {
      main: '#a8dadc',
      light: '#f1faee',
      dark: '#457b9d',
      contrastText: '#1d3557'
    },
    secondary: {
      main: '#1d3557',
      // light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      // contrastText: '#47008F',
    },
  },
});

export default function App() {


  return (

    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          {/* <BillCalculator/> */}
          {/* <TextExp/> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/Book/:id' element={<BookDetail />} />
            <Route path='/Add' element={<AddBook />} />
            <Route path='/Delete' element={<DeleteBook />} />
           
          </Routes>

        </div>
      </BrowserRouter>


    </ThemeProvider>

  );
}

