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

const qs = require('query-string');
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


const SendMail = () => {


  const classes = useStyles();

  const [subject, setSubject] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')


  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (subject && name && email && message) {
      console.log('sending email')
const emailData = {
    "subject": subject,
    "name": name,
    "email": email,
    "message": message
  }
const jwt = localStorage.getItem('token')
const url = 'http://localhost:3001/contacts'

      try {
        const res = await axios.post(url, { emailData },{headers: {Authorization: `Bearer ${jwt}` } });
        // const { token, user } = res.data;
        console.log('res', res);
        // setLoggedIn(true);
        // onCloseSignupModal()
        // if (token) {
          // setLoggedIn(true);
          // onCloseSignupModal()
          // localStorage.setItem('token', token);
          // console.log('jwt: ', token)
        // }
      }
      catch (error) {
        console.log('oh, no', error);
      }
    }
    else {
      console.log('blank fields not permitted')
    }
  }

  return (
    <div>
      <h2 align='center'>Email Details</h2>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Subject"
          variant="outlined"
          type="text"
          required
          value={subject}
          onChange={e => setSubject(e.target.value)}
        />
        <TextField
          label="Name"
          variant="outlined"
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Message"
          variant="outlined"
          type="text"
          required
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <div>
          {/* <Button variant="contained" onClick={onCloseLoginModal}>
            Cancel
          </Button> */}
          <Button type="submit" variant="contained" color="primary">
            Send Mail
          </Button>
        </div>
      </form>
    </div>
  )

}

export default SendMail
