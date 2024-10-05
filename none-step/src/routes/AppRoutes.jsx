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
import FindWayNav from "@pages/FindWay/FindWayNav";
import FindPWResetting from "@pages/FindPW/FindPWResetting";
import FindPWSuccess from "@pages/FindPW/FindPWSuccess";
import KakaoCallback from "@pages/Login/KakaoCallback";
import NaverCallback from "@pages/Login/NaverCallback";
import MyPage from "@pages/MyPage/MyPage";
import ChattingMenu from "@pages/ChattingPage/ChattingMenu";
import ChattingPage from "@pages/ChattingPage/ChattingPage";
import PrivateRoute from "../layout/PrivateRoute";
import Bookmark from "@pages/MyPage/bookmark/Bookmark";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />

            <Route path="/findway" element={<FindWay />} />
            <Route path="/findway/navigate" element={<FindWayNav />} />

            <Route path="/signup/terms" element={<TermsOfService />} />
            <Route path="/signUp" element={<SignUpForm />} />
            <Route path="/signup/success" element={<SignUpSuccess />} />

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
            <Route path="/findid/success" element={<FindIDSuccess />} />

            <Route path="/findpw" element={<FindPW />} />
            <Route path="/findpw/resetting" element={<FindPWResetting />} />
            <Route path="/findpw/success" element={<FindPWSuccess />} />

            <Route path="/map" element={<MapPage />} />

            <Route path="/chat" element={<ChattingMenu />} />
            <Route path="/chat/:region" element={<ChattingPage />} />

            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/bookmark/find" element={<Bookmark />} />
        </Routes>
    );
};

export default AppRoutes;
