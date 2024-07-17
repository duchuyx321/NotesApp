/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import Button from "~/components/Button";
import style from "~/pages/Home/Home.module.scss";
import { home } from "~/service/homeService";
import { deleteNote } from "~/service/NoteService";

const cx = classNames.bind(style);
function Home() {
    const [token, setToken] = useState(localStorage.getItem("authorization"));
    const [valueResult, setValueResult] = useState([]);
    const [isSelectedAll, setIsSelectedAll] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

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

    useEffect(() => {
        if (isSubmit) {
            const fetchAPI = async () => {
                const result = await deleteNote(selectedIds);
                console.log(result);
            };
            fetchAPI();
        }
    }, [isSubmit]);

    console.log(valueResult);

    const handleOnChange = (id) => {
        let updateSelectedIds;

        if (!selectedIds.includes(id)) {
            updateSelectedIds = [...selectedIds, id];
        } else {
            updateSelectedIds = selectedIds.filter((noteId) => noteId !== id);
        }

        setSelectedIds(updateSelectedIds);

        setIsSelectedAll(updateSelectedIds.length === valueResult.length);
    };
    const handleOnCheckAll = () => {
        let checkedAll = !isSelectedAll;
        if (checkedAll) {
            valueResult.map((item) =>
                setSelectedIds((press) => [...press, item._id])
            );
        } else {
            setSelectedIds([]);
        }
        setIsSelectedAll(checkedAll);
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();

        setIsSubmit(true);
    };
    return (
        <div className={cx("wrapper")}>
            {!token ? (
                <div className={cx("wrapper-NoLogin")}></div>
            ) : valueResult.length === 0 ? (
                <div className={cx("wrapper-image")}></div>
            ) : (
                <div className={cx("container")}>
                    <div className={cx("container-box")}>
                        <span className={cx("container-box-btn")}>
                            <Button
                                deleteBtn
                                disabled={!selectedIds.length}
                                onClick={handleOnSubmit}
                            >
                                Delete
                            </Button>
                        </span>
                        <span className={cx("container-box-checkbox")}>
                            <input
                                type="checkbox"
                                className={cx("checkbox")}
                                id="checkbox"
                                checked={isSelectedAll}
                                onChange={() => handleOnCheckAll()}
                            />
                            <label htmlFor="checkbox">Chọn tất cả</label>
                        </span>
                    </div>
                    <div className={cx("content")}>
                        {valueResult.map((item) => (
                            <div className={cx("inner")} key={item._id}>
                                <span className={cx("inner-checkbox")}>
                                    <input
                                        className={cx("checkbox-item")}
                                        type="checkbox"
                                        checked={selectedIds.includes(item._id)}
                                        onChange={() =>
                                            handleOnChange(item._id)
                                        }
                                    />
                                </span>
                                <div className="wrapper-inner">
                                    <h4 className={cx("title")}>
                                        {item.title}
                                    </h4>
                                    <p className={cx("note")}>{item.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
