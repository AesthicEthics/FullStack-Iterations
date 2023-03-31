import axios from "axios";
import { useEffect, useState } from "react";
import "./friends.css"

async function getFriends(){
    const url = "http://localhost:8080/friends";
    axios.defaults.withCredentials = true;

    try {
        const response = await axios.get(url);
        if (response.status === 200){
            const friendList = response.data;
            return([friendList.friends]);
        }
    } catch(error){
        alert(error.response.data);
    }
}

function ShowFriends(){
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        getFriends().then(results => {
            setFriends(results[0]);
        });
    }, []);
    
    const myFriends = friends.map((friends) => <ul class="friendBox"key={friends}><a class="a-friends" href={`/users/${friends}`}>👤{friends}</a></ul>);
    return(
        <>
            <div class="friendDiv">
                <u>Friends</u>
                {myFriends}
            </div>
        </>
    )
}

export default ShowFriends;