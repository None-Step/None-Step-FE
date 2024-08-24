import gwangjuMetroIcon from "@assets/icons/gwangju-transp-corp-logo.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedCategory } from "@store/slices/categorySlice";

const GwangjuChatMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickMenu = (line, region) => {
        navigate("/chat/gwangju");
        dispatch(selectedCategory({ category: line, region: region }));
    };

    return (
        <>
            <li
                className="gwangju"
                onClick={() => handleClickMenu("gwangju", "gwangju")}
            >
                <span>전체</span>
            </li>
            <li
                className="line1"
                onClick={() => handleClickMenu("line1", "gwangju")}
            >
                <span className="gwangju_line1">1</span>
                <span>1호선</span>
            </li>
            <img src={gwangjuMetroIcon} alt="gwangju-metro-icon" />
        </>
    );
};

export default GwangjuChatMenu;
