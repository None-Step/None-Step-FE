import daejeonMetroIcon from "@assets/icons/daejeon-transp-corp-logo.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedCategory } from "@store/slices/categorySlice";
import { useEffect, useState } from "react";
import axiosInstance from "@apis/axiosInstance";

const DaejeonChatMenu = () => {
    const [chatTimes, setChatTimes] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickMenu = (line, region) => {
        navigate("/chat/daejeon");
        dispatch(selectedCategory({ category: line, region: region }));
    };

    useEffect(() => {
        axiosInstance
            .get(`/nonestep/chat/list?region=daejeon`)
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
                <span className="chatting_time">{chattingDate("line1")}</span>
            </li>
            <img src={daejeonMetroIcon} alt="daejeon-metro-icon" />
        </>
    );
};

export default DaejeonChatMenu;
