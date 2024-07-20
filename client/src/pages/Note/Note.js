import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import style from "~/pages/Upload/Upload.module.scss";
import Button from "~/components/Button";
import { editNote, updateNote } from "~/service/NoteService";
import Modal from "~/components/Modal";
import { useContexts } from "~/hooks/useContext";

const cx = classNames.bind(style);

function Note() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [renderResult, setRenderResult] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [classed, setClassed] = useState(false);
    const { isClosed, handleIsClosed } = useContexts();

    const navigate = useNavigate();
    const params = useParams();
    const noteId = renderResult._id;
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await editNote(params.slug);
            setRenderResult(result);
        };
        fetchAPI();
    }, [params.slug]);

    useEffect(() => {
        if (title !== "" && content !== "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [content, title]);

    function handleOnSubmit(e) {
        e.preventDefault();
        const fetchAPI = async () => {
            const result = await updateNote(noteId, title, content);
            if (result.messages === "Update Success") {
                navigate("/");
            }
        };
        fetchAPI();
    }
    const handleOnEdit = () => {
        setClassed(true);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleOnDelete = () => {
        handleIsClosed(!isClosed);
        console.log(isClosed);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("wrapper-btn")}>
                <div className={cx("wrapper-back")}>
                    <Button to="/" border className={cx("btn-back")}>
                        Trở lại
                    </Button>
                </div>
                <div className={cx("btn-handle")}>
                    <Button className={cx("btn-edit")} onClick={handleOnEdit}>
                        Chỉnh sửa
                    </Button>
                    <Button
                        deleteBtn
                        className={cx("btn-delete")}
                        onClick={handleOnDelete}
                    >
                        Xóa
                    </Button>
                </div>
            </div>
            <form
                className={cx("container", classed ? "" : "opacity")}
                onSubmit={handleOnSubmit}
            >
                <div className={cx("wrapper-input")}>
                    <label htmlFor="title" className={cx("form-label")}>
                        Tiêu đề ghi chú
                    </label>
                    <input
                        ref={inputRef}
                        type="text"
                        defaultValue={renderResult.title}
                        className={cx("input")}
                        id="title"
                        placeholder="nhập tiêu đề ghi chú vào đây....."
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={cx("wrapper-input")}>
                    <label htmlFor="content" className={cx("form-label")}>
                        Nội dung ghi chú
                    </label>
                    <textarea
                        defaultValue={renderResult.content}
                        className={cx("textarea")}
                        id="content"
                        rows={10}
                        placeholder="Nhập nội dung ghi chú vào đây....."
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <div className={cx("wrapper-button")}>
                    <Button
                        type="submit"
                        small
                        submit
                        disabled={disabled}
                        className={cx("submit")}
                    >
                        Save
                    </Button>
                </div>
            </form>
            {isClosed ? <Modal deleted noteId={noteId} /> : null}
        </div>
    );
}

export default Note;
