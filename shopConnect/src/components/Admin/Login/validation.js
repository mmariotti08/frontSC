export default (data) => {
    let  error = {};

    if(data.email.length < 3){
        error.e1 = "Must have a minimum of three characters";
    };
    if(data.password.length < 6) {
        error.p1 = "Must have a minimum of six characters";
    };
    return error;
};