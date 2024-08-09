import { Alert, Box, Container, Grid, TextField, Typography } from "@mui/material"
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import React, { useEffect } from "react"

import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Register = () =>{
  
  const [formError, setFormError] = React.useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isUserExist = localStorage.getItem("user")
    useEffect(() => {
       if(isUserExist) navigate("/app", {state: JSON.parse(isUserExist)})
    },[])

  const onSubmit =(data) =>{
    axios
    .post("http://localhost:5000/auth/register", data)
    .then((res) => {
      localStorage.setItem('token',res.data.token)
      const user = jwtDecode(res.data.token);

      localStorage.setItem('user', JSON.stringify(user))
      navigate("/")
    })
    .catch((err) => {
      setFormError(err.response.data)
    })
  }

    return(
        <Container maxWidth="md" sx={{display:"flex", alignItems:"center", height: "100vh"}}>
            <Grid container >
              <Grid item md={6}>
                <Paper square sx={{
                    bgcolor: '#242424',
                    color: "#fff",
                    height: "100%",
                    display: "flex",
                    alignItems: "center"
                }}>
                <Box sx={{p: 5, textAlign: "center"}}>
                  <Box sx ={{display: "flex", justifyContent: "center"}}>
                    <svg 
                    width="50" 
                    height="50" 
                    viewBox="-10.5 -9.45 21 18.9" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    >
                      <circle cx="0" cy="0" r="2" fill="currentColor">
                      </circle>
                        <g stroke="currentColor" strokeWidth="1" fill="none">
                            <ellipse rx="10" ry="4.5"></ellipse>
                            <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                            <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                        </g>
                    </svg>
                  </Box>
                  <Typography variant="h4" sx={{fontWeight: 600, mt: 3}}>
                      CHAT APP
                  </Typography>
                
                <Typography sx={{mt:1}}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                </Typography>
                </Box>
                </Paper>
                
              </Grid>
              <Grid item md={6}>
              <Paper square sx ={{
                height: "100%",
                display: "flex",
                flexDirection:"column"
              }}>
                <Box 
                  sx={{p: 5}} 
                  component="form" 
                  onSubmit={handleSubmit(onSubmit)}
                >
               {formError && (
                      <Alert sx={{mb:3}} severity="error">
                        {formError.errors[0].msg}
                      </Alert>
                  )}
                <Typography variant="h5"
                 sx={{fontWeight: "500",
                    mb: 2,
                    textTransform: "uppercase"
                 }}>
                    Register Here!
                    </Typography>
                <TextField 
                    fullWidth 
                    id="name" 
                    label="Name" 
                    variant="outlined" 
                    sx={{mb:3}}
                    {...register('name',{
                      required: "Required field"}
                    )}
                    error = {!!errors.name}
                    helperText={errors.name && errors.name.message}
                />
                <TextField 
                    fullWidth 
                    id="email" 
                    label="Email" 
                    variant="outlined" 
                    sx={{mb:3}}
                    {...register('email',{
                      required: {
                        value: true,
                        message: "This field is required",
                      }, 
                      pattern:{
                        value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Invalid email"
                      }
                    }
                    )}
                    error = {!!errors.email}
                    helperText={errors.email && errors.email.message}
                />
                <TextField 
                    fullWidth 
                    id="password" 
                    label="Password" 
                    variant="outlined" 
                    sx={{mb:3}}
                    {...register('password',{
                      required: "Required field"}
                    )}
                    error = {!!errors.password}
                    helperText={errors.password && errors.password.message}
                />
                
                <Button type="submit" fullWidth variant="contained" sx={{ py:2, bgcolor: '#242424', cursor: "pointer" }}>
                    Register
                </Button>
                </Box>
                <Box sx={{textAlign:"right",pr:1}}>
                    <Typography variant="body2" >
                        Already have a account ?<Button onClick={() =>navigate("/")}>Login</Button>
                    </Typography>
                </Box>
                </Paper>
              </Grid>
             
            </Grid>
        </Container>
    )
}

export default Register