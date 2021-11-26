import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import 'react-responsive-modal/styles.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

// const qs = require('query-string');
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));


const Navbar = ({ loggedIn, setLoggedIn }) => {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);



  const onOpenLoginModal = () => {
    setOpenLogin(true);
  }
  const onCloseLoginModal = () => {
    setOpenLogin(false)
  };
  const onOpenSignupModal = () => {
    setOpenSignup(true)
  }
  const onCloseSignupModal = () => {
    setOpenSignup(false)
  };



  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')



  const loginData = {
    "email": email,
    "password": password,
  }

  const signupData = {
    "email": email,
    "password": password,
  }



  const handleSubmitSignup = async (event) => {
    event.preventDefault();
    if (password === passwordConfirmation) {
      console.log('signing up')
      try {
        const res = await axios.post('http://localhost:3001/users ', signupData);
        const { token, user } = res.data;
        console.log('res', res.data);
        setLoggedIn(true);
        onCloseSignupModal()
        if (token) {
          setLoggedIn(true);
          onCloseSignupModal()
          localStorage.setItem('token', token);
          console.log('jwt: ', token)
        }
      }
      catch (error) {
        console.log('oh, no', error);
      }
    }
    else {
      console.log('Passwords should match')
    }
  }

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    console.log('logging')
    try {
      const res = await axios.post('http://localhost:3001/users/sign_in',  loginData );
      const  token = res.data;
      console.log('token', token);
      
      
      if (token) {
        setLoggedIn(true);
        onCloseLoginModal()
        localStorage.setItem('token', token);
        
      }
    }
    catch (error) {
      console.log('Err: ', error);
    }
  }

  //   const handleSubmitLogin = async (event) => {
  //     event.preventDefault();
  //     console.log('logging')
  //     try {
  //       const res = await axios.post('http://localhost:3001/users/sign_in ', qs.stringify({
  //     "email": email,
  //     "password": password,
  //   }),
  //   {
  //     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  //   }
  // );
  //       const { token, user } = res.data;
  //       console.log('res', res);
  //       if (token) {
  //         setLoggedIn(true);
  //         onCloseLoginModal()
  //         localStorage.setItem('token', token);
  //         console.log('jwt: ', token)
  //       }
  //     }
  //     catch (error) {
  //       console.log('Err: ', error);
  //     }
  //   }


  const handleLogout = () => {
    delete axios.defaults.headers.common.Authorization;
    setLoggedIn(false)
    localStorage.removeItem('token');
  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
    return (
      window.removeEventListener('resize', showButton)
    )
  }, []);



  const classes = useStyles();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Hospitals
        </Typography>
        <div className={classes.navlinks}>
          <Link to="/" className={classes.link}>
            Home
          </Link>
          {(loggedIn) ? (
            <Link to="/Logout" className={classes.link} onClick={handleLogout} >
              Logout
            </Link>) : (
            <Link to="/Login" className={classes.link} onClick={onOpenLoginModal}>
              Login
            </Link>)
          }
          <Link to="/Signup" className={classes.link} onClick={onOpenSignupModal}>
            Signup
          </Link>
          <Dialog open={openSignup} onClose={onCloseSignupModal}>
            <h2 align='center'>Signup</h2>
            <form className={classes.root} onSubmit={handleSubmitSignup}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <TextField
                label="passwordConfirmation"
                variant="outlined"
                type="password"
                required
                value={passwordConfirmation}
                onChange={e => setPasswordConfirmation(e.target.value)}
              />
              <div>
                <Button variant="contained" onClick={onCloseSignupModal}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Signup
                </Button>
              </div>
            </form>
          </Dialog>
          <Dialog open={openLogin} onClose={onCloseLoginModal}>
            <h2 align='center'>Login</h2>
            <form className={classes.root} onSubmit={handleSubmitLogin}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <div>
                <Button variant="contained" onClick={onCloseLoginModal}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </div>
            </form>
          </Dialog>

        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
