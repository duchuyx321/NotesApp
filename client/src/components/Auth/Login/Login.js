/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import { useEffect, useState, useRef } from "react";

import styles from "~/components/Auth/Login/Login.module.scss";
import Button from "~/components/Button";
import { login } from "~/service/authService";
import { useContexts } from "~/hooks/useContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Login() {
    const [renderResult, setRenderResult] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isEmail, setIsEmail] = useState(true);
    const [password, setPassword] = useState("");
    const [warningUsername, setWarningUsername] = useState("");
    const [warningEmail, setWarningEmail] = useState("");
    const [warningPassword, setWarningPassword] = useState("");
    const [submit, setSubmit] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(true);
    const [isHidden, handleHiddenLogin] = useContexts();

    const warning1 = useRef("");
    const warning2 = useRef("");
    const warning3 = useRef("");
    useEffect(() => {
        // Kiểm tra username
        if (username.length < 6 && username.length > 1) {
            setWarningUsername("Username phải có ít nhất 6 kí tự");
            if (warning1.current) warning1.current.hidden = false;
        } else {
            if (warning1.current) warning1.current.hidden = true;
        }

        // Kiểm tra email
        if (!isEmail) {
            setWarningEmail("Email không hợp lệ");
            if (warning2.current) warning2.current.hidden = false;
        } else {
            if (warning2.current) warning2.current.hidden = true;
        }

        // Kiểm tra password
        if (password.length < 8 && password.length > 1) {
            setWarningPassword("Password phải có ít nhất 8 kí tự");
            if (warning3.current) warning3.current.hidden = false;
        } else {
            if (warning3.current) warning3.current.hidden = true;
        }

        // Cập nhật trạng thái của nút Đăng Nhập
        if (password.length >= 8 && username.length >= 6 && isEmail) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [username, email, isEmail, password]);

    useEffect(() => {
        if (submit) {
            const fetchAPI = async () => {
                setLoading(false);
                const result = await login(username, email, password);
                if (result && result.status === 401) {
                    warningLogin(result.e); // Xử lý lỗi khi status là 401
                } else if (result && result.status === 500) {
                    warningLogin(result.e); // Xử lý lỗi khi status là 500
                } else {
                    setRenderResult(result);
                    localStorage.setItem(
                        "authorization",
                        `Bearer ${result.accessToken}`
                    );
                    setSubmit(false);
                    handleHiddenLogin(false);
                    window.location.reload();
                }
                setDisabled(true);
                setLoading(true);
            };
            fetchAPI();
        }
    }, [renderResult, submit]);

    const handleOnInputUsername = (e) => {
        setUsername(e.target.value);
    };
    const handleOnInputEmail = (e) => {
        setEmail(e.target.value);
        setIsEmail(e.target.validity.valid);
    };
    const handleOnInputPassword = (e) => {
        setPassword(e.target.value);
    };
    const handleOnSubmit = (e) => {
        // e.preventDefault();
        setSubmit(true);
    };
    const warningLogin = (e) => {
        if (e === "Password not found") {
            setWarningPassword("Password Không đúng!");
            warning3.current.hidden = false;
        } else if (e === "Email not found") {
            setWarningEmail("Email không đúng!");
            warning2.current.hidden = false;
        } else if (e === "Username not found") {
            setWarningUsername("Username không đúng!");
            warning1.current.hidden = false;
        }
    };
    const handleOnClose = () => {
        handleHiddenLogin(!isHidden);
    };
    return (
        <div className={cx("wrapper")}>
            <button className={cx("close")} onClick={handleOnClose}>
                <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <h1 className={cx("title")}>Login</h1>
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
                        onInput={(e) => handleOnInputUsername(e)}
                    />
                    <span className={cx("placeholder")} ref={warning1} hidden>
                        {warningUsername}
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
                        onInput={(e) => handleOnInputEmail(e)}
                    />
                    <span className={cx("placeholder")} ref={warning2} hidden>
                        {warningEmail}
                    </span>
                </div>
                <div className={cx("from-input")}>
                    <label htmlFor="password" className={cx("label-input")}>
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className={cx("input")}
                        autoComplete="off"
                        placeholder="Nhập mật khẩu"
                        onInput={(e) => handleOnInputPassword(e)}
                    />
                    <span ref={warning3} className={cx("placeholder")} hidden>
                        {warningPassword}
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
                    leftIcon={<FontAwesomeIcon icon={faSpinner} />}
                    hidden={loading}
                >
                    Đăng Nhập
                </Button>
            </div>
        </div>
    );
}

export default Login;
