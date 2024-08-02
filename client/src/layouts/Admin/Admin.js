import classNames from "classnames/bind";

import style from "./Admin.module.scss";
import Sidebar from "~/components/Sidebar";

const cx = classNames.bind(style);

function Admin({ children }) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("sidebar")}>
                <Sidebar />
            </div>
            <div className={cx("container")}>
                <div className={cx("content")}>{children}</div>
            </div>
        </div>
    );
}

export default Admin;
