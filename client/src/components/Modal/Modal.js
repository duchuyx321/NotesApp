import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import styles from "./Styles.module.scss";
import { useContexts } from "~/hooks/useContext";
import { deleteNote, restore } from "~/service/NoteService";
const cx = classNames.bind(styles);

const MENU_LIST = {
    delete: {
        content: "Bạn Có chắc muốn Xóa ?",
        btn_handle: "Xóa",
    },
    edit: {
        content: "Bạn có chắc muốn chỉnh sửa ?",
        btn_handle: "Chỉnh Sửa",
    },
    destroy: {
        content: "Bạn có chắc muốn xóa vĩnh viễn ?",
        btn_handle: "Xóa Vĩnh Viễn",
    },
    logout: {
        content: " Bạn có chắc muốn đăng xuất ?",
        btn_handle: "Đăng Xuất",
    },
    restore: {
        content: " Bạn có chắc muốn khôi phục lại ?",
        btn_handle: "Khôi Phục",
    },
};

function Module({
    deleted = false,
    edit = false,
    logout = false,
    destroy = false,
    restore = false,
    noteId = "",
}) {
    console.log(noteId);
    const { isClosed, handleIsClosed } = useContexts();
    const [isNotify, setIsNotify] = useState();
    const [notify, setNotify] = useState("");
    const navigate = useNavigate();

    const handleOnClose = () => {
        handleIsClosed(!isClosed);
    };
    const handleDelete = () => {
        const fetchDeleteAPI = async () => {
            if (noteId !== "") {
                const result = await deleteNote(noteId);
                if (result.message === "Delete successfully!") {
                    handleIsClosed(!isClosed);
                    navigate("/");
                }
            }
        };
        fetchDeleteAPI();
    };
    const handleUpdate = () => {};
    const handleDestroy = () => {};
    const handleRestore = () => {
        const fetchRestoreAPI = async () => {
            const result = await restore(noteId);
            if (result.message === "Restored successfully") {
                setNotify(result.message);
                setIsNotify(true);
                handleIsClosed(!isClosed);
            }
        };
        fetchRestoreAPI();
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("modal-header")}>
                    <h5 className={cx("title")}>Thông Báo!!</h5>
                    <button
                        className={cx("modal-header-btn")}
                        onClick={handleOnClose}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div className={cx("modal-content")}>
                    <p className={cx("content")}>
                        {deleted
                            ? MENU_LIST.delete.content
                            : edit
                            ? MENU_LIST.edit.content
                            : destroy
                            ? MENU_LIST.destroy.content
                            : logout
                            ? MENU_LIST.logout.content
                            : restore
                            ? MENU_LIST.restore.content
                            : "null"}
                    </p>
                </div>
                <div className={cx("modal-footer")}>
                    <button
                        className={cx("btn-handle", "close")}
                        onClick={handleOnClose}
                    >
                        Close
                    </button>
                    <button
                        className={cx(
                            "btn-handle",
                            deleted || destroy ? "delete" : "edit"
                        )}
                        onClick={
                            deleted
                                ? handleDelete
                                : edit
                                ? handleUpdate
                                : destroy
                                ? handleDestroy
                                : restore
                                ? handleRestore
                                : "null"
                        }
                    >
                        {deleted
                            ? MENU_LIST.delete.btn_handle
                            : edit
                            ? MENU_LIST.edit.btn_handle
                            : destroy
                            ? MENU_LIST.destroy.btn_handle
                            : logout
                            ? MENU_LIST.logout.btn_handle
                            : restore
                            ? MENU_LIST.restore.btn_handle
                            : "null"}
                    </button>
                </div>
            </div>
            {!isNotify && (
                <div className={cx("notify")}>
                    <div className={cx("notify-inner")}>
                        <div className={cx("notify-inner-content")}>
                            {/* {notify} */}
                            Restored successfully
                        </div>
                        <div className={cx("notify-inner-icon")}>
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Module;
