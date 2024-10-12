import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
    const navigate = useNavigate();

    const member = useSelector((state) => state.member);

    useEffect(() => {
        if (member.memberID !== "admin") {
            navigate("/");
        }
    }, []);

    return (
        <>
            <Outlet />
        </>
    );
};

export default PrivateRoute;
