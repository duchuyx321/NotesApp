/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";

function HandleRegister() {
    const [disabled, setDisabled] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authenticationPassword, setAuthenticationPassword] = useState("");
    const [warningEmail, setWarningEmail] = useState("");
    const [warningPassword, setWarningPassword] = useState("");
    const [warningUsername, setWarningUsername] = useState("");
    const [warningAuthenticationPass, setWarningAuthenticationPass] =
        useState("");

    // Kiểm Tra Username
    useEffect(() => {
        // Kiểm tra các giá trị đầu vào không rỗng trước khi thực hiện kiểm tra chi tiết
        if (!username) {
            // Không kiểm tra nếu một trong các giá trị còn trống
            refreshWarning();
            return;
        }

        // Kiểm tra username
        if (username.length < 8) {
            refreshWarning();
            setWarningUsername("Username phải có ít nhất 8 ký tự!");
            return;
        }

        // Nếu tất cả điều kiện hợp lệ, bật nút và làm sạch các cảnh báo
        refreshWarning();
    }, [username]);

    // Kiểm tra email
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Kiểm tra các giá trị đầu vào không rỗng trước khi thực hiện kiểm tra chi tiết
        if (!email) {
            // Không kiểm tra nếu một trong các giá trị còn trống
            refreshWarning();
            return;
        }
        // Kiểm tra email
        if (!emailRegex.test(email)) {
            refreshWarning();
            setWarningEmail("Email không hợp lệ!");
            return;
        }

        // Nếu tất cả điều kiện hợp lệ, bật nút và làm sạch các cảnh báo
        refreshWarning();
    }, [email]);

    //Kiểm tra password
    useEffect(() => {
        const specialCharacters = /[!@#$%^&*)(+=._-]/;
        const passwordRegex = /^[A-Z]/;

        // Kiểm tra các giá trị đầu vào không rỗng trước khi thực hiện kiểm tra chi tiết
        if (!password) {
            // Không kiểm tra nếu một trong các giá trị còn trống
            refreshWarning();
            return;
        }

        // Kiểm tra password
        if (password.length < 8) {
            return setWarningPassword("Mật Khẩu phải có ít nhất 8 kí tự");
        } else {
            // Kiểm tra ký tự đầu tiên của mật khẩu có phải viết hoa không
            if (!passwordRegex.test(password[0])) {
                refreshWarning();
                setWarningPassword("Ký tự đầu tiên của mật khẩu phải viết hoa");
                return;
            }
            // Kiểm tra có ký tự đặc biệt không
            if (!specialCharacters.test(password)) {
                refreshWarning();
                setWarningPassword(
                    "Mật khẩu phải bao gồm ít nhất một ký tự đặc biệt"
                );
                return;
            }
        }

        // Nếu tất cả điều kiện hợp lệ, bật nút và làm sạch các cảnh báo
        refreshWarning();
    }, [password]);

    //Kiểm tra password authentication
    useEffect(() => {
        if (!authenticationPassword) {
            // Không kiểm tra nếu một trong các giá trị còn trống
            refreshWarning();
            return;
        }

        if (authenticationPassword !== password) {
            // Kiểm tra mật khẩu xác thực
            refreshWarning();
            setWarningAuthenticationPass("Mật khẩu không giống nhau");
            return;
        }
        // Nếu tất cả điều kiện hợp lệ, bật nút và làm sạch các cảnh báo
        refreshWarning();
    }, [authenticationPassword]);

    const refreshWarning = useCallback(() => {
        setWarningEmail("");
        setWarningPassword("");
        setWarningUsername("");
        setWarningAuthenticationPass("");
    }, []);

    useEffect(() => {
        if (
            email !== "" &&
            password !== "" &&
            username !== "" &&
            authenticationPassword !== "" &&
            warningUsername === "" &&
            warningPassword === "" &&
            warningEmail === "" &&
            warningAuthenticationPass === ""
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [
        authenticationPassword,
        email,
        password,
        username,
        warningAuthenticationPass,
        warningEmail,
        warningPassword,
        warningUsername,
    ]);
    return {
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
        authenticationPassword,
        warningEmail,
        warningUsername,
        warningPassword,
        warningAuthenticationPass,
        disabled,
    };
}

export default HandleRegister;
