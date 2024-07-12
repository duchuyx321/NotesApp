import classNames from "classnames/bind";

import styles from "~/layouts/DefaultLayout/DefaultLayout.module.scss";
import Header from "~/layouts/components/Header";
import { useContexts } from "~/hooks/useContext";
import Auth from "~/components/Auth";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [isHidden] = useContexts();

    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <div className={cx("content")}>
                    <div className={cx("inner")}>{children}</div>
                </div>
            </div>
            {isHidden ? <Auth /> : null}
        </div>
    );
}

export default DefaultLayout;
