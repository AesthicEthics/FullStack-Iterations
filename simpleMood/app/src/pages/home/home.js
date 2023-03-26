import axios from 'axios';

async function confirmLogin() {
    const url = "http://localhost:8080/home";
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


function Home(){
    const checkLogin = confirmLogin();

    if (checkLogin === true){
        return(
            <div> Login Success </div>
        )
    }
    else{
        return(
            <div>Session Timeout Lolz</div>
        )
    }
}

export default Home;