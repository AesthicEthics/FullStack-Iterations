import Logout from "../utils/logout"

function Navbar(){
    return(
        <>
        <div>
            <ul><a href="/home">Home </a></ul>
            <ul><a href="/add">Add Friend</a> </ul>
            <ul><button onClick={(e) => {Logout()}}> Sign Out</button></ul>
        </div>
        </>
    )
}

export default Navbar;