function getFname(fullname) //cb
{
    fullname = fullname.split(" ");
    return fullname[0];
}

function getLname(fullname) {   //cb
    fullname = fullname.split(" ");
    return fullname[1];
}

function fun(fullname, cb)  //hof
{
    let name = cb(fullname);
    console.log(name);
}

fun("Ishu Goel", getLname);
fun("Ojas Goel", getFname);