async function validateSession(db, res, req){
        // extract session cookie to verify existence in the DB 
        const sessionCookie = req.headers.cookie?.split("=")[1];
        // verify user session
        let collection = await db.collection("sessions");
        const query = await collection.findOne({cookie: sessionCookie})
    
        if (query){
            return true
        }
        else{
            return false;
        }
}

export default validateSession;