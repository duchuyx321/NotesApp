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

const cx = classNames.bind(styles);

const MenuAuth = [
    {
        content: "Thùng Rác",
        icon: <FontAwesomeIcon icon={faTrash} />,
        router: "/",
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
    const [isHidden, handleHiddenLogin] = useContexts();

    useEffect(() => {
        if (localStorage.getItem("authorization")) {
            setToken(true);
        }
    }, [token]);

    const handleOnchange = (e) => {
        if (e === "deleteAuth") {
            console.log("Xóa tài khoản");
        } else if (e === "logout") {
            console.log("Đăng xuất");
        }
    };

    const renderResult = (attrs) => (
        <div className={cx("box")} tabIndex="-1" {...attrs}>
            {MenuAuth.map((item) => (
                <Button
                    text
                    small
                    to={item.router ? item.router : ""}
                    key={item.key}
                    rightIcon={item.icon}
                    className={cx("box-inner")}
                    onClick={() => handleOnchange(item.key)}
                >
                    {item.content}
                </Button>
            ))}
        </div>
    );

    const handleOnclick = () => {
        handleHiddenLogin(true);
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
                            <img
                                src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/1d9206ca61d04b830f4c7819744a02af.jpeg?lk3s=a5d48078&nonce=53415&refresh_token=fc1e45a14d5df0f869b3c16065cdef9e&x-expires=1720627200&x-signature=7acUbK%2Fwt4SeiJrtRqtiH9bZamg%3D&shp=a5d48078&shcp=81f88b70"
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
