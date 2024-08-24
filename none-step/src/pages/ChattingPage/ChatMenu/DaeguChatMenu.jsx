import daeguMetroIcon from "@assets/icons/daegu-transp-corp-logo.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedCategory } from "@store/slices/categorySlice";

const DaeguChatMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickMenu = (line, region) => {
        navigate("/chat/daegu");
        dispatch(selectedCategory({ category: line, region: region }));
    };

    return (
        <>
            <li
                className="daegu"
                onClick={() => handleClickMenu("daegu", "daegu")}
            >
                <span>전체</span>
            </li>
            <li
                className="line1"
                onClick={() => handleClickMenu("line1", "daegu")}
            >
                <span className="daegu_line1">1</span>
                <span>1호선</span>
            </li>
            <li
                className="line2"
                onClick={() => handleClickMenu("line2", "daegu")}
            >
                <span className="daegu_line2">2</span>
                <span>2호선</span>
            </li>
            <li
                className="line3"
                onClick={() => handleClickMenu("line3", "daegu")}
            >
                <span className="daegu_line3">3</span>
                <span>3호선</span>
            </li>
            <img src={daeguMetroIcon} alt="daegu-metro-icon" />
        </>
    );
};

export default DaeguChatMenu;
