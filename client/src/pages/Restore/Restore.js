import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import styles from "./Restore.module.scss";
import { restoreNotes } from "~/service/NoteService";

const cx = classNames.bind(styles);

function Restore() {
    const [renderResult, setRenderResult] = useState([]);
    useEffect(() => {
        if (localStorage.getItem("authorization")) {
            const fetchAPI = async () => {
                const result = await restoreNotes();
                setRenderResult(result);
            };
            fetchAPI();
        }
    }, []);
    const newDate = (isoTime) => {
        const date = new Date(isoTime);
        // Định dạng thời gian
        const options = date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZone: "Asia/Ho_Chi_Minh", // Thay đổi múi giờ thành GMT+7
            timeZoneName: "short",
        });
        const formatter = new Intl.DateTimeFormat("vi-VN", options);
        const formattedDate = formatter.format(date);

        //giờ
        const [datePart, timePart] = options.split(", ");
        const [hour, minute, second] = timePart.split(":");
        const newHour = hour.split(" ")[2];
        const newSecond = second.split(" ")[1];

        console.log();
        return (
            <div className={cx("wrapper-time")}>
                <span
                    className={cx("time")}
                >{`${newHour}h${minute}-${newSecond}`}</span>
                <span className={cx("date")}>{formattedDate}</span>
            </div>
        );
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <table className={cx("table")}>
                    <thead>
                        <tr>
                            <th className={cx("table-stt")}>STT</th>
                            <th className={cx("table-title")}>title</th>
                            <th className={cx("table-content")}>Content</th>
                            <th className={cx("table-date")}>Ngày Xóa</th>
                            <th className={cx("table-btn")}>Tùy chỉnh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderResult.map((item, index) => (
                            <tr className={cx("table-tr")} key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{newDate(item.deletedAt)}</td>
                                <td className={cx("table-td-btn")}>
                                    <button className={cx("btn", "restore")}>
                                        Khôi Phục
                                    </button>
                                    <button className={cx("btn", "destroy")}>
                                        Xóa Vĩnh Viễn
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Restore;
