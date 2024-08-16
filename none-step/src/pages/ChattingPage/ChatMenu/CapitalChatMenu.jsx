import seoulMetroIcon from "@assets/icons/seoul-metro-logo.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedCategory } from "@store/slices/categorySlice";

const CapitalChatMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickMenu = (line) => {
        navigate("/chat/capital");
        dispatch(selectedCategory({ category: line }));
    };

    return (
        <>
            <li className="capital" onClick={() => handleClickMenu("capital")}>
                <span>전체</span>
            </li>
            <li className="line1" onClick={() => handleClickMenu("line1")}>
                <span className="capital_line1">1</span>
                <span>1호선</span>
            </li>
            <li className="line2" onClick={() => handleClickMenu("line2")}>
                <span className="capital_line2">2</span>
                <span>2호선</span>
            </li>
            <li className="line3" onClick={() => handleClickMenu("line3")}>
                <span className="capital_line3">3</span>
                <span>3호선</span>
            </li>
            <li className="line4" onClick={() => handleClickMenu("line4")}>
                <span className="capital_line4">4</span>
                <span>4호선</span>
            </li>
            <li className="line5" onClick={() => handleClickMenu("line5")}>
                <span className="capital_line5">5</span>
                <span>5호선</span>
            </li>
            <li className="line6" onClick={() => handleClickMenu("line6")}>
                <span className="capital_line6">6</span>
                <span>6호선</span>
            </li>
            <li className="line7" onClick={() => handleClickMenu("line7")}>
                <span className="capital_line7">7</span>
                <span>7호선</span>
            </li>
            <li className="line8" onClick={() => handleClickMenu("line8")}>
                <span className="capital_line8">8</span>
                <span>8호선</span>
            </li>
            <li className="line9" onClick={() => handleClickMenu("line9")}>
                <span className="capital_line9">9</span>
                <span>9호선</span>
            </li>
            <li className="airport" onClick={() => handleClickMenu("airport")}>
                <span className="capital_airport">공항</span>
                <span>공항철도</span>
            </li>
            <li
                className="gyeonguijungang"
                onClick={() => handleClickMenu("gyeonguijungang")}
            >
                <span className="capital_gyeongui">경의중앙</span>
                <span>경의중앙선</span>
            </li>
            <li
                className="gyeongchun"
                onClick={() => handleClickMenu("gyeongchun")}
            >
                <span className="capital_gyeongchun">경춘</span>
                <span>경춘선</span>
            </li>
            <li
                className="suinbundang"
                onClick={() => handleClickMenu("suinbundang")}
            >
                <span className="capital_suin">수인분당</span>
                <span>수인분당선</span>
            </li>
            <li
                className="shinbundang"
                onClick={() => handleClickMenu("shinbundang")}
            >
                <span className="capital_shinbundang">신분당</span>
                <span>신분당선</span>
            </li>
            <li
                className="gyeonggang"
                onClick={() => handleClickMenu("gyeonggang")}
            >
                <span className="capital_gyeonggang">경강</span>
                <span>경강선</span>
            </li>
            <li className="seohae" onClick={() => handleClickMenu("seohae")}>
                <span className="capital_seohae">서해</span>
                <span>서해선</span>
            </li>
            <li
                className="incheon1"
                onClick={() => handleClickMenu("incheon1")}
            >
                <span className="capital_incheon1">인천1</span>
                <span>인천1호선</span>
            </li>
            <li
                className="incheon2"
                onClick={() => handleClickMenu("incheon2")}
            >
                <span className="capital_incheon2">인천2</span>
                <span>인천2호선</span>
            </li>
            <li
                className="everline"
                onClick={() => handleClickMenu("everline")}
            >
                <span className="capital_ever">에버라인</span>
                <span>에버라인</span>
            </li>
            <li
                className="uijeongbu"
                onClick={() => handleClickMenu("uijeongbu")}
            >
                <span className="capital_uijeongbu">의정부</span>
                <span>의정부경전철</span>
            </li>
            <li
                className="wooyishinseol"
                onClick={() => handleClickMenu("wooyishinseol")}
            >
                <span className="capital_wooyi">우이신설</span>
                <span>우이신설선</span>
            </li>
            <li
                className="gimpogold"
                onClick={() => handleClickMenu("gimpogold")}
            >
                <span className="capital_gimpo">김포골드</span>
                <span>김포골드라인</span>
            </li>
            <li className="sillim" onClick={() => handleClickMenu("sillim")}>
                <span className="capital_sillim">신림</span>
                <span>신림선</span>
            </li>
            <li className="GTX_A" onClick={() => handleClickMenu("GTX_A")}>
                <span className="capital_GTX_A">GTX-A</span>
                <span>GTX-A</span>
            </li>
            <img src={seoulMetroIcon} alt="seoul-metro-icon" />
        </>
    );
};

export default CapitalChatMenu;
