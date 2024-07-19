import classNames from "classnames/bind";
import React from "react";
import { Link } from "react-router-dom";

import styles from "~/components/Button/Button.module.scss";

const cx = classNames.bind(styles);

const Button = React.forwardRef(
    (
        {
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
            submit = false,
            loading = false,
            hidden = false,
            countRestore = null,
            id,
            children,
            className,
            leftIcon,
            rightIcon,
            onClick,
            ...passProps
        },
        ref
    ) => {
        let Cop = "button";
        const props = {
            onClick,
            ...passProps,
        };
        // Remove event listener when btn is disabled
        if (disabled) {
            Object.keys(props).forEach((key) => {
                if (key.startsWith("on") && typeof props[key] === "function") {
                    delete props[key];
                }
            });
        }
        if (to) {
            props.to = to;
            Cop = Link;
        } else if (href) {
            props.href = href;
            Cop = "a";
        }

        const classes = cx("wrapper", {
            [className]: className,
            [id]: id,
            deleteBtn,
            createBtn,
            primary,
            submit,
            text,
            disabled,
            border,
            large,
            small,
        });
        return (
            <Cop className={classes} {...props}>
                {leftIcon && (
                    <span
                        className={cx(
                            "icon",
                            loading ? "loading" : null,
                            hidden ? "hidden" : null
                        )}
                    >
                        {leftIcon}
                    </span>
                )}
                <span className={cx("title")}>
                    {countRestore ? (
                        <span className={cx("title-inner")}>
                            <span className={cx("children")}>{children}</span>
                            <span className={cx("countRestore")}>
                                ({countRestore})
                            </span>
                        </span>
                    ) : (
                        children
                    )}
                </span>
                {rightIcon && (
                    <span className={cx("iconRight")}>{rightIcon}</span>
                )}
            </Cop>
        );
    }
);

export default Button;
