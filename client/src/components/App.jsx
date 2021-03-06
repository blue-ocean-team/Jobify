import './App.css';
import React, { useReducer, useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { CssBaseline, Typography, GlobalStyles, Container, Box}from "@mui/material/";
import { ThemeProvider } from "@mui/material/styles";
import { Helmet } from 'react-helmet';
import Footer from "./Navigation/Footer.jsx"
import Header from "./Navigation/Header.jsx"
import Home from "./Navigation/Home.jsx"
import Test from "./Navigation/Test.jsx"
import Notes from "./notes/Notes.jsx"
import Dashboard from "./dash/Dashboard.jsx"
import Theme from "../Theme/ThemeFile.js"
import AddJob from "./AddJob/AddJob.jsx";
import { AuthProvider } from './Auth/AuthContext.js';
import SignUp from "./Auth/SignUp.jsx";
import SignIn from "./Auth/SignIn.jsx";
import Blogs from "./blog/Blogs.jsx";
import Community from "./community/Community.jsx";
import Email from './Email.jsx';
import Chat from './Chat.jsx';
import Documents from "./documents/documents.jsx";
import LoggedInHeader from "./Navigation/LoggedInHeader.jsx"

//Import component here

const initialState = {
  userId: '',
  role: false,
  email:'',
  company:''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateUserId':
      return { ...state, userId: action.data };
    case 'updateRole':
      return { ...state, role: action.data};
    case 'updateEmail':
      return { ...state, email: action.data};
    default:
      return state;
  }
};

export const GlobalContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyles
          styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <CssBaseline />
          <div className="App">
          <Helmet>
            <title>Jobify</title>
            <meta name="description" content="App Description" />
            <meta name="theme-color" content="#799496" />
          </Helmet>
          <GlobalContext.Provider value={{ state, dispatch }}>
          <AuthProvider>
          {state.userId !== "" ? <LoggedInHeader/> :
          <Header />
           }
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/test" component={Test} />
              <Route path="/new-post" component={AddJob} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/blogs" component={Blogs} />
              <Route path="/community" component={Community} />
              <Route path="/dashboard/:id?" component={Dashboard} />
              <Route path="/notes" component={() => <Notes lol='lol'/>} />
              <Route path='/email' component={Email} />
              <Route path='/chat' component={Chat} />
              <Route path="/documents" component={Documents} />
              {/* Add route here */}
            </Switch>
          </AuthProvider>
          </GlobalContext.Provider>
          </div>
            <Footer sx={{ mt: 5 }} />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;