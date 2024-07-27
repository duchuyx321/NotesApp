import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoginGG } from "~/service/otherService";
function LoginSuccess() {
    const params = useParams().id;
    const navigate = useNavigate();
    const [hint, setHint] = useState("");
    console.log(params);
    useEffect(() => {
        const fetchAPI = async () => {
            const result = await LoginGG(params);
            if (result.accessToken) {
                setHint("Đăng nhập thành công");
                localStorage.setItem("authorization", result.accessToken);
                navigate("/", { replace: true });
                window.location.reload(); // Tải lại trang
            } else {
                setHint("Đăng nhập thất bại");
            }
        };
        fetchAPI();
    });
    return <div>{hint}</div>;
}

export default LoginSuccess;
