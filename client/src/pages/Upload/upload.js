import classNames from "classnames/bind";

import styles from "~/pages/Upload/Upload.module.scss";
import Button from "~/components/Button";
import { refresh } from "~/service/authService";

const cx = classNames.bind(styles);

function Upload() {
    const handleOnSubmit = () => {
        const fetchAPI = async () => {
            const result = await refresh();
            console.log(result);
        };
        fetchAPI();
    };
    return (
        <div className={cx("wrapper")}>
            <form className={cx("container")}>
                <div className={cx("wrapper-input")}>
                    <label htmlFor="title" className={cx("form-label")}>
                        Tiêu đề ghi chú
                    </label>
                    <input
                        type="text"
                        className={cx("input")}
                        id="title"
                        placeholder="nhập tiêu đề ghi chú"
                    />
                </div>
                <div className={cx("wrapper-input")}>
                    <label htmlFor="content" className={cx("form-label")}>
                        Nội dung ghi chú
                    </label>
                    <textarea
                        className={cx("textarea")}
                        id="content"
                        rows={10}
                    ></textarea>
                </div>
                <div className={cx("wrapper-button")}>
                    <Button
                        type="button"
                        className={cx("submit")}
                        onClick={handleOnSubmit}
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Upload;
