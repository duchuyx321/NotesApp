import classNames from "classnames/bind";

import styles from "~/components/Auth/Login/Login.module.scss";

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("title")}>Login</h1>
            <form className={cx("formInput")}>
                <div className={cx("fromUsername")}>
                    <label htmlFor="username">username</label>
                    <input
                        type="text"
                        id="username"
                        autoComplete="off"
                        placeholder="Nhập địa chỉ username"
                    />
                </div>
                <div className={cx("formEmail")}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        autoComplete="off"
                        placeholder="Nhập địa chỉ email"
                    />
                </div>
                <div className={cx("formPassword")}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        autoComplete="off"
                        placeholder="Nhập địa chỉ email"
                    />
                </div>
            </form>
        </div>
    );
}

export default Login;
