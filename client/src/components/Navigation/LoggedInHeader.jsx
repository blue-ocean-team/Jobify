import React, { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import './Home.css';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EmployerDropdown from './EmployerDropdown.jsx'
import NativeSelect from "@mui/material/NativeSelect"
import { GlobalContext } from "../App.jsx"
import { useAuth } from '../Auth/AuthContext.js';


export default function LoggedInHeader(props) {

  const [dropDown, setDropDown] = useState('')
  const [isEmployer, setIsEmployer] = useState(false)
  const { state } = useContext(GlobalContext);
  const { logout } = useAuth();
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setDropDown(event.target.value);
  };

  const navigationStyle = {
    color: "white",
  };

  const logoutHandler = (e) => {
    // e.preventDefault();
    logout()
    .then(() => {
      history.push("/");
    })
    .catch((error) => {
      setError('Failed to log out');
    })
  }

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: "rgba(121, 148, 150, 0.7)"
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{
              flexGrow: 1,
              display: "flex",
            }}
          >
            Jobi<sup>fy</sup>
          </Typography>
          <nav>
            <div>
            <Link to="/">Home</Link>
            <Link to="/dashboard" style={{padding: "15px"}}>{state.email}</Link>
            {state.role !== false ? <span className="secondary">Employer</span> : <span className="secondary">Job Seeker</span>}
            </div>
          </nav>
          <FormControl sx={{ my: 1, mx: 1.5, midWidth: 80 }}>
            <InputLabel style={navigationStyle}>Navigate</InputLabel>
            <Select
              onChange={handleChange}
              label="Navigation"
              style={{minWidth: "100px", maxHeight: "55px", color: "white"}}
              key={"anything"}
            >
            {state.role !== false ? <EmployerDropdown sx={{maxWidth: "150px"}}/> :
            <div>
            <Link style={{color: '#49475B', textDecoration: 'none'}} to="/dashboard"> <MenuItem value={20}>Dashboard</MenuItem></Link>
            <Link style={{color: '#49475B', textDecoration: 'none'}} to="/documents"> <MenuItem value={30}>Documents</MenuItem></Link>
            <Link style={{color: '#49475B', textDecoration: 'none'}} to="/notes"> <MenuItem value={40}>Notes</MenuItem></Link>
            <Link style={{color: '#49475B', textDecoration: 'none'}} to="/blogs"> <MenuItem value={40}>Blogs</MenuItem></Link>
            <Link style={{color: '#49475B', textDecoration: 'none'}} to="/chat"> <MenuItem value={40}>Chat</MenuItem></Link>
            <Link style={{color: '#49475B', textDecoration: 'none'}} to="/community"> <MenuItem value={50}>Community</MenuItem></Link>
            <Link style={{color: '#49475B', textDecoration: 'none'}} to="/"> <MenuItem value={50} onClick={logoutHandler}>Log Out</MenuItem></Link>
            </div>
            }
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    </>
  );
}