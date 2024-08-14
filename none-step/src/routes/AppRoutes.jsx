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
import FindWayConfirm from "@pages/FindWay/FindWayConfirm";
import FindWayNav from "@pages/FindWay/FindWayNav";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />

            <Route path="/findWay" element={<FindWay />} />
            <Route path="/findWay/route" element={<FindWayConfirm />} />
            <Route path="/findWay/navigate" element={<FindWayNav />} />

            <Route path="/signUp/terms" element={<TermsOfService />}/>
            <Route path="/signUp" element={<SignUpForm />}/>
            <Route path="/signUp/success" element={<SignUpSuccess />} />

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
            <Route path="/findID/success" element={<FindIDSuccess />} />

            <Route path="/findPW" element={<FindPW />} />
            <Route path="/findPW/resetting" element={<FindPWResetting />} />
            <Route path="/findPW/success" element={<FindPWSuccess />} />

            <Route path="/map" element={<MapPage />} />
            <Route path="/mypage" element={<MyPage />} />
        </Routes>
    );
};

export default AppRoutes;
