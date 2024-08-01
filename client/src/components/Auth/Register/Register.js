import classNames from "classnames/bind";

import styles from "~/components/Auth/Register/Register.module.scss";
import Button from "~/components/Button";
import HandleRegister from "./handleRegister";
import { useContexts } from "~/hooks/useContext";
import { checkAuth } from "~/service/authService";

const cx = classNames.bind(styles);

function Register() {
    const {
        isNext,
        handleIsNext,
        setTextUsername,
        setTextEmail,
        setTextPassword,
    } = useContexts();

    const {
        setEmail,
        setPassword,
        setUsername,
        setAuthenticationPassword,
        setWarningEmail,
        setWarningUsername,
        refreshWarning,
        email,
        password,
        username,
        warningEmail,
        warningUsername,
        warningPassword,
        warningAuthenticationPass,
        disabled,
    } = HandleRegister();

    const handleOnNext = async () => {
        loadValue();
        const fetchAPI = async () => {
            const resultValue = await checkAuth(email, username);
            // console.log(resultValue.massage);
            if (resultValue.massage === "successfully") {
                await handleIsNext(!isNext);
            } else {
                console.log(resultValue.massage === "Email Đã Tồn Tại");
                if (resultValue.massage === "Username Đã Tồn Tại") {
                    refreshWarning();
                    return setWarningUsername(resultValue.massage);
                } else if (resultValue.massage === "Email Đã Tồn Tại") {
                    refreshWarning();
                    return setWarningEmail(resultValue.massage);
                }
                // Nếu có thể có nhiều cảnh báo khác, hãy thêm các điều kiện tương ứng ở đây
                refreshWarning();
                // console.log(resultValue.massage); // Kiểm tra giá trị của resultValue.message
            }
        };
        console.log({ warningUsername, warningEmail });
        await fetchAPI();
    };
    const loadValue = () => {
        setTextUsername(username);
        setTextEmail(email);
        setTextPassword(password);
    };

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
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <span
                        className={cx("placeholder")}
                        hidden={warningUsername === ""}
                    >
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
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span
                        className={cx("placeholder")}
                        hidden={warningEmail === ""}
                    >
                        {warningEmail}
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        className={cx("placeholder")}
                        hidden={warningPassword === ""}
                    >
                        {warningPassword}
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
                        onChange={(e) =>
                            setAuthenticationPassword(e.target.value)
                        }
                    />
                    <span
                        className={cx("placeholder")}
                        hidden={warningAuthenticationPass === ""}
                    >
                        {warningAuthenticationPass}
                    </span>
                </div>
            </form>
            <div className={cx("wrapper-btn")}>
                <Button submit large disabled={disabled} onClick={handleOnNext}>
                    Đăng Kí
                </Button>
            </div>
        </div>
    );
}

export default Register;
