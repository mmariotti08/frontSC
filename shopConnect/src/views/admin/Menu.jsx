import { useState } from "react";
import { All_Products } from "../../components/Admin/Products/All Products";
import { Add_Product } from "../../components/Admin/Products/Add Product";
import { Categories } from "../../components/Admin/Products/Categories";
import styles from "./Menu.module.css"

const Menu = () => {
    const menu = [
        { label: "Orders" },
        { label: "Products", submenu: ["All products", "Add new", "Categories"] },
        { label: "Users" }
    ];

    const [option, setOption] = useState("");

    const componentMap = {
        "All products": <All_Products />,
        "Add new": <Add_Product />,
        "Categories": <Categories />,
    };
    
    return (
        <div className={styles.container}>  
            <div className={styles.menu}>
                {menu.map(item => (
                    <div key={item.label}>
                        <h3>{item.label}</h3>
                        {item.submenu?.map(submenu => (
                            <button key={submenu} onClick={() => setOption(submenu)}>{submenu}</button>
                        ))}
                    </div>
                ))}

            </div>
            <div className={styles.components}>
                {componentMap[option]}
            </div>
        </div>
    );
};

export { Menu };