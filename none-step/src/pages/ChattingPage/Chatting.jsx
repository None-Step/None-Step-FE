import {
    ChatCategoryContainer,
    ChatCategoryWrapper,
    ChattingContainer,
    ChattingInput,
    ChattingInputContainer,
    ChattingMessageContainer,
    ChattingWrapper,
    MessageSendBtn,
    Modal,
    ModalContainer,
    MyChattingMessageContainer,
    ScrollBottomBtn,
    ScrollBottomBtnContainer,
    ScrollBottomBtnWrapper,
    ToastContainer,
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
import axiosInstance from "@apis/axiosInstance";
import userProfileImg from "@assets/img/profile-img.svg";
import { IoIosArrowDown } from "react-icons/io";
import { IoAlertCircleOutline, IoEllipsisVertical } from "react-icons/io5";
import { Client } from "@stomp/stompjs";
import _ from "lodash";

const Chatting = () => {
    const scrollRef = useRef(null);
    const chatScrollRef = useRef(null);
    const client = useRef(null);
    const modalRef = useRef(null);
    const toastRef = useRef(null);

    const [region, setRegion] = useState("");
    const [selected, setSelected] = useState("");
    const [chatting, setChatting] = useState([]);
    const [message, setMessage] = useState("");
    const [memberRandom, setMemberRandom] = useState("");
    const [memberNickName, setMemberNickName] = useState("");
    const [userMemberRandom, setUserMemberRandom] = useState("");
    const [userMemberNickName, setUserMemberNickName] = useState("");
    const [isScrollBottom, setIsScrollBottom] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copyMessage, setCopyMessage] = useState("");
    const [chatNumber, setChatNumber] = useState(0);
    const [selectedModal, setSelectedModal] = useState();

    const category = useSelector((state) => state.category.value);
    const member = useSelector((state) => state.member);

    const access = sessionStorage.getItem("accessToken");

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
        document.body.style.overflow = "auto";
    }, [location.pathname]);

    useEffect(() => {
        setSelected(category.category);
        setMemberRandom(member.memberRandom);
        setMemberNickName(member.memberNickName);
    }, [category.category, member.memberRandom, member.memberNickName]);

    const handleScrollCategory = () => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            const onWheel = (e) => {
                if (e.deltaY === 0) return;
                e.preventDefault();
                scrollElement.scrollTo({
                    left: scrollElement.scrollLeft + e.deltaY * 5,
                    behavior: "smooth",
                });
            };
            scrollElement.addEventListener("wheel", onWheel);
            return () => scrollElement.removeEventListener("wheel", onWheel);
        }
    };

    const lineNumber = (line) => {
        switch (line) {
            case "line1":
                return "1";
            case "line2":
                return "2";
            case "line3":
                return "3";
            case "line4":
                return "4";
            case "line5":
                return "5";
            case "line6":
                return "6";
            case "line7":
                return "7";
            case "line8":
                return "8";
            case "line9":
                return "9";
            case "gongHangCheolDo":
                return "공항";
            case "gyeongUiJungAngLine":
                return "경의중앙";
            case "gyeongChunLine":
                return "경춘";
            case "suInBunDangLine":
                return "수인분당";
            case "shinBunDangLine":
                return "신분당";
            case "gyeongGangLine":
                return "경강";
            case "seoHaeLine":
                return "서해";
            case "inCheonLine1":
                return "인천1";
            case "inCheonLine2":
                return "인천2";
            case "everLine":
                return "에버라인";
            case "uiJeongBu":
                return "의정부";
            case "uiSinSeolLine":
                return "우이신설";
            case "gimPoGoldLine":
                return "김포골드";
            case "silLimLine":
                return "신림";
            case "gtxA":
                return "GTX-A";
            case "dongHaeLine":
                return "동해";
            case "buSanGimHae":
                return "부산김해";
        }
    };

    const KSTDate = (time) => {
        const date = new Date(time);
        date.setHours(date.getHours() + 9);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const week = date.getDay();
        const weekList = ["일", "월", "화", "수", "목", "금", "토"];
        return `${year}년 ${month}월 ${day}일 ${weekList[week]}요일`;
    };

    const KST = (time) => {
        const date = new Date(time);
        date.setHours(date.getHours() + 9);
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        if (hours == 0) {
            const amHours = date.getHours() + 12;
            return `오전 ${amHours}:${minutes}`;
        } else if (0 < hours && hours < 12) {
            return `오전 ${hours}:${minutes}`;
        } else if (hours == 12) {
            return `오후 ${hours}:${minutes}`;
        } else if (12 < hours && hours < 24) {
            const pmHours = date.getHours() - 12;
            return `오후 ${pmHours}:${minutes}`;
        }
    };

    const scrollToBottom = () => {
        if (chatScrollRef.current) {
            chatScrollRef.current.scrollIntoView({ block: "end" });
            setIsScrollBottom(true);
        }
    };

    const fetchMessage = () => {
        if (
            category.category === "seoul" ||
            category.category === "busan" ||
            category.category === "daejeon" ||
            category.category === "daegu" ||
            category.category === "gwangju"
        ) {
            axiosInstance
                .get(`/nonestep/chat/all?region=${category.region}`)
                .then((response) => {
                    setChatting(response.data);
                    setTimeout(() => {
                        scrollToBottom();
                    }, 100);
                    setTimeout(() => {
                        chatScrollRef.current.classList.remove("loading");
                    }, 500);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axiosInstance
                .get(
                    `/nonestep/chat/subscribe?region=${category.region}&line=${category.category}`
                )
                .then((response) => {
                    setChatting(response.data);
                    setTimeout(() => {
                        scrollToBottom();
                    }, 100);
                    setTimeout(() => {
                        chatScrollRef.current.classList.remove("loading");
                    }, 500);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const subscribe = () => {
        if (
            category.category === "seoul" ||
            category.category === "busan" ||
            category.category === "daejeon" ||
            category.category === "daegu" ||
            category.category === "gwangju"
        ) {
            client.current.subscribe(
                `/sub/all/${category.region}`,
                (message) => {
                    if (message.body) {
                        const msg = JSON.parse(message.body);
                        setChatting((chat) => [...chat, msg]);
                    }
                }
            );
        } else {
            client.current.subscribe(
                `/sub/${category.region}/${category.category}`,
                (message) => {
                    if (message.body) {
                        const msg = JSON.parse(message.body);
                        setChatting((chat) => [...chat, msg]);
                    }
                }
            );
        }

        client.current.subscribe("/sub/chat-delete", (message) => {
            if (message.body) {
                const msg = JSON.parse(message.body);
                deleteMessage(msg);
            }
        });
    };

    const deleteMessage = (deleteChat) => {
        setChatting((prevchat) =>
            prevchat.map((chat) =>
                chat.chatNo === deleteChat.chatNo
                    ? { ...chat, isChatDelete: true }
                    : chat
            )
        );
    };

    const connect = () => {
        client.current = new Client({
            webSocketFactory: () =>
                new WebSocket("https://nonestep.site/nonestep/connect"),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                subscribe();
            },
        });

        client.current.activate();
    };

    const disconnect = () => {
        if (client.current) {
            client.current.deactivate();
            client.current = null;
        }
    };

    useEffect(() => {
        fetchMessage();
        connect();

        return () => disconnect();
    }, [category.category, category.region]);

    const handleMessage = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        if (client.current && message.trim() !== "") {
            const body = {
                region: category.region,
                line: category.category,
                message: message,
                chatReply: null,
            };

            client.current.publish({
                destination: "/pub/chat",
                body: JSON.stringify(body),
                headers: { Authorization: access },
            });

            setMessage("");
            setTimeout(() => {
                scrollToBottom();
            }, 100);
        }
    };

    const handleSearchEnter = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            sendMessage();
            e.preventDefault();
        }
    };

    const handleMessageCopy = () => {
        setSelectedModal("copy");

        try {
            navigator.clipboard.writeText(copyMessage);
            toastPop();
        } catch (error) {
            alert("복사 중 오류가 발생했습니다.");
            console.log(error);
        }

        setIsModalOpen(false);
        document.body.style.overflow = "auto";
    };

    const handleDeleteMessage = () => {
        setSelectedModal("delete");

        const body = {
            chatNo: chatNumber,
            region: category.region,
            line: category.category,
        };

        client.current.publish({
            destination: "/pub/chat-delete",
            body: JSON.stringify(body),
            headers: { Authorization: access },
        });

        toastPop();
        setIsModalOpen(false);
        document.body.style.overflow = "auto";
    };

    useEffect(() => {
        if (chatting.length > 0) {
            const newMessage = document.querySelector(".chattings:last-child");

            if (newMessage) {
                newMessage.classList.add("new_message");

                setTimeout(() => {
                    newMessage.classList.remove("new_message");
                }, 300);
            }
        }
    }, [chatting.length]);

    const handleModalOpen = (
        chatNo,
        chatMessage,
        chatMemberRandom,
        chatMemberNickName
    ) => {
        setIsModalOpen(true);
        setChatNumber(chatNo);
        setCopyMessage(chatMessage);
        setUserMemberRandom(chatMemberRandom);
        setUserMemberNickName(chatMemberNickName);
        document.body.style.overflow = "hidden";
    };

    const handleModalClose = (e) => {
        if (e.target === modalRef.current) {
            setIsModalOpen(false);
            document.body.style.overflow = "auto";
        }
    };

    const toastPop = () => {
        if (toastRef.current) {
            toastRef.current.classList.remove("opacity");

            setTimeout(() => {
                toastRef.current.classList.add("opacity");
            }, 2000);
        }
    };

    const scrollEvent = _.debounce((e) => {
        const totalHeight = document.documentElement.scrollHeight;
        const innerHeight = window.innerHeight;
        const clientHeight = e.srcElement.scrollingElement.scrollTop;

        setIsScrollBottom(totalHeight <= innerHeight + clientHeight + 50);
    }, 100);

    useEffect(() => {
        window.addEventListener("scroll", scrollEvent);
    }, [scrollEvent]);

    useEffect(() => {
        if (!isScrollBottom) return;
        scrollToBottom();
    }, [chatting, isScrollBottom]);

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
                <ChattingContainer
                    ref={chatScrollRef}
                    className={
                        "loading " +
                        (selected === "seoul" ||
                        selected === "busan" ||
                        selected === "daejeon" ||
                        selected === "daegu" ||
                        selected === "gwangju"
                            ? "full"
                            : "")
                    }
                >
                    {chatting.map((chat, index) => (
                        <div key={index} className="chattings">
                            {index === 0 && (
                                <div className="first_message new_date">
                                    <p>{KSTDate(chat.date)}</p>
                                </div>
                            )}
                            {0 < index &&
                                KSTDate(chat.date) !==
                                    KSTDate(chatting[index - 1].date) && (
                                    <div className="new_date">
                                        <p>{KSTDate(chat.date)}</p>
                                    </div>
                                )}
                            {chat.memberRandom === memberRandom &&
                            chat.memberNickName === memberNickName ? (
                                <MyChattingMessageContainer
                                    key={`${chat.chatNo}`}
                                    className={
                                        0 < index &&
                                        KST(chat.date) ===
                                            KST(chatting[index - 1].date) &&
                                        chat.memberNickName ===
                                            chatting[index - 1]
                                                .memberNickName &&
                                        chat.memberRandom ===
                                            chatting[index - 1].memberRandom &&
                                        chat.chatLine ===
                                            chatting[index - 1].chatLine
                                            ? "continue"
                                            : ""
                                    }
                                >
                                    <div className="chat_info">
                                        {0 < index &&
                                        chat.memberNickName ===
                                            chatting[index - 1]
                                                .memberNickName &&
                                        chat.memberRandom ===
                                            chatting[index - 1].memberRandom &&
                                        chat.chatLine ===
                                            chatting[index - 1].chatLine ? (
                                            <></>
                                        ) : (
                                            <>
                                                {selected === "seoul" ||
                                                selected === "busan" ||
                                                selected === "daejeon" ||
                                                selected === "daegu" ||
                                                selected === "gwangju" ? (
                                                    <div className="line_container">
                                                        <span
                                                            className={`line ${category.region}_${chat.chatLine}`}
                                                        >
                                                            {lineNumber(
                                                                chat.chatLine
                                                            )}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        )}

                                        <div className="my_message_wrapper">
                                            <div className="time_container">
                                                {chat.isChatDelete ||
                                                selected === "seoul" ||
                                                selected === "busan" ||
                                                selected === "daejeon" ||
                                                selected === "daegu" ||
                                                selected === "gwangju" ? (
                                                    <></>
                                                ) : (
                                                    <button
                                                        className="delete_icon"
                                                        onClick={() =>
                                                            handleModalOpen(
                                                                chat.chatNo,
                                                                chat.message,
                                                                chat.memberRandom,
                                                                chat.memberNickName
                                                            )
                                                        }
                                                    >
                                                        <IoEllipsisVertical />
                                                    </button>
                                                )}
                                                {index < chatting.length - 1 &&
                                                KST(chat.date) ===
                                                    KST(
                                                        chatting[index + 1].date
                                                    ) &&
                                                chat.memberNickName ===
                                                    chatting[index + 1]
                                                        .memberNickName &&
                                                chat.memberRandom ===
                                                    chatting[index + 1]
                                                        .memberRandom &&
                                                chat.chatLine ===
                                                    chatting[index + 1]
                                                        .chatLine ? (
                                                    <></>
                                                ) : (
                                                    <span className="time">
                                                        {KST(chat.date)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="my_message_container">
                                                {chat.isChatDelete ? (
                                                    <div className="delete_message_container">
                                                        <IoAlertCircleOutline />
                                                        <span className="delete_message">
                                                            삭제된 메시지입니다.
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="message">
                                                        {chat.message}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </MyChattingMessageContainer>
                            ) : (
                                <ChattingMessageContainer
                                    key={`${chat.chatNo}`}
                                    className={
                                        0 < index &&
                                        KST(chat.date) ===
                                            KST(chatting[index - 1].date) &&
                                        chat.memberNickName ===
                                            chatting[index - 1]
                                                .memberNickName &&
                                        chat.memberRandom ===
                                            chatting[index - 1].memberRandom &&
                                        chat.chatLine ===
                                            chatting[index - 1].chatLine
                                            ? "continue"
                                            : ""
                                    }
                                >
                                    {0 < index &&
                                    KST(chat.date) ===
                                        KST(chatting[index - 1].date) &&
                                    chat.memberNickName ===
                                        chatting[index - 1].memberNickName &&
                                    chat.memberRandom ===
                                        chatting[index - 1].memberRandom &&
                                    chat.chatLine ===
                                        chatting[index - 1].chatLine ? (
                                        <></>
                                    ) : (
                                        <div className="profile_img">
                                            <img
                                                src={
                                                    chat.memberIMG ||
                                                    userProfileImg
                                                }
                                                alt="profile-image"
                                            />
                                        </div>
                                    )}
                                    <div className="chat_info">
                                        {0 < index &&
                                        KST(chat.date) ===
                                            KST(chatting[index - 1].date) &&
                                        chat.memberNickName ===
                                            chatting[index - 1]
                                                .memberNickName &&
                                        chat.memberRandom ===
                                            chatting[index - 1].memberRandom &&
                                        chat.chatLine ===
                                            chatting[index - 1].chatLine ? (
                                            <></>
                                        ) : (
                                            <div className="nickname_container">
                                                <span className="nickname">
                                                    {chat.memberNickName}
                                                </span>
                                                {selected === "seoul" ||
                                                selected === "busan" ||
                                                selected === "daejeon" ||
                                                selected === "daegu" ||
                                                selected === "gwangju" ? (
                                                    <span
                                                        className={`line ${category.region}_${chat.chatLine}`}
                                                    >
                                                        {lineNumber(
                                                            chat.chatLine
                                                        )}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        )}
                                        <div className="message_wrapper">
                                            <div className="message_container">
                                                {chat.isChatDelete ? (
                                                    <div className="delete_message_container">
                                                        <IoAlertCircleOutline />
                                                        <span className="delete_message">
                                                            삭제된 메시지입니다.
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="message">
                                                        {chat.message}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="time_container">
                                                {index < chatting.length - 1 &&
                                                KST(chat.date) ===
                                                    KST(
                                                        chatting[index + 1].date
                                                    ) &&
                                                chat.memberNickName ===
                                                    chatting[index + 1]
                                                        .memberNickName &&
                                                chat.memberRandom ===
                                                    chatting[index + 1]
                                                        .memberRandom &&
                                                chat.chatLine ===
                                                    chatting[index + 1]
                                                        .chatLine ? (
                                                    <></>
                                                ) : (
                                                    <span className="time">
                                                        {KST(chat.date)}
                                                    </span>
                                                )}
                                                {chat.isChatDelete ||
                                                selected === "seoul" ||
                                                selected === "busan" ||
                                                selected === "daejeon" ||
                                                selected === "daegu" ||
                                                selected === "gwangju" ? (
                                                    <></>
                                                ) : (
                                                    <button
                                                        className="delete_icon"
                                                        onClick={() =>
                                                            handleModalOpen(
                                                                chat.chatNo,
                                                                chat.message,
                                                                chat.memberRandom,
                                                                chat.memberNickName
                                                            )
                                                        }
                                                    >
                                                        <IoEllipsisVertical />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </ChattingMessageContainer>
                            )}
                        </div>
                    ))}
                </ChattingContainer>
            </ChattingWrapper>
            {!isScrollBottom && (
                <ScrollBottomBtnWrapper>
                    <ScrollBottomBtnContainer>
                        <ScrollBottomBtn
                            onClick={scrollToBottom}
                            className={
                                selected === "seoul" ||
                                selected === "busan" ||
                                selected === "daejeon" ||
                                selected === "daegu" ||
                                selected === "gwangju"
                                    ? "full"
                                    : ""
                            }
                        >
                            <IoIosArrowDown />
                        </ScrollBottomBtn>
                    </ScrollBottomBtnContainer>
                </ScrollBottomBtnWrapper>
            )}
            {selected === "seoul" ||
            selected === "busan" ||
            selected === "daejeon" ||
            selected === "daegu" ||
            selected === "gwangju" ? (
                <></>
            ) : (
                <ChattingInputContainer>
                    <ChattingInput
                        type="type"
                        id="chat"
                        label="채팅"
                        value={message}
                        placeholder="메시지를 입력해주세요"
                        rows={1}
                        maxLength="300"
                        onChange={(e) => handleMessage(e)}
                        onKeyDown={handleSearchEnter}
                    />
                    <MessageSendBtn onClick={sendMessage}>
                        <TbSend />
                    </MessageSendBtn>
                </ChattingInputContainer>
            )}
            {isModalOpen &&
                userMemberRandom === memberRandom &&
                userMemberNickName === memberNickName && (
                    <ModalContainer
                        ref={modalRef}
                        onClick={(e) => handleModalClose(e)}
                    >
                        <Modal>
                            <li>
                                <button
                                    className="chatting_copy"
                                    onClick={handleMessageCopy}
                                >
                                    <span>복사하기</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="chatting_delete"
                                    onClick={handleDeleteMessage}
                                >
                                    <span>삭제하기</span>
                                </button>
                            </li>
                        </Modal>
                    </ModalContainer>
                )}
            {isModalOpen &&
                userMemberRandom !== memberRandom &&
                userMemberNickName !== memberNickName && (
                    <ModalContainer
                        ref={modalRef}
                        onClick={(e) => handleModalClose(e)}
                    >
                        <Modal>
                            <li>
                                <button
                                    className="chatting_copy"
                                    onClick={handleMessageCopy}
                                >
                                    <span>복사하기</span>
                                </button>
                            </li>
                        </Modal>
                    </ModalContainer>
                )}
            <ToastContainer ref={toastRef} className="opacity">
                {selectedModal === "copy" && <p>복사되었습니다.</p>}
                {selectedModal === "delete" && <p>메시지가 삭제되었습니다.</p>}
            </ToastContainer>
        </>
    );
};

export default Chatting;
