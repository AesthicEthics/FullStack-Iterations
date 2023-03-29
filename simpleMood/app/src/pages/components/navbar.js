function Navbar(username){
    return(
        <>
        <div>
            <ul><a href="/home">Home </a></ul>
            <ul><a href="/add">Add Friend</a> </ul>
            <ul><a href="/signout"> Sign Out</a></ul>
            <ul>{username}</ul>
        </div>
        </>
    )
}

export default Navbar;