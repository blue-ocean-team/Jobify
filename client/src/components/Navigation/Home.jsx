import React, { useState, useContext, useEffect } from "react"
import { Typography, Button, Box, Grid, TextField, Container, Input, InputLabel, IconButton, Stack } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { Link, Redirect } from "react-router-dom";
import Search from '../Search.jsx';
import useFetch from '../dash/postings/hooks/useFetch.jsx';
import './Home.css';
import { GlobalContext } from "../App.jsx"
import axios from 'axios';

function Home() {
  const [ searchRoute, setSearchRoute ] = useState("all");
  const { state } = useContext(GlobalContext);
  const globalData = useContext(GlobalContext);
  const jobs = useFetch(`http://localhost:3000/postings/${searchRoute}`);

  const getRole = () => {
    axios.get(`http://localhost:3000/signup_login/${state.userId}`)
      .then((results) => {
        console.log(results)
        globalData.dispatch({ type: 'updateRole', data: results.data.rows[0].role})
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getRole()
  }, [])

  return (
    searchRoute === 'all'
    ? <div>
      <Container justify="center">
        <Typography
          variant="h2"
          align="center"
          sx={{color: "#49475B", marginTop: "100px", marginBottom: "50px", fontWeight: "700"}}
        >
          Jobi<sup>fy</sup>
        </Typography>
        <Search setRoute={setSearchRoute} />
        {
          state.userId
          ? null
          : <Stack sx={{width:"30%", margin:"50px auto"}}>
            <Button
            href="/signin"
            variant="contained"
            size="large"
            startIcon={<LoginIcon />}
            >
              Create An Account
            </Button>
            {
              state.role == "employer"
              ? <Typography
                variant="text"
                color="text.primary"
                align="center"
                sx={{marginTop: "25px", marginBottom: "25px", fontWeight: "700"}}
              >
                <Link className="Homelinks" to="/new-post">
                  Employers: Post a job
                </Link>
                – Your next hire is here
              </Typography>
              : null
            }
          </Stack>
        }
      </Container>
    </div>
    : <Redirect
      to={{
        pathname: "/dashboard",
        state: searchRoute
      }}
    />
  );
}

export default Home