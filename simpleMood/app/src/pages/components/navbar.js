import Logout from "../utils/logout";
import axios from "axios";
import "./navbar.css";
import { useEffect, useState } from "react";

async function getUser(){
    const url = "http://localhost:8080/getUser";
    axios.defaults.withCredentials = true;

    try {
        const response = await axios.get(url);
        if (response.status === 200){
            return response.data;
        }
    } catch(error){
        console.log(error)
    }
}

function Navbar(){
    const [currentUser, setUser] = useState("");

    useEffect(() => {
        getUser().then(result => {
            setUser(result);
        })
    },[])
    
    return(
        <>
            <body>
                <div class="nav-div">
                    <ul><a class="nav-a"href="/home">Home </a></ul>
                    <ul><a class="nav-a" href="/add">Add Friend</a> </ul>
                    <ul><a class="nav-a" href="/profile">Logged in as: {currentUser}</a></ul>
                    <ul><a class="nav-a" href="/" onClick={(e) => {Logout()}}> Sign Out</a></ul>
                </div>
            </body>
        </>
    )
}

export default Navbar;