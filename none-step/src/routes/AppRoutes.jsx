import { Route, Router, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import TermsOfService from "../pages/SignUp/SignUp01/TermsOfService";
import SignUpForm from "../pages/SignUp/SignUp02/SignUpForm";
import FindID from "../pages/FindID/FindID";
import SignUpSuccess from "../pages/SignUp/SignUpSuccess";
import FindIDSuccess from "../pages/FindID/FindIDSuccess";
import FindPW from "../pages/FindPW/FindPW";
import FindPWResetting from "../pages/FindPW/FindPWResetting";
import FindPWSuccess from "../pages/FindPW/FindPWSuccess";
import KakaoCallback from "../pages/Login/KakaoCallback";
import Main from "../pages/Main";
import NaverCallback from "../pages/Login/NaverCallback";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/terms" element={<TermsOfService />}/>
            <Route path="/signUp" element={<SignUpForm />}/>
            <Route path="/signUpSuccess" element={<SignUpSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/findID" element={<FindID />} />
            <Route path="/findIDSuccess" element={<FindIDSuccess />} />
            <Route path="/findPW" element={<FindPW />} />
            <Route path="/findPWResetting" element={<FindPWResetting />} />
            <Route path="/findPWSuccess" element={<FindPWSuccess />} />
            <Route path="/nonestep/member/login/callback/kakao" element={<KakaoCallback />} />
            <Route path="/nonestep/member/login/callback/naver" element={<NaverCallback />} />
        </Routes>
    );
}

export default AppRoutes;
