import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate, useLocation } from 'react-router-dom'

function OpenButton({ name, onClicking }) {
  return (
    <Button color='inherit' className='semiBold' onClick={() => onClicking(name)}>{name}</Button>
  )

}



export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleButton = (type) => {
    console.log(type)
    if(type !== 'Logout'){
      navigate(`/${type}`)
    }
    else{
      navigate('/')
      localStorage.clear()
    }

  }
  
  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            // color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className='extraBold'>
            Books Store
          </Typography>
          {location.pathname === '/' && (
            <>
              <OpenButton onClicking={handleButton} name='Login' />
              <OpenButton onClicking={handleButton} name='Register' />
            </>
          )}
          {location.pathname !== '/' && (
            <>
            <div>
            <OpenButton onClicking={handleButton} name='Logout' />
             <Box sx={{fontSize:'10px',textAlign:'center'}}>{localStorage.getItem('userId')}</Box> 
            </div>
              
            </>
          )}

        </Toolbar>
      </AppBar>
    </Box>


  );
}