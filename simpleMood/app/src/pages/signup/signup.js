import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

async function handleSubmit (username, password, email){
    // handle Navigation by changing history pointer
    // add the backend url
    const url = "http://localhost:8080/signup";
    axios.defaults.withCredentials = true; // include credentials
    // construct postContents in json form
    const postContents = {
      username: username,
      password: password,
      email: email
    };
  
    // axios removes any promise that isn't 200 (OK) status tagged
    // using a try-catch error handling to deal with these errors
    try {
        const response = await axios.post(url, postContents);
        response.data.then(data => alert(data));
      } catch (error) {
        if (error.response.status === 401) {
          alert(error.response.data);
        }
      }
      
    return
  }

function SignUp(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    return(
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit(username, password, email)}}>
            <div>
                <label>
                    Username:
                    <input 
                    type="text" 
                    onChange={(e) => {setUsername(e.target.value)}}>
                    </input>
                </label>

                <div>
                    Password:
                    <input 
                    type="password"
                    onChange={(e) => {setPassword(e.target.value)}}
                    >
                    </input>
                </div>

                <div>
                    Email:
                    <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>

                <button type="submit">Sign up</button>
            </div>

        </form>
    )
}

export default SignUp;