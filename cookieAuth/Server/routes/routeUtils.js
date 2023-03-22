import Hashes from "jshashes";
import uuidv4 from "uuid";

function hash(myString){
    var SHA256 = new Hashes.SHA256;
    return SHA256.hex(myString);
}

function setCookie(){
    return uuidv4();
}