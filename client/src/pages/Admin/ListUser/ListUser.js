import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { CiExport } from "react-icons/ci";

import styles from "./ListUser.module.scss";
import { getUserData, ExportExcel } from "~/service/adminService";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function ListUser() {
    const [resultRender, setResultRender] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("authorization");
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.admin) {
                const fetchAPI = async () => {
                    const result = await getUserData();
                    setResultRender(result);
                };
                fetchAPI();
            }
        }
    }, []);
    const formatDay = (day) => {
        const newDay = dayjs(day).format("HH:mm:ss DD/MM/YYYY");
        return newDay;
    };
    const handleExport = async () => {
        const result = await ExportExcel();
        console.log(result);

        const url = window.URL.createObjectURL(result);
        const a = document.createElement("a");
        a.href = url;
        a.download = "user.notesapp.xlsx"; // Đặt tên file tải về
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // Dọn dẹp URL blob
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <h1 className={cx("title")}>Danh Sách Người Dùng </h1>
                <span className={cx("totalUser")}>({resultRender.length})</span>
            </div>
            <div className={cx("container")}>
                <table className={cx("table")}>
                    <thead>
                        <tr className={cx("table-title")}>
                            <th scope="col">STT</th>
                            <th scope="col">ID</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">provider</th>
                            <th scope="col">Ngày Khởi Tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultRender.map((item, index) => (
                            <tr key={item._id} className={cx("table-content")}>
                                <th scope="row">{index + 1}</th>
                                <td>{item._id}</td>
                                <td>
                                    {item.username ? item.username : item.name}
                                </td>
                                <td>{item.email}</td>
                                <td>
                                    {item.provider ? item.provider : "local"}
                                </td>
                                <td>{formatDay(item.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx("footer")}>
                <div className={cx("attention")}>
                    <h3 className={cx("attention-title")}>Chú ý</h3>
                    <p className={cx("attention-content")}>
                        Xuất file sẽ xuất ở dạng Excel (.XLSX)
                    </p>
                </div>
                <Button
                    className={cx("export")}
                    border
                    leftIcon={<CiExport />}
                    onClick={handleExport}
                >
                    Export
                </Button>
            </div>
        </div>
    );
}

export default ListUser;
