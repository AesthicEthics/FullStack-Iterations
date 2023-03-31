import axios from "axios";
import { useEffect, useState } from "react";

async function getFriends(){
    const url = "http://localhost:8080/friends";
    axios.defaults.withCredentials = true;

    try {
        const response = await axios.get(url);
        if (response.status === 200){
            const friendList = response.data;
            alert(friendList.friends);
        }
    } catch(error){
        alert(error.response.data);
    }
}

function ShowFriends(){
    const [friends, setFriends] = useState("");

    useEffect(() => {
        getFriends().then(results => {
            setFriends(results.data.friends);
        });
    }, []);
    
    console.log(friends);
    return(
        <>
            <p>Hi</p>
        </>
    )
}

export default ShowFriends;