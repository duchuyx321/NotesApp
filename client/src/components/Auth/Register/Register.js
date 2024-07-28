import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import styles from "~/components/Auth/Register/Register.module.scss";
import Button from "~/components/Button";

const cx = classNames.bind(styles);
function Register() {
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authenticationPassword, setAuthenticationPassword] = useState("");
    const [code, setCode] = useState("");
    const [sendCode, setSendCode] = useState("Gửi Mã");
    const [timeSendCode, setTimeSendCode] = useState(0);

    const handleOnSubmit = () => {};
    const handleSendingVerificationCode = (e) => {
        e.preventDefault();
        setTimeSendCode(60);
    };
    useEffect(() => {
        if (timeSendCode > 0) {
            const intervalId = setInterval(() => {
                setTimeSendCode((prevTime) => Math.max(prevTime - 1, 0));
                setSendCode(`Gửi Lại sau ${timeSendCode}`);
            }, 1000);
            return () => clearInterval(intervalId);
        } else if (timeSendCode === 0) {
            setSendCode("Gửi Lại");
        }
    }, [timeSendCode]);
    return (
        <div className={cx("wrapper")}>
            <form className={cx("wrapper-from")}>
                <div className={cx("from-input")}>
                    <label htmlFor="username" className={cx("label-input")}>
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className={cx("input")}
                        autoComplete="off"
                        placeholder="Nhập địa chỉ username"
                        onInput={(e) => setUsername(e.target.value)}
                    />
                    <span className={cx("placeholder")} hidden>
                        {/* {warningUsername} */}
                    </span>
                </div>
                <div className={cx("from-input")}>
                    <label htmlFor="email" className={cx("label-input")}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={cx("input")}
                        autoComplete="off"
                        placeholder="Nhập địa chỉ email"
                        onInput={(e) => setEmail(e)}
                    />
                    <span className={cx("placeholder")} hidden>
                        {/* {warningEmail} */}
                    </span>
                </div>
                <div className={cx("from-input")}>
                    <label htmlFor="password" className={cx("label-input")}>
                        Mật Khẩu
                    </label>
                    <input
                        type="password"
                        id="password"
                        className={cx("input")}
                        autoComplete="off"
                        placeholder="Nhập mật khẩu"
                        onInput={(e) => setPassword(e)}
                    />
                    <span className={cx("placeholder")} hidden>
                        {/* {warningPassword} */}
                    </span>
                </div>
                <div className={cx("from-input")}>
                    <label
                        htmlFor="authentication-password"
                        className={cx("label-input")}
                    >
                        Nhập lại mật khẩu
                    </label>
                    <input
                        type="password"
                        id="authentication-password"
                        className={cx("input")}
                        autoComplete="off"
                        placeholder="Nhập lại mật khẩu"
                        onInput={(e) => setAuthenticationPassword(e)}
                    />
                    <span className={cx("placeholder")} hidden>
                        {/* {warningPassword} */}
                    </span>
                </div>
                <div className={cx("from-input")}>
                    <div className={cx("authentication")}>
                        <label
                            htmlFor="authentication-gmail"
                            className={cx("label-input")}
                        >
                            Mã Xác Nhận
                        </label>

                        <div className={cx("authentication-inner")}>
                            <input
                                type="text"
                                id="authentication-gmail"
                                className={cx("input")}
                                autoComplete="off"
                                placeholder="Nhập Mã Xác Nhận "
                                onInput={(e) => setCode(e)}
                            />
                            <Button
                                type="button"
                                className={cx("sendingCode")}
                                onClick={(e) =>
                                    handleSendingVerificationCode(e)
                                }
                                disabled={timeSendCode > 0}
                            >
                                {sendCode}
                            </Button>
                        </div>
                    </div>
                    <span className={cx("placeholder")} hidden>
                        {/* {warningPassword} */}
                    </span>
                </div>
            </form>
            <div className={cx("wrapper-btn")}>
                <Button
                    to="/"
                    submit
                    large
                    disabled={disabled}
                    onClick={handleOnSubmit}
                    loading
                    // leftIcon={}
                    hidden={loading}
                >
                    Đăng Kí
                </Button>
            </div>
        </div>
    );
}

export default Register;
