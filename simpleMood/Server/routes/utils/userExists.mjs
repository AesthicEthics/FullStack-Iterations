async function UserExists(db, username){
    let collection = await db.collection("users");
    const query = {user: username};
    let isFriend = await collection.findOne(query);

    if (isFriend){
        return true
    }
}

export default UserExists;