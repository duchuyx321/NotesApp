import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "~/components/Button/Button.module.scss";

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    deleteBtn = false,
    createBtn = false,
    text = false,
    disabled = false,
    small = false,
    large = false,
    border = false,
    primary = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Cop = "button";
    const props = {
        onClick,
        ...passProps,
    };
    if (to) {
        props.to = to;
        Cop = Link;
    } else if (href) {
        props.href = href;
        Cop = "a";
    }

    const classes = cx("wrapper", {
        [className]: className,
        deleteBtn,
        createBtn,
        primary,
        text,
        disabled,
        border,
        large,
        small,
    });
    return (
        <Cop className={classes} {...props}>
            {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
            <span className={cx("title")}>{children}</span>
            {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
        </Cop>
    );
}

export default Button;
