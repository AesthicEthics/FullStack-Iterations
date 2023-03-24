import Hashes from "jshashes";

function hash(myString){
    var SHA256 = new Hashes.SHA256;
    return SHA256.hex(myString);
}

export default hash;