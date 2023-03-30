import axios from "axios";

async function Logout(){
    const url = "http://localhost:8080/logout";
    axios.defaults.withCredentials = true;

    try{
        const response = await axios.post(url);
        if (response.status === 200){
            alert("Logged Out!")
        }
    } catch(error){
        if (error.response.status === 500){
            alert("Something Went Wrong...")
        }
    }
}

export default Logout