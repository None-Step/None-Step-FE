import busanMetroIcon from "@assets/icons/busan-transp-corp-logo.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedCategory } from "@store/slices/categorySlice";
import { useEffect, useState } from "react";
import axiosInstance from "@apis/axiosInstance";

const BusanChatMenu = () => {
    const [chatTimes, setChatTimes] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get(`/nonestep/chat/list?region=busan`)
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
        navigate("/chat/busan");
        dispatch(selectedCategory({ category: line, region: region }));
    };

    return (
        <>
            <li
                className="busan"
                onClick={() => handleClickMenu("busan", "busan")}
            >
                <span>전체</span>
            </li>
            <li
                className="line1"
                onClick={() => handleClickMenu("line1", "busan")}
            >
                <span className="busan_line1">1</span>
                <span>1호선</span>
                <span className="chatting_time">{chattingDate("line1")}</span>
            </li>
            <li
                className="line2"
                onClick={() => handleClickMenu("line2", "busan")}
            >
                <span className="busan_line2">2</span>
                <span>2호선</span>
                <span className="chatting_time">{chattingDate("line2")}</span>
            </li>
            <li
                className="line3"
                onClick={() => handleClickMenu("line3", "busan")}
            >
                <span className="busan_line3">3</span>
                <span>3호선</span>
                <span className="chatting_time">{chattingDate("line3")}</span>
            </li>
            <li
                className="line4"
                onClick={() => handleClickMenu("line4", "busan")}
            >
                <span className="busan_line4">4</span>
                <span>4호선</span>
                <span className="chatting_time">{chattingDate("line4")}</span>
            </li>
            <li
                className="donghae"
                onClick={() => handleClickMenu("dongHaeLine", "busan")}
            >
                <span className="busan_donghae">동해</span>
                <span>동해선</span>
                <span className="chatting_time">
                    {chattingDate("dongHaeLine")}
                </span>
            </li>
            <li
                className="busan_gimhae"
                onClick={() => handleClickMenu("buSanGimHae", "busan")}
            >
                <span className="busan_gimhae">부산김해</span>
                <span>부산김해경전철</span>
                <span className="chatting_time">
                    {chattingDate("buSanGimHae")}
                </span>
            </li>
            <img src={busanMetroIcon} alt="busan-metro-icon" />
        </>
    );
};

export default BusanChatMenu;
