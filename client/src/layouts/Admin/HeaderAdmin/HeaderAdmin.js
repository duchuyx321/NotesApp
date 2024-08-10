import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";

import styles from "./HeaderAdmin.module.scss";
import Button from "~/components/Button";
import { logout } from "~/service/authService";

const cx = classNames.bind(styles);
function HeaderAdmin() {
    const navigation = useNavigate();
    const handleEvent = async () => {
        const fetchAPI = async () => {
            const result = await logout();
            if (result.status === 200) {
                localStorage.removeItem("authorization");
                navigation("/");
                window.location.reload();
            }
        };
        await fetchAPI();
    };

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
            <Button submit className={cx("wrapper-btn")} onClick={handleEvent}>
                Đăng Xuất
            </Button>
        </div>
    );
}

export default HeaderAdmin;
