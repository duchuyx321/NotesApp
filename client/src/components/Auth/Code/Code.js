import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import styles from "~/components/Auth/Register/Register.module.scss";
import Button from "~/components/Button";
import { useContexts } from "~/hooks/useContext";
import { sendCode, checkCode } from "~/service/sendCodeService";
import { register } from "~/service/authService";

const cx = classNames.bind(styles);

function Code() {
    const [code, setCode] = useState("");
    const [warningSendCode, setWarningSendCode] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(true);
    const [contentBtn, setContentBtn] = useState("Gửi Mã");
    const [timeSendCode, setTimeSendCode] = useState(0);
    const { textEmail, textUsername, textPassword, isNext, handleIsNext } =
        useContexts();
    const navigate = useNavigate();

    // console.log({ textEmail, textPassword, textUsername });
    useEffect(() => {
        if (!code) {
            return setWarningSendCode("");
        }
        if (code.length < 6) {
            return setWarningSendCode("Mã Xác Nhận bao gồm 6 kí tự");
        }
        return setWarningSendCode("");
    }, [code]);

    useEffect(() => {
        if (code !== "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [code, warningSendCode]);

    useEffect(() => {
        if (timeSendCode > 0) {
            let time = setInterval(() => {
                setTimeSendCode((prev) => prev - 1);
                setContentBtn(`Gửi Lại Sau ${timeSendCode}`);
            }, 1000);
            return () => clearInterval(time);
        } else {
            setContentBtn("Gửi Mã");
        }
    }, [timeSendCode]);

    const fetchAPIRegister = async () => {
        console.log({ textUsername, textEmail, textPassword });
        const resultRegister = await register(
            textUsername,
            textEmail,
            textPassword
        );
        if (resultRegister.accessToken) {
            localStorage.setItem("authorization", resultRegister.accessToken);

            navigate("/");
            window.location.reload();
        }
    };

    const handleOnsubmit = (e) => {
        e.preventDefault();
        setLoading(false);
        const fetchAPI = async () => {
            const resultValue = await checkCode(textEmail, code);
            // console.log(resultValue);
            if (resultValue.message === "Successful") {
                // Sử dụng "message" thay vì "massage"
                await fetchAPIRegister();
            } else {
                setWarningSendCode(resultValue.message); // Sử dụng "message" thay vì "massage"
            }
        };
        fetchAPI();
    };

    const handleOnSendCode = () => {
        if (timeSendCode === 0) {
            setTimeSendCode(60);
            const fetchAPI = async () => {
                const result = await sendCode(textEmail);
                if (!result.status) {
                    setWarningSendCode("Lỗi Gửi Mã Xác nhận");
                }
            };
            fetchAPI();
        }
    };
    const handleOnBack = () => {
        handleIsNext(!isNext);
    };
    return (
        <div className={cx("wrapper-next")}>
            <div className={cx("wrapper-back")}>
                <Button
                    small
                    border
                    submit
                    className={cx("back")}
                    onClick={handleOnBack}
                >
                    Trở Lại
                </Button>
            </div>
            <div className={cx("from-input", "from-send")}>
                <label htmlFor="code" className={cx("label-input")}>
                    Nhập Xác Thực
                </label>
                <div className={cx("wrapper-input")}>
                    <input
                        type="text"
                        id="code"
                        maxLength="6"
                        className={cx("input")}
                        autoComplete="off"
                        placeholder="Nhập Mã Xác Thực"
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <Button
                        className={cx("sendingCode")}
                        disabled={timeSendCode !== 0}
                        onClick={handleOnSendCode}
                    >
                        {contentBtn}
                    </Button>
                </div>
                <span
                    className={cx("placeholder")}
                    hidden={warningSendCode === ""}
                >
                    {warningSendCode}
                </span>
            </div>
            <div className={cx("wrapper-btn")}>
                <Button
                    submit
                    large
                    disabled={disabled}
                    onClick={(e) => handleOnsubmit(e)}
                    loading
                    leftIcon={<AiOutlineLoading3Quarters />}
                    hidden={loading}
                >
                    Send
                </Button>
            </div>
        </div>
    );
}

export default Code;
