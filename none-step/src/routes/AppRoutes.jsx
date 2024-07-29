import { Route, Router, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import TermsOfService from "../pages/SignUp/SignUp01/TermsOfService";
import SignUpForm from "../pages/SignUp/SignUp02/SignUpForm";
import FindID from "../pages/FindID";
import SignUpSuccess from "../pages/SignUp/SignUpSuccess";

function AppRoutes() {
    return (
        <Routes>
            <Route index element={<TermsOfService />}/>
            <Route path="/signUp" element={<SignUpForm />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/findID" element={<FindID />} />
            <Route path="/success" element={<SignUpSuccess />} />

        </Routes>
    );
}

export default AppRoutes;
