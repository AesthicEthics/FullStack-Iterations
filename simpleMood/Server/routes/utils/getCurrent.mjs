async function getUser(db, req){
    const sessionCookie = req.headers.cookie?.split("=")[1];
    // extract current user
    let collection = await db.collection("sessions");
    const query = {cookie: sessionCookie};
    const findUser = await (collection.findOne(query));
    const currentUser = findUser.user;

    return currentUser;
}

export default getUser;