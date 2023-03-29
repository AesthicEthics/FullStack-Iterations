import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from "../components/navbar"

async function confirmLogin() {
    const url = "http://localhost:8080/home";
    axios.defaults.withCredentials = true; // include credentials
    
    let login = false;
  
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        login = true;
      }
    } catch (error) {
      if (error.response.status === 403) {
        alert(error.response.data);
      }
    }
  
    return login;
  }


  function Home() {
    const [loggedIn, setLoggedIn] = useState(null);
  
    useEffect(() => {
      confirmLogin().then((result) => {
        setLoggedIn(result);
      });
    }, []);
  
    if (loggedIn === null) {
      // show loading spinner or other indicator
      return <div>Loading...</div>;
    } else if (loggedIn) {
      return Navbar("Sample");
    } else {
      return <div>Session Timeout Lolz</div>;
    }
  }

export default Home;