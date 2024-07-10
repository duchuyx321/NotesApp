import classNames from "classnames/bind";

import styles from "~/pages/Upload/Upload.module.scss";

const cx = classNames.bind(styles);

function Upload() {
    return (
        <div className={cx("wrapper")}>
            <h1>Upload Pages</h1>
        </div>
    );
}

export default Upload;
