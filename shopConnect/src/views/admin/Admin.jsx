import { useSelector } from "react-redux";
import { Login } from "../../components/Admin/Login/Login";
import { Menu } from "./Menu";
import { Routes, Route } from "react-router-dom";

const Admin = () => {

    const getApprovalAdmin = useSelector(state => state.getApprovalAdmin);

    return (
        <>
            {getApprovalAdmin ? <Menu /> : <Login />}
        </>
    );
};

export { Admin };