import daejeonMetroIcon from "@assets/icons/daejeon-transp-corp-logo.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedCategory } from "@store/slices/categorySlice";

const DaejeonChatMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickMenu = (line, region) => {
        navigate("/chat/daejeon");
        dispatch(selectedCategory({ category: line, region: region }));
    };

    return (
        <>
            <li
                className="daejeon"
                onClick={() => handleClickMenu("daejeon", "daejeon")}
            >
                <span>전체</span>
            </li>
            <li
                className="line1"
                onClick={() => handleClickMenu("line1", "daejeon")}
            >
                <span className="daejeon_line1">1</span>
                <span>1호선</span>
            </li>
            <img src={daejeonMetroIcon} alt="daejeon-metro-icon" />
        </>
    );
};

export default DaejeonChatMenu;
