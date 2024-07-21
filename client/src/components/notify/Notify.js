import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import styles from "./Notify.module.scss";

const cx = classNames.bind(styles);
function Notify() {
    return (
        <div className={cx("wrapper")}>
            {/* <div className={cx("notify")}>
                <div className={cx("notify-inner")}>
                    <div className={cx("notify-inner-content")}>{notify}</div>
                    <div className={cx("notify-inner-icon")}>
                        <FontAwesomeIcon icon={faCircleCheck} />
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default Notify;
