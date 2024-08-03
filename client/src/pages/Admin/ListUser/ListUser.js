import classNames from "classnames/bind";

import styles from "./ListUser.module.scss";

const cx = classNames.bind(styles);

function ListUser() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("wrapper-title")}>
                <h1 className={cx("title")}>Danh Sách Người Dùng </h1>
                <span className={cx("totalUser")}>(50)</span>
            </div>
            <div className={cx("container ")}></div>
        </div>
    );
}

export default ListUser;
