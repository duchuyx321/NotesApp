/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightFromBracket,
    faPlus,
    faTrash,
    faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import "tippy.js/dist/tippy.css";

import styles from "~/layouts/components/Header/Header.module.scss";
import Search from "~/layouts/components/Search";
import Button from "~/components/Button";
import { useContexts } from "~/hooks/useContext";
import { logout } from "~/service/authService";
import Image from "~/components/Image";
import { user } from "~/service/userService";

const cx = classNames.bind(styles);

const MenuAuth = [
    {
        content: "Thùng Rác",
        countRestore: true,
        icon: <FontAwesomeIcon icon={faTrash} />,
        router: "/restore",
        key: "trash",
    },
    {
        content: "Xóa Tài khoản",
        icon: <FontAwesomeIcon icon={faUserSlash} />,
        key: "deleteAuth",
    },
    {
        content: "Logout",
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        key: "logout",
    },
];

function Header() {
    const [token, setToken] = useState(false);
    const [eventClick, setEventClick] = useState("");
    const [valueResult, setValueResult] = useState([]);
    const { isHidden, handleHiddenLogin } = useContexts();

    useEffect(() => {
        if (localStorage.getItem("authorization")) {
            setToken(true);
            const fetchAPI = async () => {
                const result = await user();
                setValueResult(result);
            };
            fetchAPI();
        }
    }, [token]);

    const handleOnchange = (e) => {
        setEventClick(e);
    };
    const fetchAPILogout = async () => {
        const result = await logout();
        return result;
    };
    useEffect(() => {
        const handleEvent = async () => {
            if (eventClick === "deleteAuth") {
                console.log("Xóa tài khoản");
            } else if (eventClick === "logout") {
                console.log("Đăng xuất");
                const result = await fetchAPILogout();
                if (result.status === 200) {
                    localStorage.removeItem("authorization");
                    window.location.reload();
                }
            }
        };
        handleEvent();
    }, [eventClick]);

    const renderResult = (attrs) => (
        <div className={cx("box")} tabIndex="-1" {...attrs}>
            {MenuAuth.map((item) => (
                <Button
                    text
                    small
                    to={item.router ? item.router : null}
                    key={item.key}
                    countRestore={
                        item.countRestore ? valueResult.countRestoreNotes : null
                    }
                    rightIcon={item.icon}
                    className={cx("box-inner")}
                    onClick={!item.router && (() => handleOnchange(item.key))}
                >
                    {item.content}
                </Button>
            ))}
        </div>
    );

    const handleOnclick = () => {
        handleHiddenLogin(!isHidden);
    };
    return (
        <div className={cx("wrapper")}>
            <Link to="/" className={cx("wrapper-logo")}>
                <img
                    src="https://res.cloudinary.com/dglgdtov0/image/upload/v1720429258/logo_1_urfref.png"
                    alt="Logo"
                    className={cx("logo")}
                />
            </Link>
            <Search />

            {/* Container */}
            {token ? (
                <div className={cx("container")}>
                    <Button
                        text
                        border
                        to="/upload"
                        className={cx("upload")}
                        rightIcon={<FontAwesomeIcon icon={faPlus} />}
                    >
                        Tạo Notes
                    </Button>

                    <Tippy
                        placement="bottom-start"
                        interactive
                        render={renderResult}
                    >
                        <div className={cx("wrapper-avatar")}>
                            <Image
                                src={valueResult?.user?.image}
                                alt="avatar"
                                className={cx("avatar")}
                            />
                        </div>
                    </Tippy>
                </div>
            ) : (
                <Button border primary onClick={handleOnclick}>
                    Đăng nhập
                </Button>
            )}
        </div>
    );
}

export default Header;
