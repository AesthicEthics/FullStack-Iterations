import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NotFound from "./doesNotExist";

async function loadUser(url){
    axios.defaults.withCredentials = true;
    try{
        const response = await axios.get(url);
        if (response.status === 200){
            return response.data
        }
    } catch (error) {
        console.log(error.response.data);
    }
}
function User(){
    const params = useParams();
    const url = `http://localhost:8080/users/${params.username}`;
    const [isUser, setIsUser] = useState(null);

    useEffect(() => {
        loadUser(url).then((results) => {
            setIsUser(results);
        });
    }, [url]);

    if (isUser){
        return(
            <div>{params.username}</div>
        )
    } else{
        return (
            <NotFound/>
        )
    }
}

export default User;