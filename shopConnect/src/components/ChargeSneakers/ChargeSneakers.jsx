import { useState } from "react";

const CSneakers = ()=>{

const gen = [{men}, {women}, {youth}, {other}]
const cat = [{lifestyle}, {basketball}, {running}, {skateboarding}, {other}]

const [input, setInput] = useState({

   name:'',
   brand_name:'',
   category:[],
   color:'',
   gender:[],
   retail_price_cents: 0,
   slug:'',
   status:'',
});

const handleName =(e)=>{
    
    setInput({
        ...input,
        name: e.target.value
    })
};

const handleBrand = (e)=>{
    setInput({
        ...input,
        brand_name: e.target.value
    })
};
const handleCategory = (e)=>{
    setInput({
        ...input,
        category: [e.target.value]
    })
};
const handleColor = (e)=>{
    setInput({
        ...input,
        color: e.target.value
    })
};

const handleGender = (e)=>{
    setInput({
        ...input,
        gender:[e.target.value]
    })
};
const handlePrice = (e)=>{
    setInput({
        ...input,
        retail_price_cents: e.target.value
    })
};
const handleSlug = (e)=>{
    setInput({
        ...input,
        slug: e.target.value
    })
};
const handleStatus = (e)=>{
    setInput({
        ...input,
        status: e.target.value
    })
}


    return(
        <div>
            <h1>Charge Sneaker</h1>
            <form>
                <div>
                    <label>NAME:</label>
                    <input type="text" value={input.name} name="name" onChange={handleName}  placeholder="Insert Name..."></input>
                </div>
                <div>
                    <label>BRAND:</label>
                    <input type="text" value={input.brand_name} name="brand_name" onChange={handleBrand} placeholder="Inseert Brand..."></input>
                </div>
                <div>
                    <label>COLOR:</label>
                    <input type="text" value={input.color} name="color" onChange={handleColor} placeholder="Describes the color"></input>
                </div>
                <div>
                    <label>CATEGORY:</label>
                    <select onChange={handleCategory}>
                        <option>Select Category...</option>
                        {cat.map(c=>(
                            <option value={c} name='category'>{c}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>GENDER:</label>
                    <select onChange={handleGender}>
                        <option>Select Gender ...</option>
                        {gen.map(g=>(
                            <option value={g} name="gender">{g}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>PRICE:</label>
                    <input type="number" value={input.retail_price_cents} name="retail_price_cents" onChange={handlePrice} placeholder="Insert Price..."></input>
                </div>
                <div>
                    <label>SLUG:</label>
                    <input type="text" value={input.slug} name="slug"   onChange={handleSlug} placeholder="Insert Slug..."></input>
                </div>
                <div>
                    <label>STATUS:</label>
                    <select onChange={handleStatus}>
                        <option>Select Status...</option>
                        <option value='Active'>Active</option>
                        <option value='Desactivate'>Desactivate</option>
                    </select>
                </div>

                
            </form>
        </div>
    )

};

export default CSneakers;