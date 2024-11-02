import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedCategory } from "@store/slices/categorySlice";
import { useEffect, useState } from "react";
import axiosInstance from "@apis/axiosInstance";

const CapitalChatMenu = () => {
    const [chatTimes, setChatTimes] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get(`/nonestep/chat/list?region=seoul`)
            .then((response) => {
                setChatTimes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const chattingDate = (lineValue) => {
        const chatDate = chatTimes.find((data) => data.line === lineValue);

        if (!chatDate) return;

        const pastDate = new Date(chatDate.date);
        pastDate.setHours(pastDate.getHours() + 9);

        const now = Date.now();
        const milliseconds = now - pastDate.getTime();
        const minutes = Math.floor(milliseconds / 1000 / 60);

        if (minutes < 1) {
            return "방금 전";
        } else if (minutes < 60) {
            return `${minutes}분 전`;
        } else if (minutes < 1440) {
            const hours = Math.floor(minutes / 60);

            return `${hours}시간 전`;
        } else {
            const days = Math.floor(minutes / 1440);

            if (days < 30) {
                return `${days}일 전`;
            } else {
                const month = Math.floor(days / 30);

                return `${month}달 전`;
            }
        }
    };

    const handleClickMenu = (line, region) => {
        navigate("/chat/capital");
        dispatch(selectedCategory({ category: line, region: region }));
    };

    return (
        <>
            <li
                className="capital"
                onClick={() => handleClickMenu("seoul", "seoul")}
            >
                <span>전체</span>
            </li>
            <li
                className="line1"
                onClick={() => handleClickMenu("line1", "seoul")}
            >
                <span className="capital_line1">1</span>
                <span>1호선</span>
                <span className="chatting_time">{chattingDate("line1")}</span>
            </li>
            <li
                className="line2"
                onClick={() => handleClickMenu("line2", "seoul")}
            >
                <span className="capital_line2">2</span>
                <span>2호선</span>
                <span className="chatting_time">{chattingDate("line2")}</span>
            </li>
            <li
                className="line3"
                onClick={() => handleClickMenu("line3", "seoul")}
            >
                <span className="capital_line3">3</span>
                <span>3호선</span>
                <span className="chatting_time">{chattingDate("line3")}</span>
            </li>
            <li
                className="line4"
                onClick={() => handleClickMenu("line4", "seoul")}
            >
                <span className="capital_line4">4</span>
                <span>4호선</span>
                <span className="chatting_time">{chattingDate("line4")}</span>
            </li>
            <li
                className="line5"
                onClick={() => handleClickMenu("line5", "seoul")}
            >
                <span className="capital_line5">5</span>
                <span>5호선</span>
                <span className="chatting_time">{chattingDate("line5")}</span>
            </li>
            <li
                className="line6"
                onClick={() => handleClickMenu("line6", "seoul")}
            >
                <span className="capital_line6">6</span>
                <span>6호선</span>
                <span className="chatting_time">{chattingDate("line6")}</span>
            </li>
            <li
                className="line7"
                onClick={() => handleClickMenu("line7", "seoul")}
            >
                <span className="capital_line7">7</span>
                <span>7호선</span>
                <span className="chatting_time">{chattingDate("line7")}</span>
            </li>
            <li
                className="line8"
                onClick={() => handleClickMenu("line8", "seoul")}
            >
                <span className="capital_line8">8</span>
                <span>8호선</span>
                <span className="chatting_time">{chattingDate("line8")}</span>
            </li>
            <li
                className="line9"
                onClick={() => handleClickMenu("line9", "seoul")}
            >
                <span className="capital_line9">9</span>
                <span>9호선</span>
                <span className="chatting_time">{chattingDate("line9")}</span>
            </li>
            <li
                className="airport"
                onClick={() => handleClickMenu("gongHangCheolDo", "seoul")}
            >
                <span className="capital_airport">공항</span>
                <span>공항철도</span>
                <span className="chatting_time">
                    {chattingDate("gongHangCheolDo")}
                </span>
            </li>
            <li
                className="gyeonguijungang"
                onClick={() => handleClickMenu("gyeongUiJungAngLine", "seoul")}
            >
                <span className="capital_gyeongui">경의중앙</span>
                <span>경의중앙선</span>
                <span className="chatting_time">
                    {chattingDate("gyeongUiJungAngLine")}
                </span>
            </li>
            <li
                className="gyeongchun"
                onClick={() => handleClickMenu("gyeongChunLine", "seoul")}
            >
                <span className="capital_gyeongchun">경춘</span>
                <span>경춘선</span>
                <span className="chatting_time">
                    {chattingDate("gyeongChunLine")}
                </span>
            </li>
            <li
                className="suinbundang"
                onClick={() => handleClickMenu("suInBunDangLine", "seoul")}
            >
                <span className="capital_suin">수인분당</span>
                <span>수인분당선</span>
                <span className="chatting_time">
                    {chattingDate("suInBunDangLine")}
                </span>
            </li>
            <li
                className="shinbundang"
                onClick={() => handleClickMenu("shinBunDangLine", "seoul")}
            >
                <span className="capital_shinbundang">신분당</span>
                <span>신분당선</span>
                <span className="chatting_time">
                    {chattingDate("shinBunDangLine")}
                </span>
            </li>
            <li
                className="gyeonggang"
                onClick={() => handleClickMenu("gyeongGangLine", "seoul")}
            >
                <span className="capital_gyeonggang">경강</span>
                <span>경강선</span>
                <span className="chatting_time">
                    {chattingDate("gyeongGangLine")}
                </span>
            </li>
            <li
                className="seohae"
                onClick={() => handleClickMenu("seoHaeLine", "seoul")}
            >
                <span className="capital_seohae">서해</span>
                <span>서해선</span>
                <span className="chatting_time">
                    {chattingDate("seoHaeLine")}
                </span>
            </li>
            <li
                className="incheon1"
                onClick={() => handleClickMenu("inCheonLine1", "seoul")}
            >
                <span className="capital_incheon1">인천1</span>
                <span>인천1호선</span>
                <span className="chatting_time">
                    {chattingDate("inCheonLine1")}
                </span>
            </li>
            <li
                className="incheon2"
                onClick={() => handleClickMenu("inCheonLine2", "seoul")}
            >
                <span className="capital_incheon2">인천2</span>
                <span>인천2호선</span>
                <span className="chatting_time">
                    {chattingDate("inCheonLine2")}
                </span>
            </li>
            <li
                className="everline"
                onClick={() => handleClickMenu("everLine", "seoul")}
            >
                <span className="capital_ever">에버라인</span>
                <span>에버라인</span>
                <span className="chatting_time">
                    {chattingDate("everLine")}
                </span>
            </li>
            <li
                className="uijeongbu"
                onClick={() => handleClickMenu("uiJeongBu", "seoul")}
            >
                <span className="capital_uijeongbu">의정부</span>
                <span>의정부경전철</span>
                <span className="chatting_time">
                    {chattingDate("gongHangCheolDo")}
                </span>
            </li>
            <li
                className="wooyishinseol"
                onClick={() => handleClickMenu("uiSinSeolLine", "seoul")}
            >
                <span className="capital_wooyi">우이신설</span>
                <span>우이신설선</span>
                <span className="chatting_time">
                    {chattingDate("uiSinSeolLine")}
                </span>
            </li>
            <li
                className="gimpogold"
                onClick={() => handleClickMenu("gimPoGoldLine", "seoul")}
            >
                <span className="capital_gimpo">김포골드</span>
                <span>김포골드라인</span>
                <span className="chatting_time">
                    {chattingDate("gimPoGoldLine")}
                </span>
            </li>
            <li
                className="sillim"
                onClick={() => handleClickMenu("silLimLine", "seoul")}
            >
                <span className="capital_sillim">신림</span>
                <span>신림선</span>
                <span className="chatting_time">
                    {chattingDate("silLimLine")}
                </span>
            </li>
            <li
                className="GTX_A"
                onClick={() => handleClickMenu("gtxA", "seoul")}
            >
                <span className="capital_GTX_A">GTX-A</span>
                <span>GTX-A</span>
                <span className="chatting_time">{chattingDate("gtxA")}</span>
            </li>
        </>
    );
};

export default CapitalChatMenu;
