import React, { useState } from "react";
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



export default function EmployerDropdown() {
  return (
    <div>
      <Link to="/dashboard"> <MenuItem value={20}>Dashboard</MenuItem></Link>
      <Link to="/new-post"> <MenuItem value={30}>Add Job</MenuItem></Link>
      <Link to="/documents"> <MenuItem value={40}>Documents</MenuItem></Link>
      <Link to="/notes"> <MenuItem value={40}>Notes</MenuItem></Link>
      <Link to="/blogs"> <MenuItem value={50}>Blogs</MenuItem></Link>
      <Link to="/community"> <MenuItem value={50}>Community</MenuItem></Link>
      <Link to="/logout"> <MenuItem value={50}>Log Out</MenuItem></Link>
    </div>
  )
}