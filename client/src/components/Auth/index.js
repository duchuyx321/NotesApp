import classNames from "classnames/bind";
import { useState } from "react";

import styles from "~/components/Auth/Auth.module.scss";
import Login from "~/components/Auth/Login";
import Register from "~/components/Auth/Register";

const cx = classNames.bind(styles);
function Auth() {
    const [isAuth, setIsAuth] = useState(false);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {isAuth ? <Register /> : <Login />}
                <div className={cx("next")}>
                    <p className="next-title">
                        {isAuth
                            ? "Bạn đã có tài khoản?"
                            : "Bạn chưa có tài khoản?"}
                    </p>
                    <button
                        className={cx("next-btn")}
                        onClick={() => setIsAuth(!isAuth)}
                    >
                        {isAuth ? "Đăng nhập" : "Đăng kí"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Auth;
