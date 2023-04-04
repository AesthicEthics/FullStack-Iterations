import axios from "axios";
import { useState } from "react";

async function handleSubmit(friendUsername){
    const url = "http://10.0.0.134:8080/add";
    axios.defaults.withCredentials = true;

    const postContents = {
        friendUsername: friendUsername,
    };

    try{
        const response = await axios.post(url, postContents);
        if (response.status === 200){
            alert(response.data)
        }
    } catch(error){
        alert(error.response.data);
    }
}


function AddFriend(){
    const [friendUsername, setUsername] = useState("");
    return(
        <>
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(friendUsername);
                    }}>
                    <input
                        type="text"
                        placeholder="username"
                        onChange={(e) => {setUsername(e.target.value)}}
                    >
                    </input>
                    <button type="submit">Add Friend</button>
                </form>
            </div>
        </>
    )
}

export default AddFriend;