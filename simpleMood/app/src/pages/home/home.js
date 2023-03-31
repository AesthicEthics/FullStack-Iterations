import { useState, useEffect } from 'react';
import Navbar from "../components/navbar"
import ShowFriends from '../components/showFriends';
import ConfirmLogin from "../utils/confirmLogin"

  function Home() {
    const [loggedIn, setLoggedIn] = useState(null);
  
    useEffect(() => {
      ConfirmLogin().then((result) => {
        setLoggedIn(result);
      });
    }, []);
  
    if (loggedIn === null) {
      // show loading spinner or other indicator
      return <div>Loading...</div>;
    } else if (loggedIn) {
      return (
        <>
          <Navbar/>
          <ShowFriends/>
        </>
      );
    } else {
      return <div>Session Timeout Lolz</div>;
    }
  }

export default Home;