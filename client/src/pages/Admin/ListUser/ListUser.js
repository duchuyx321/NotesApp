import classNames from "classnames/bind";

import styles from "./ListUser.module.scss";

const cx = classNames.bind(styles);

function ListUser() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("wrapper-title")}>
                <h1 className={cx("title")}>Danh Sách Người Dùng </h1>
                <span className={cx("totalUser")}>(50)</span>
            </div>
            <div className={cx("container")}>
                <table className={cx("table")}>
                    <thead>
                        <tr className={cx("table-title")}>
                            <th scope="col">STT</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">provider</th>
                            <th scope="col">Ngày Khởi Tạo</th>
                            <th scope="col">Số Lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={cx("table-content")}>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>Otto</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListUser;
