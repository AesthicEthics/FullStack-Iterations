import axios from "axios";

async function Logout(){
    const url = "http://10.0.0.134:8080/logout";
    axios.defaults.withCredentials = true;

    try{
        const response = await axios.post(url);
        if (response.status === 200){
            console.log("Logged Out");
        }
    } catch(error){
        if (error.response.status === 500){
            console.log("Something Went Wrong...")
        }
    }
}

export default Logout