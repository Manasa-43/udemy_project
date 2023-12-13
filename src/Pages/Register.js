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
import RegisterImage from "../Assets/register2.jpg"
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
import {useNavigate} from 'react-router-dom'

export default function Register() {
    let navigate = useNavigate()
    const [passError, setPassError] = React.useState('')
    const [alert, setAlert] = React.useState('')

    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const [userName, setUserName] = React.useState('')



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
            return false;
        }
    }

    const handleUserName = (e) => {
        setUserName(e.target.value)
    }

    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev)
    }
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev)

    }
    const handlePasswordChange = (e) => {

        setPassword(e.target.value);


    }
    const handleConfirmPasswordChange = (e) => {

        setConfirmPassword(e.target.value)
        if (password !== e.target.value) {
            setPassError('Passwords not matching')
        }
        else {
            setPassError('')
        }
    }

    const handleSubmit = async () => {
        // debugger
        if (!passError && userName) {
            console.log('it is entering')
            let obj = {
                userName: userName,
                password: password,
                confirmPassword: password
            }
            console.log(obj)
            let apiInfo = {

                url: 'http://localhost:8080/Account/User ',
                method: "POST",
                postData: obj,
                headers: {
                    "Content-Type": "application/json",
                },
            };

            //   try{
            //     let login = await apiService2(apiInfo);

            //     if(login?.data?.userId){
            //       console.log('yes')
            //       setAlert('success')
            //     }
            //     else{
            //       setAlert('fail')
            //     }
            //     console.log(login?.data)

            //   }
            //   catch(error){
            //     console.log(error.response.data)
            //   }
            try {  // with destructuring  
                 const res = await axios.post('http://localhost:8080/Account/User',obj,{
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });
                // const res = await fetch('http://localhost:8080/Account/User', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(obj),
                // });
                
                // if(res.ok){
                //     console.log(res)
                // }
                // else{
                //     console.log(res)
                //     const data = await res.json();
                //     console.log(data)
                //     console.log(data.message)
                //     // const errorData = await response.json();
                // }
               
                console.log(res,'INSIDE TRY')
                if (res?.status === 201) {
                    // setAlert('Registration successful')
                    setAlert(res)
                    navigate('/Home')
                }

                return res.data;

            } catch (err) {
                // console.log(`Error: ${err?.response?.data}`);

                // if(err?.response?.data?.status === 400){
                // setAlert(err?.response?.data?.message)
                //    console.log(JSON.stringify(err?.response?.data))
                //    console.log(JSON.stringify(err?.response))
                //    console.log(JSON.stringify(err))
                console.log((err,'INSIDE CATCH'))
                console.log(err?.response?.data?.message)
                //    setAlert(err?.response?.data?.message)
                setAlert(err)
                // }
            }


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
            {/* <Box>
                        <Alert severity="error">{alert}</Alert>
                    </Box> */}
            {alert?.status === 201 &&
                (
                    <Box>
                        <Alert severity="success">Registered succesfully</Alert>
                    </Box>
                )}
            {alert?.response?.status === 400 &&
                (
                    <Box>
                        <Alert severity="error" >{alert?.response?.data?.message}!</Alert>
                    </Box>
                )}

            <Grid container display='flex' justifyContent='center' alignItems='center'
                sx={{
                    backgroundImage: ` url(${RegisterImage})`,
                    backgroundSize: 'cover',
                    height: "100vh",
                }}>
                <Card sx={{ minWidth: 400, textAlign: 'center', maxHeight: 500, }}>
                    <CardContent sx={{ backgroundColor: 'primary.light' }}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12}>
                                <Box className='semiBold' textAlign='center' my='1rem'> REGISTER</Box>
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
                                    {/* <Box>
                                    <Password
                                        passLabel='Password'
                                        onClickIcon={handleClickShowPassword}
                                        passType={showPassword}
                                        onChangeField={handlePasswordChange}
                                        passStat={password}
                                    />
                                    
                                </Box>
                                <Box>
                                    <Password
                                        passLabel='Confirm password'
                                        onClickIcon={handleClickShowConfirmPassword}
                                        passType={showConfirmPassword}
                                        onChangeField={handleConfirmPasswordChange}
                                        passStat={confirmPassword}
                                    />
                                </Box> */}
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
                                    <Box>
                                        <TextField

                                            type={showConfirmPassword ? 'text' : 'password'}
                                            color="secondary"
                                            label='Confirm password'
                                            value={confirmPassword}
                                            onChange={(e) => handleConfirmPasswordChange(e)}
                                            helperText={passError}
                                            error={passError}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => handleClickShowConfirmPassword()}
                                                            edge="end"
                                                        >
                                                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <Button
                                    // className='poppinsMedium'

                                    onClick={handleSubmit}
                                    variant="contained"
                                    sx={{
                                        textTransform: 'none',
                                        color: 'primary.light',
                                        backgroundColor: 'primary.dark',
                                        my: '1rem'
                                    }}
                                >Submit</Button>
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
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>


            </Grid>

        </>



    );
}