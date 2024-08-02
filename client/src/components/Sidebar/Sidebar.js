import classNames from "classnames/bind";
import { AiFillHome } from "react-icons/ai";
import { VscFeedback } from "react-icons/vsc";
import { MdDisplaySettings } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";

import styles from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

const MENU_LIST = [
    {
        name: "Trang Chủ",
        icon: <AiFillHome />,
        link: "/admin",
        key: "Home",
    },
    {
        name: "Danh Sách User",
        icon: <FaUserFriends />,
        link: "/admin/listUser",
        key: "List",
    },
    {
        name: "Quản Lý Notes",
        icon: <MdDisplaySettings />,
        link: "/admin/manageNotes",
        key: "Manage",
    },
    {
        name: "Phản Hồi Của Người Dùng",
        icon: <VscFeedback />,
        link: "/admin/feedback",
        key: "Feedback",
    },
    {
        name: "Cài Đặt Hệ Thống ",
        icon: <IoMdSettings />,
        link: "/admin/settings",
        key: "Settings",
    },
];
function Sidebar() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {MENU_LIST.map((item) => (
                    <NavLink
                        key={item.key}
                        className={(e) =>
                            cx("wrapperNav", { active: e.isActive })
                        }
                        to={item.link}
                        end={item.link === "/admin"}
                    >
                        <div className={cx("Nav-icon")}>{item.icon}</div>
                        <div className={cx("Nav-content")}>{item.name}</div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
