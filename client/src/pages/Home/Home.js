import classNames from "classnames/bind";

import style from "~/pages/Home/Home.module.scss";

const cx = classNames.bind(style);
function Home() {
    return (
        <div className={cx("wrapper")}>
            <h1>Home Pages</h1>
        </div>
    );
}

export default Home;
