import classNames from "classnames/bind";

import styles from "./AdminHome.module.scss";

const cx = classNames.bind(styles);

function AdminHome() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <img
                    className={cx("BackGroupAdmin")}
                    src="https://res.cloudinary.com/dglgdtov0/image/upload/v1722703110/backgroudAdmin_jqur5l.webp"
                    alt="BackGroupAdmin"
                />
            </div>
            <div className={cx("Content")}>
                <h1 className={cx("title")}>Admin Page</h1>
            </div>
        </div>
    );
}

export default AdminHome;
