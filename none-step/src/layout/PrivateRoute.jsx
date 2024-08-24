import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
    const navigate = useNavigate();

    const member = useSelector((state) => state.member);

    useEffect(() => {
        if (!member.isAuthorized) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    );
};

export default PrivateRoute;
