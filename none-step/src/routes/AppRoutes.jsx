import { Route, Router, Routes } from "react-router-dom";
import Login from "../pages/Login";
import TermsOfService from "../components/TermsOfService";

function AppRoutes() {
    return (
        <Routes>
            <Route index element={<TermsOfService />}/>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default AppRoutes;
