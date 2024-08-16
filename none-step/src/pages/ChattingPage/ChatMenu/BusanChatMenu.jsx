import busanMetroIcon from "@assets/icons/busan-transp-corp-logo.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedCategory } from "@store/slices/categorySlice";

const BusanChatMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickMenu = (line) => {
        navigate("/chat/busan");
        dispatch(selectedCategory({ category: line }));
    };

    return (
        <>
            <li className="busan" onClick={() => handleClickMenu("busan")}>
                <span>전체</span>
            </li>
            <li className="line1" onClick={() => handleClickMenu("line1")}>
                <span className="busan_line1">1</span>
                <span>1호선</span>
            </li>
            <li className="line2" onClick={() => handleClickMenu("line2")}>
                <span className="busan_line2">2</span>
                <span>2호선</span>
            </li>
            <li className="line3" onClick={() => handleClickMenu("line3")}>
                <span className="busan_line3">3</span>
                <span>3호선</span>
            </li>
            <li className="line4" onClick={() => handleClickMenu("line4")}>
                <span className="busan_line4">4</span>
                <span>4호선</span>
            </li>
            <li className="donghae" onClick={() => handleClickMenu("donghae")}>
                <span className="busan_donghae">동해</span>
                <span>동해선</span>
            </li>
            <li
                className="busan_gimhae"
                onClick={() => handleClickMenu("busan_gimhae")}
            >
                <span className="busan_gimhae">부산김해</span>
                <span>부산김해경전철</span>
            </li>
            <img src={busanMetroIcon} alt="busan-metro-icon" />
        </>
    );
};

export default BusanChatMenu;
