import axios from 'axios';

async function ConfirmLogin() {
    const url = "http://10.0.0.134:8080/home";
    axios.defaults.withCredentials = true; // include credentials
    
    let login = false;
  
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        login = true;
      }
    } catch (error) {
      if (error.response.status === 403) {
        console.log(error.response.data);
      }
    }
  
    return login;
  }

  export default ConfirmLogin;