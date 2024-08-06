import classNames from "classnames/bind";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF, FaGithub } from "react-icons/fa6";

import styles from "./OtherLogin.module.scss";

const cx = classNames.bind(styles);

function OtherLogin({ isAuth = false }) {
    const handleLoginFB = () => {};
    const handleLoginGH = () => {};
    const handleLoginGG = () => {
        window.location.href = "http://localhost:5050/api/auth/google";
    };
    return (
        <div className={cx("wrapper")}>
            <span className={cx("wrapper-content")}>
                <h3 className={cx("hintOther")}>
                    {isAuth
                        ? "Đăng Kí Bằng Tài Khoản Khác"
                        : "Đăng Nhập Bằng Tài Khoản Khác"}{" "}
                </h3>
            </span>
            <div className={cx("wrapper-other")}>
                <button className={cx("other-icon")} onClick={handleLoginGG}>
                    <FaGoogle />
                </button>
                <button className={cx("other-icon")} onClick={handleLoginFB}>
                    <FaFacebookF />
                </button>
                <button className={cx("other-icon")} onClick={handleLoginGH}>
                    <FaGithub />
                </button>
            </div>
        </div>
    );
}

export default OtherLogin;
