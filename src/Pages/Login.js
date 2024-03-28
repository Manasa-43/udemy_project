import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid";
import LoginImage from "../Assets/login2.jpg"
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import axios from "axios";
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom'


export default function Login() {


  const [alert, setAlert] = React.useState('')

  const [showPassword, setShowPassword] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [userName, setUserName] = React.useState('')
  let navigate = useNavigate()
  async function apiService2(apiInfo) {
    try {
      const { url, method, postData: data, headers } = apiInfo;
      let apiConfig = { url, method, headers };
      if (Object.keys(data).length) {
        apiConfig = { ...apiConfig, data };
      }

      // console.log("api", apiConfig);
      let response = await axios(apiConfig);
      if (response) {
        console.log('resssssssssss', response.status)
        return response;
      }
      return false;
    } catch (error) {
      return error;

    }
  }

  const handleUserName = (e) => {
    setUserName(e.target.value)
  }

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const handlePasswordChange = (e) => {

    setPassword(e.target.value);


  }


  const handleSubmit = async () => {
    navigate('/Dashboard')
    let obj = {
      userName: userName,
      password: password
    }
    if (userName && password) {

      try {
        const login = await axios.post('http://localhost:8080/Account/Authorized', obj, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        console.log(login)
        if (login?.status === 200) {
          // setOutput(login?.data)
          setAlert(login?.data?.result)
          localStorage.setItem('userId', login?.data?.userId)
          localStorage.setItem('token', login?.data?.token)
          localStorage.setItem('userName', userName)
          navigate('/Dashboard')
        }

      }
      catch (error) {
        // console.log(error)
        setAlert(error?.response?.data?.message)
      }
    }
    else{
      setAlert('Enter valid credentials!')
    }
  }

  function Password({ passLabel, onClickIcon, passType, passStat, onChangeField }) {
    return (
      <TextField
        // error
        type={passType ? 'text' : 'password'}
        color="secondary"
        label={passLabel}
        value={passStat}
        onChange={(e) => onChangeField(e)}

        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={onClickIcon}
                //   onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {passType ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    )
  }
  return (
    <>
      {/* <Button variant='outlined'>Back</Button> */}
      {alert && (
        <Box>
          <Alert severity="error">{alert}</Alert>
        </Box>
      )}

      <Grid container display='flex' justifyContent='center' alignItems='center'
        sx={{
          backgroundImage: ` url(${LoginImage})`,
          backgroundSize: 'cover',
          height: "100vh",
        }}>
        <Card sx={{ minWidth: 400, textAlign: 'center', maxHeight: 500, }}>
          <CardContent sx={{ backgroundColor: 'primary.light' }}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <Box className='semiBold' textAlign='center' my='1rem'> LOGIN</Box>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '35ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Box>
                    <TextField

                      color="secondary"
                      id="outlined-error-helper-text"
                      label="Username"
                      value={userName}
                      onChange={(e) => handleUserName(e)}

                    />
                  </Box>

                  <Box>
                    <TextField
                      // error
                      type={showPassword ? 'text' : 'password'}
                      color="secondary"
                      label='Password'
                      value={password}
                      onChange={(e) => handlePasswordChange(e)}

                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => handleClickShowPassword()}
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Box>

                </Box>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    color: 'primary.light',
                    backgroundColor: 'primary.dark',
                    my: '1rem',
                    
                  }}
                >Login</Button>
                <Button
                  onClick={()=>navigate('/')}
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    color: 'primary.light',
                    backgroundColor: '#e63946',
                    m: '1rem',
                    "&:hover": { background: "#F21010" },
                  }}
                >Cancel</Button>
                {/* <Typography  component="div" sx={{ color:'#e63946',fontSize:'12px'}}  >
                 Home
                </Typography> */}
              </Grid>
            </Grid>
          </CardContent>
        </Card>


      </Grid>

    </>



  );
}