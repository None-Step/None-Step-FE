import {
    ChatCategoryContainer,
    ChatCategoryWrapper,
    ChattingContainer,
    ChattingInput,
    ChattingInputContainer,
    ChattingWrapper,
    MessageSendBtn,
} from "./Chatting.styles";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CapitalCategory from "./ChatCategory/CapitalCategory";
import BusanCategory from "./ChatCategory/BusanCategory";
import DaejeonCategory from "./ChatCategory/DaejeonCategory";
import DaeguCategory from "./ChatCategory/DaeguCategory";
import GwangjuCategory from "./ChatCategory/GwangjuCategory";
import { TbSend } from "react-icons/tb";
import { useSelector } from "react-redux";

const Chatting = () => {
    const scrollRef = useRef(null);

    const [region, setRegion] = useState("");
    const [message, setMessage] = useState("");
    const [selected, setSelected] = useState("");

    const category = useSelector((state) => state.category.value);

    useEffect(() => {
        setSelected(category.category);
    }, [category.category]);

    const location = useLocation();

    const Category = {
        capital: <CapitalCategory />,
        busan: <BusanCategory />,
        daejeon: <DaejeonCategory />,
        daegu: <DaeguCategory />,
        gwangju: <GwangjuCategory />,
    };

    useEffect(() => {
        setRegion(location.pathname.split("/")[2]);
    }, [location.pathname]);

    const handleScrollCategory = () => {
        const el = scrollRef.current;
        if (el) {
            const onWheel = (e) => {
                if (e.deltaY === 0) return;
                e.preventDefault();
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY * 5,
                    behavior: "smooth",
                });
            };
            el.addEventListener("wheel", onWheel);
            return () => el.removeEventListener("wheel", onWheel);
        }
    };

    const handleMessage = (e) => {
        setMessage(e.target.value);
    };

    return (
        <>
            <ChattingWrapper>
                <ChatCategoryWrapper>
                    <ChatCategoryContainer
                        ref={scrollRef}
                        onWheel={handleScrollCategory}
                    >
                        {Category[region]}
                    </ChatCategoryContainer>
                </ChatCategoryWrapper>
                {selected === "capital" ||
                selected === "busan" ||
                selected === "daejeon" ||
                selected === "daegu" ||
                selected === "gwangju" ? (
                    <></>
                ) : (
                    <ChattingContainer>
                        <ChattingInputContainer>
                            <ChattingInput
                                type="type"
                                id="chat"
                                label="채팅"
                                value={message}
                                placeholder="메시지를 입력해주세요"
                                onChange={(e) => handleMessage(e)}
                            />
                            <MessageSendBtn>
                                <TbSend />
                            </MessageSendBtn>
                        </ChattingInputContainer>
                    </ChattingContainer>
                )}
            </ChattingWrapper>
        </>
    );
};

export default Chatting;
