import { PageHeader } from "@components/header/Headers";
import MenuBar from "@components/menuBar/MenuBar";
import {
    ChattingMenuContainer,
    ChattingMenuWrapper,
    ChattingLineContainer,
} from "./ChattingMenu.styles";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import CapitalChatMenu from "./ChatMenu/CapitalChatMenu";
import BusanChatMenu from "./ChatMenu/BusanChatMenu";
import DaejeonChatMenu from "./ChatMenu/DaejeonChatMenu";
import DaeguChatMenu from "./ChatMenu/DaeguChatMenu";
import GwangjuChatMenu from "./ChatMenu/GwangjuChatMenu";

const ChattingMenu = () => {
    const [menuIndex, setMenuIndex] = useState();

    const regionChat = [
        {
            region: "수도권",
            lines: <CapitalChatMenu />,
        },
        { region: "부산", lines: <BusanChatMenu /> },
        { region: "대전", lines: <DaejeonChatMenu /> },
        { region: "대구", lines: <DaeguChatMenu /> },
        { region: "광주", lines: <GwangjuChatMenu /> },
    ];

    const handleMenuClick = (e, index) => {
        setMenuIndex(index);
        if (e.target.nextElementSibling.classList.contains("open")) {
            e.target.classList.remove("open");
            e.target.nextElementSibling.classList.remove("open");
        } else {
            e.target.classList.add("open");
            e.target.nextElementSibling.classList.add("open");
        }
    };

    return (
        <>
            <PageHeader />
            <ChattingMenuWrapper>
                <ChattingMenuContainer>
                    {regionChat.map((chat, index) => (
                        <li key={index} className="capital_chat">
                            <div
                                className={
                                    "region " +
                                    (index === menuIndex ? "open" : "")
                                }
                                onClick={(e) => handleMenuClick(e, index)}
                            >
                                <h3>{chat.region}</h3>
                                <IoIosArrowDown />
                            </div>
                            <ChattingLineContainer
                                className={index === menuIndex ? "open" : ""}
                            >
                                {chat.lines}
                            </ChattingLineContainer>
                        </li>
                    ))}
                </ChattingMenuContainer>
            </ChattingMenuWrapper>
            <MenuBar />
        </>
    );
};

export default ChattingMenu;
