import classNames from "classnames/bind";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoCloseCircle } from "react-icons/io5";
import { useRef } from "react";

import styles from "./Import.module.scss";

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Import({ handleClose = defaultFn }) {
    const inputRef = useRef();
    const handleImportFile = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };
    const handleOnChangeImport = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];

            console.log(file);
        }
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <button className={cx("btn-close")} onClick={handleClose}>
                    <IoCloseCircle />
                </button>
                <div className={cx("inner")}>
                    <button
                        className={cx("uploading")}
                        htmlFor="inputUpload"
                        onClick={handleImportFile}
                    >
                        <div className={cx("icon-uploading")}>
                            <AiOutlineCloudUpload />
                            <div className={cx("title-uploading")}>
                                <h3>Select File To Upload</h3>
                                <p>Or drag and drop it here</p>
                            </div>
                        </div>
                        <div className={cx("btn-uploading")}>Select File</div>
                    </button>
                    <input
                        ref={inputRef}
                        type="file"
                        className={cx("input-uploading")}
                        id="inputUpload"
                        accept=".xlsx, .xls, .csv"
                        onChange={(e) => handleOnChangeImport(e)}
                    />
                </div>
                <div className={cx("note-uploading")}>
                    <h3 className={cx("title-note")}> Lưu ý</h3>
                    <p className={cx("content-note")}>
                        Chúng tôi vừa cung cập 1 file chứa from để tải lên lưu ý
                        và làm theo những gì chúng tôi vừa cung cấp nêu điền sai
                        dễ gây mất mát dữ liệu
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Import;
