import classNames from "classnames/bind";

import styles from "~/components/Auth/Register/Register.module.scss";

const cx = classNames.bind(styles);
function Register() {
    return (
        <div className={cx("wrapper")}>
            <h1>Register</h1>
        </div>
    );
}

export default Register;
