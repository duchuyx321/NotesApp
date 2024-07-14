import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import style from "~/pages/Home/Home.module.scss";

import { home } from "~/service/homeService";

const cx = classNames.bind(style);
function Home() {
    const [token, setToken] = useState(localStorage.getItem("authorization"));
    const [valueResult, setValueResult] = useState([]);
    useEffect(() => {
        if (localStorage.getItem("authorization")) {
            const accessToken = localStorage.getItem("authorization");
            setToken(accessToken);
            const fetchAPI = async () => {
                const result = await home();
                setValueResult(result);
            };
            fetchAPI();
        }
    }, [token]);
    return (
        <div className={cx("wrapper")}>
            {!token ? (
                <div className={cx("wrapper-NoLogin")}></div>
            ) : valueResult.length === 0 ? (
                <div className={cx("wrapper-image")}></div>
            ) : (
                <div className={cx("container")}>
                    <div className={cx("content")}>
                        {valueResult.map((item) => (
                            <div className={cx("inner")} key={item._id}>
                                <h4 className={cx("title")}>{item.title}</h4>
                                <p className={cx("note")}>{item.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
