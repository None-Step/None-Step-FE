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
import NoticePage from "@pages/NoticePage/NoticePage";
import NoticeList from "@pages/NoticePage/NoticeList/NoticeList";
import NoticeDetail from "@pages/NoticePage/Detail/NoticeDetail";
import NoticeEditor from "@pages/NoticePage/Editor/NoticeEditor";
import PrivateRoute from "@layout/PrivateRoute";
import NoticeModify from "@pages/NoticePage/NoticeModify/NoticeModify";
import NoticeSearch from "@pages/NoticePage/Search/NoticeSearch";
import BookmarkMap from "@pages/MyPage/bookmark/BookmarkMap";
import BookmarkFindWay from "@pages/MyPage/bookmark/BookmarkFindWay";
import LicensePage from "@pages/LicensePage/LicensePage";

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

            <Route path="/notice" element={<NoticePage />}>
                <Route index element={<NoticeList />} />
                <Route path=":boardNo" element={<NoticeDetail />} />
                <Route path="search" element={<NoticeSearch />} />
                <Route element={<PrivateRoute />}>
                    <Route path="edit" element={<NoticeEditor />} />
                    <Route path="modify/:boardNo" element={<NoticeModify />} />
                </Route>
            </Route>

            <Route path="/mypage/bookmark/find" element={<BookmarkFindWay />} />
            <Route path="/mypage/bookmark/map" element={<BookmarkMap />} />

            <Route path="/license" element={<LicensePage />} />
        </Routes>
    );
};

export default AppRoutes;
