import './login.css';
import { useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

async function handleSubmit(username, password){
  // add the backend url
  const url = "http://10.0.0.134:8080/login";
  axios.defaults.withCredentials = true; // include credentials
  // construct postContents in json form
  const postContents = {
    username: username,
    password: password
  };

  try{
    const response = await axios.post(url, postContents);
    if (response.status === 200){
      return (true);
    }
  } catch (error){
    console.log(error)
  }
}
function Login() {
  //setUsername are setter functionst that 
  // set the value of the "userName" functions
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  return (
    // use (e) => handleSubmit() to stop the page from
    // rendering and hence invoking the handleSubmit function 
    // everytime the page is loaded and only do it when an "event" occurs
     <>
     <div id="loginContainer">

        <form onSubmit={async (e) =>{ 
          e.preventDefault();
          var confirmLogin = false;
          await handleSubmit(userName, password)
          .then((result) => {
            confirmLogin = result;
          })
          if(confirmLogin ){
            history.push({
              pathname: "/home"
            });
          }}}>
          
          <div>
              Username:
              <br/>
              <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              />
          </div>

          <div>
            <label>
              Password:
              <br/> 
              <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <button type="submit">Login</button>

        </form>
        <br></br>
        <a href="/signup"> Sign Up </a>
      </div>
    </>
  );
}

export default Login;
