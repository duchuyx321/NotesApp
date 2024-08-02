import classNames from "classnames/bind";

import styles from "./AdminPage.module.scss";

const cx = classNames.bind(styles);

function AdminPage() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>AdminPage</div>
        </div>
    );
}

export default AdminPage;
