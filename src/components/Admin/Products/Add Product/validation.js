export default (data, stockIsValid, categoryIsValid) => {
    let  error = {};

    if(!data.name.length) error.n1 = "Required";
    if(!data.brand_name.length) error.bn1 = "Required";
    if(!data.color) error.c1 = "Required";
    if(!data.main_picture_url.length) error.mp1 = "Required";
    if(data.retail_price_cents < 0) error.p1 = "Enter a valid number";
    if(!stockIsValid) error.s1= "All fields are required";
    if(!categoryIsValid) error.ca1= "All fields are required";
    
    return error;
};