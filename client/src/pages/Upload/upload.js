import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "~/pages/Upload/Upload.module.scss";
import Button from "~/components/Button";
import { create } from "~/service/NoteService";

const cx = classNames.bind(styles);

function Upload() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (title !== "" && content !== "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [content, title]);
    function handleOnSubmit(e) {
        e.preventDefault();
        const fetchAPI = async () => {
            const result = await create(title, content);
            console.log(result);
            navigate("/");
        };
        fetchAPI();
    }
    return (
        <div className={cx("wrapper")}>
            <form className={cx("container")} onSubmit={handleOnSubmit}>
                <div className={cx("wrapper-input")}>
                    <label htmlFor="title" className={cx("form-label")}>
                        Tiêu đề ghi chú
                    </label>
                    <input
                        type="text"
                        className={cx("input")}
                        id="title"
                        placeholder="nhập tiêu đề ghi chú vào đây....."
                        onChange={(e) => setTitle(e.target.value)}
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
                        placeholder="Nhập nội dung ghi chú vào đây....."
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <div className={cx("wrapper-button")}>
                    <Button
                        type="submit"
                        small
                        submit
                        disabled={disabled}
                        className={cx("submit")}
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Upload;
