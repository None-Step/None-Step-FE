import daejeonMetroIcon from "@assets/icons/daejeon-transp-corp-logo.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedCategory } from "@store/slices/categorySlice";

const DaejeonChatMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickMenu = (line) => {
        navigate("/chat/daejeon");
        dispatch(selectedCategory({ category: line }));
    };

    return (
        <>
            <li className="daejeon" onClick={() => handleClickMenu("daejeon")}>
                <span>전체</span>
            </li>
            <li className="line1" onClick={() => handleClickMenu("line1")}>
                <span className="daejeon_line1">1</span>
                <span>1호선</span>
            </li>
            <img src={daejeonMetroIcon} alt="daejeon-metro-icon" />
        </>
    );
};

export default DaejeonChatMenu;
