import { Route, Routes } from "react-router-dom";
import MapPage from "@pages/MapPage/MapPage";
import MainPage from "@pages/MainPage/MainPage";
import Login from "@pages/Login/Login";
import TermsOfService from "@pages/SignUp/SignUp01/TermsOfService";
import SignUpForm from "@pages/SignUp/SignUp02/SignUpForm";
import FindID from "@pages/FindID/FindID";
import SignUpSuccess from "@pages/SignUp/SignUpSuccess";
import FindIDSuccess from "@pages/FindID/FindIDSuccess";
import FindPW from "@pages/FindPW/FindPW";
import FindWay from "@pages/FindWay/FindWay";
import FindPWResetting from "@pages/FindPW/FindPWResetting";
import FindPWSuccess from "@pages/FindPW/FindPWSuccess";
import KakaoCallback from "@pages/Login/KakaoCallback";
import NaverCallback from "@pages/Login/NaverCallback";
import MyPage from "@pages/MyPage/MyPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />

            <Route path="/findWay" element={<FindWay />} />

            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/signUp" element={<SignUpForm />} />
            <Route path="/signUpSuccess" element={<SignUpSuccess />} />

            <Route path="/login" element={<Login />} />
            <Route
                path="/nonestep/member/login/callback/kakao"
                element={<KakaoCallback />}
            />
            <Route
                path="/nonestep/member/login/callback/naver"
                element={<NaverCallback />}
            />

            <Route path="/findID" element={<FindID />} />
            <Route path="/findIDSuccess" element={<FindIDSuccess />} />

            <Route path="/findPW" element={<FindPW />} />
            <Route path="/findPWResetting" element={<FindPWResetting />} />
            <Route path="/findPWSuccess" element={<FindPWSuccess />} />

            <Route path="/map" element={<MapPage />} />
            <Route path="/mypage" element={<MyPage />} />
        </Routes>
    );
};

export default AppRoutes;
