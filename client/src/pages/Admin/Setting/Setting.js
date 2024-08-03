import classNames from "classnames/bind";

import styles from "./Setting.module.scss";

const cx = classNames.bind(styles);

function Setting() {
    return <div className={cx("wrapper")}>Setting Page</div>;
}

export default Setting;
