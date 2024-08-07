import classNames from "classnames/bind";
import { IoClose } from "react-icons/io5";

import styles from "./ModalAdmin.module.scss";

const cx = classNames.bind(styles);
const defaultFn = () => {};

const MENU_MODAL = {
    importModal: {
        content:
            "Nếu bạn muốn import thì Chúng tôi sẽ cung cập cho bạn một file excel để tránh bị nhập liệu sai!",
        titleBtn: "Next",
    },
};

function ModalAdmin({
    handleClose = defaultFn,
    importModal = false,
    exportModal = false,
}) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("modal")}>
                <div className={cx("modal-content")}>
                    <div className={cx("modal-header")}>
                        <h5 className={cx("modal-title")}>Chú ý</h5>
                        <button
                            type="button"
                            onClick={handleClose}
                            className={cx("btn-close")}
                        >
                            <IoClose />
                        </button>
                    </div>
                    <div className={cx("modal-body")}>
                        <p>{importModal && MENU_MODAL.importModal.content}</p>
                    </div>
                    <div className={cx("modal-footer")}>
                        <button
                            type="button"
                            className={cx("btn-primary", "close")}
                            onClick={handleClose}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className={cx("btn-primary", "save")}
                        >
                            {importModal && MENU_MODAL.importModal.titleBtn}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAdmin;
