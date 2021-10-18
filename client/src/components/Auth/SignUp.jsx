import React, { useRef, useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext.js';
import { Grid, Paper, Avatar, Typography, TextField, Button, Alert} from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';


const Signup = () => {
    const paperStyle = { padding: '30px 20px', width: 380, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    const btnstyle={margin:'10px 0'}

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [seeker, setSeeker] = useState(false);
    const history = useHistory();



     const SignUpHandler = (e) => {

      e.preventDefault();

      setError('');

      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError('passwords do not match!');
      }


      setLoading(true);


      signup(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        console.log(emailRef.current.value);
        // const data = {
        //   id: userObj.user.uid,
        //   email: emailRef.current.value,
        // };
        // console.log(data);
        // return axios.post('/seekers', data);
      })
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        setError("Failed to create an account");
      })
      .finally(() => {
        setLoading(false);
      });


    }

    useEffect(() => {
      let isSubscribed = true;
      return () => {
        isSubscribed = false;
      };
    }, []);



    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <h2 style={headerStyle}>Sign Up</h2>
                </Grid>
                {error && <Alert severity="error">{error}</Alert>}
                <form >

                    <TextField fullWidth label='Email' placeholder="Enter your email" inputRef={emailRef}/>

                    <TextField fullWidth label='Password' placeholder="Enter your password" inputRef={passwordRef}/>
                    <TextField fullWidth label='Confirm Password' placeholder="Confirm your password" inputRef={passwordConfirmRef}/>
                    <FormControl component="fieldset" style={marginTop}>
                        <RadioGroup style={{ display: 'initial' }}>
                            <FormControlLabel value="seeker" control={<Radio />} label="JobSeeker" />
                            <FormControlLabel value="employer" control={<Radio />} label="Employer" />
                        </RadioGroup>
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    />
                    <Button disabled={loading} type='submit' variant='contained' onClick={SignUpHandler} color='primary'style={btnstyle}
                    component={Link} to="/"
                    >Sign up</Button>
                </form>
                <Typography>Already have an account?<Link to="/signin" >Sign In</Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Signup;