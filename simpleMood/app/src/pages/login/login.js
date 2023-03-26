import './login.css';
import { useState } from "react";
import axios from 'axios';

function handleSubmit(username, password){
  // add the backend url
  const url = "http://localhost:8080/login";

  // construct postContents in json form
  const postContents = {
    username: username,
    password: password
  };

  axios.post(url,postContents)
  // use then to resolve the perfomance and capture response data
  .then((response => {
    alert(response.data)
  }))
  return
}
function Login() {
  //setUsername are setter functionst that 
  // set the value of the "userName" functions
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    // use (e) => handleSubmit() to stop the page from
    // rendering and hence invoking the handleSubmit function 
    // everytime the page is loaded and only do it when an "event" occurs
     <>
     <div id="loginContainer">
        <form onSubmit={(e) =>{ 
          e.preventDefault();
          handleSubmit(userName, password)}}>
          
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
