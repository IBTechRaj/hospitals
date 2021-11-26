import React from "react";
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import SendMail from './SendMail'
// import Home from "./pages/home";
// import About from "./pages/about";
// import Contact from "./pages/contact";
// import Faq from "./pages/faq"; 

const getLoggedStatus = () => {
  let loggedIn
}


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <Router>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <SendMail />
      <Routes>
        {/* <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/faq" component={Faq} /> */}
      </Routes>
    </Router>
  );
}
export default App;