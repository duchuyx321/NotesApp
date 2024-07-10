import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";

import { useEffect, useState } from "react";

import styles from "~/layouts/components/Search/Search.module.scss";
import * as searchService from "~/service/searchService";
import Button from "~/components/Button";
import { useDebounce } from "~/hooks";

const cx = classNames.bind(styles);

function Search() {
    const [value, setValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const debouncedValue = useDebounce(value, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchAPI = async () => {
            const result = await searchService.search(debouncedValue);
            setSearchResult(Array.isArray(result) ? result : []);
            console.log(result);
        };
        fetchAPI();
    }, [debouncedValue]);

    const handleOnchange = (e) => {
        setValue(e.target.value);
    };
    return (
        <Tippy
            interactive
            visible={searchResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx("popper-wrapper")} tabIndex="-1" {...attrs}>
                    <h4 className={cx("result")}>Kết quả tìm kiếm</h4>
                    {searchResult.map((item) => (
                        <Button
                            key={item._id}
                            to={`/${item.slug}`}
                            className={cx("inner")}
                        >
                            <h5 className={cx("title")}>{item.title}</h5>
                            <p className={cx("content")}>{item.content}</p>
                        </Button>
                    ))}
                </div>
            )}
            appendTo={document.body}
        >
            <label className={cx("wrapper")} htmlFor="input">
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="Tìm Kiếm Notes"
                    className={cx("search")}
                    id="input"
                    onChange={(e) => handleOnchange(e)}
                />
            </label>
        </Tippy>
    );
}

export default Search;
