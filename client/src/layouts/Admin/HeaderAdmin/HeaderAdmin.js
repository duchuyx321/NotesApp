import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./HeaderAdmin.module.scss";
import Button from "~/components/Button";

const cx = classNames.bind(styles);
function HeaderAdmin() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <Link to="/admin" className={cx("wrapper-Logo")}>
                    <img
                        src="https://res.cloudinary.com/dglgdtov0/image/upload/v1720429258/logo_1_urfref.png"
                        alt="Logo"
                        className={cx("logo")}
                    />
                </Link>
            </div>
            <Button submit className={cx("wrapper-btn")}>
                Đăng Xuất
            </Button>
        </div>
    );
}

export default HeaderAdmin;
