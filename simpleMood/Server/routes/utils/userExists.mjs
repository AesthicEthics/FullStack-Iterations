async function UserExists(db, username){
    let collection = await db.collection("users");
    const query = {user: username};
    let isFriend = await collection.findOne(query);

    return isFriend
}

export default UserExists;