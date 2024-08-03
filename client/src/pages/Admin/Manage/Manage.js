import classNames from "classnames/bind";

import styles from "./Manage.module.scss";

const cx = classNames.bind(styles);

function Manage() {
    return <div className={cx("wrapper")}>Manage Page</div>;
}

export default Manage;
