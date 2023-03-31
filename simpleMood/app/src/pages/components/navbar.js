import Logout from "../utils/logout";
import "./navbar.css";

function Navbar(){
    return(
        <>
            <body>
                <div class="nav-div">
                    <ul><a class="nav-a"href="/home">Home </a></ul>
                    <ul><a class="nav-a" href="/add">Add Friend</a> </ul>
                    <ul><a class="nav-a" href="/" onClick={(e) => {Logout()}}> Sign Out</a></ul>
                </div>
            </body>
        </>
    )
}

export default Navbar;