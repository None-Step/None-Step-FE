import gwangjuMetroIcon from "@assets/icons/gwangju-transp-corp-logo.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedCategory } from "@store/slices/categorySlice";

const GwangjuChatMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickMenu = (line) => {
        navigate("/chat/gwangju");
        dispatch(selectedCategory({ category: line }));
    };

    return (
        <>
            <li className="gwangju" onClick={() => handleClickMenu("gwangju")}>
                <span>전체</span>
            </li>
            <li className="line1" onClick={() => handleClickMenu("line1")}>
                <span className="gwangju_line1">1</span>
                <span>1호선</span>
            </li>
            <img src={gwangjuMetroIcon} alt="gwangju-metro-icon" />
        </>
    );
};

export default GwangjuChatMenu;
