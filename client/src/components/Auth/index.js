import classNames from "classnames/bind";
import { useState } from "react";
import { TiDelete } from "react-icons/ti";

import styles from "~/components/Auth/Auth.module.scss";
import Login from "~/components/Auth/Login";
import Register from "~/components/Auth/Register";
import OtherLogin from "~/components/Other/OtherLogin";
import { useContexts } from "~/hooks/useContext";
import Code from "./Code/Code";

const cx = classNames.bind(styles);

function Auth() {
    const [isAuth, setIsAuth] = useState(false);
    const { isHidden, handleHiddenLogin, isNext } = useContexts();

    const handleOnClose = () => {
        handleHiddenLogin(!isHidden);
    };
    return (
        <div className={cx("wrapper")}>
            {isNext ? (
                <Code />
            ) : (
                <div className={cx("container")}>
                    <button className={cx("close")} onClick={handleOnClose}>
                        <TiDelete />
                    </button>
                    {isAuth ? <Register /> : <Login />}
                    <OtherLogin isAuth={isAuth} />
                    <div className={cx("next")}>
                        <p className={cx("next-title")}>
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
            )}
        </div>
    );
}

export default Auth;
