import { useDispatch } from "react-redux"
import { updateUser } from "../../redux/actions"
import { useState } from "react"
import styles from "./Address.module.css"

const Addreses = (id)=>{
    const [data, setData]= useState({
        street:""
    })

    const dispatch = useDispatch()
    const handleSumbit =(e)=>{
        e.preventDefault();
        dispatch(updateUser(id, data))
    }
    const handleAddress = (e) => {
        setData({
            ...data,
            street: e.target.value
        })
    }
    return (
        <div className={styles.cAddress}>
            <form onSubmit={handleSumbit}>
                <h1>Add Address</h1>
                <div>
                    <label>Street</label>
                    <input type="text" value={data.street} name='street' onChange={handleAddress} placeholder="Type Street..." />
                </div>
                <button type="sumbit">sumbbit</button>
            </form>
        </div>
    )
}

export default Addreses