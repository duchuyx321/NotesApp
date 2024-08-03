/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import style from "./Admin.module.scss";
import Sidebar from "~/components/Sidebar";
import HeaderAdmin from "./HeaderAdmin";

const cx = classNames.bind(style);

function Admin({ children }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("authorization")) {
            const decoded = jwtDecode(localStorage.getItem("authorization"));
            if (decoded.admin === false) {
                navigate("/");
            }
        }
    }, []);
    return (
        <div className={cx("wrapper")}>
            <HeaderAdmin />
            <div className={cx("container")}>
                <div className={cx("sidebar")}>
                    <Sidebar />
                </div>
                <div className={cx("content")}>{children}</div>
            </div>
        </div>
    );
}

export default Admin;
