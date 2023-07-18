export default (data) => {
    let  error = {};

    if(data.mail.length < 3) error.e1 = "Must have a minimum of three characters";
    if(data.password.length < 6) error.p1 = "Must have a minimum of six characters";
    if(!data.mail.length) error.n1 = "Required";
    if(!data.password.length) error.p2 = "Required";

    return error;
};