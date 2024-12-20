import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedCategory } from "@store/slices/categorySlice";
import { useEffect, useState } from "react";
import axiosInstance from "@apis/axiosInstance";

const GwangjuChatMenu = () => {
    const [chatTimes, setChatTimes] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get(`/nonestep/chat/list?region=gwangju`)
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
                <span className="chatting_time">{chattingDate("line1")}</span>
            </li>
        </>
    );
};

export default GwangjuChatMenu;
