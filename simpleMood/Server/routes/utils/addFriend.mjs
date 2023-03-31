async function AddFriend(db, currentUser, friendUsername){
    let userCollection = await db.collection("users");
    const filterQuery = {user: currentUser};

    // check if they are already friends 
    const loadDocument = await userCollection.findOne(filterQuery);
    const checkFriend = loadDocument.friends;

    if (checkFriend.includes(friendUsername)){
        return false
    }
    else{
        const updateValue = {$push: { friends: friendUsername}};
        await userCollection.findOneAndUpdate(filterQuery, updateValue);
    
        return true
    }
}

export default AddFriend;