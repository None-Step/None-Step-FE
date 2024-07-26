import { Route, Router, Routes } from "react-router-dom";
import Login from "../pages/Login";
import TermsOfService from "../pages/TermsOfService";
import SignUpForm from "../pages/SignUpForm";
import MyPage from "../pages/MyPage";

function AppRoutes() {
    return (
        <Routes>
            <Route index element={<TermsOfService />}/>
            <Route path="/signUp" element={<SignUpForm />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<MyPage />} />
        </Routes>
    );
}

export default AppRoutes;
