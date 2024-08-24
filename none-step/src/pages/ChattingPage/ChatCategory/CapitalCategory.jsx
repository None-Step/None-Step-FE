import { useDispatch, useSelector } from "react-redux";
import { ChatCategoryBtn } from "./ChatCategory.styles";
import { useEffect, useState } from "react";
import { selectedCategory } from "@store/slices/categorySlice";

const CapitalCategory = () => {
    const [selected, setSelected] = useState("");

    const dispatch = useDispatch();

    const category = useSelector((state) => state.category.value);

    useEffect(() => {
        switch (category.category) {
            case "seoul":
                setSelected("seoul");
                break;
            case "line1":
                setSelected("line1");
                break;
            case "line2":
                setSelected("line2");
                break;
            case "line3":
                setSelected("line3");
                break;
            case "line4":
                setSelected("line4");
                break;
            case "line5":
                setSelected("line5");
                break;
            case "line6":
                setSelected("line6");
                break;
            case "line7":
                setSelected("line7");
                break;
            case "line8":
                setSelected("line8");
                break;
            case "line9":
                setSelected("line9");
                break;
            case "gongHangCheolDo":
                setSelected("gongHangCheolDo");
                break;
            case "gyeongUiJungAngLine":
                setSelected("gyeongUiJungAngLine");
                break;
            case "gyeongChunLine":
                setSelected("gyeongChunLine");
                break;
            case "suInBunDangLine":
                setSelected("suInBunDangLine");
                break;
            case "shinBunDangLine":
                setSelected("shinBunDangLine");
                break;
            case "gyeongGangLine":
                setSelected("gyeongGangLine");
                break;
            case "seoHaeLine":
                setSelected("seoHaeLine");
                break;
            case "inCheonLine1":
                setSelected("inCheonLine1");
                break;
            case "inCheonLine2":
                setSelected("inCheonLine2");
                break;
            case "everLine":
                setSelected("everLine");
                break;
            case "uiJeongBu":
                setSelected("uiJeongBu");
                break;
            case "uiSinSeolLine":
                setSelected("uiSinSeolLine");
                break;
            case "gimPoGoldLine":
                setSelected("gimPoGoldLine");
                break;
            case "silLimLine":
                setSelected("silLimLine");
                break;
            case "gtxA":
                setSelected("gtxA");
                break;
            default:
                setSelected("seoul");
                dispatch(
                    selectedCategory({ category: "seoul", region: "seoul" })
                );
        }
    }, [category.category]);

    const handleSelectedCategory = (line, region) => {
        setSelected(line);
        dispatch(selectedCategory({ category: line, region: region }));
    };

    return (
        <>
            <li>
                <ChatCategoryBtn
                    className={
                        "capital " + (selected === "seoul" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("seoul", "seoul")}
                >
                    <span>전체</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "capital_line1 " +
                        (selected === "line1" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("line1", "seoul")}
                >
                    <span>1호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "capital_line2 " +
                        (selected === "line2" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("line2", "seoul")}
                >
                    <span>2호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "capital_line3 " +
                        (selected === "line3" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("line3", "seoul")}
                >
                    <span>3호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "capital_line4 " +
                        (selected === "line4" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("line4", "seoul")}
                >
                    <span>4호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "capital_line5 " +
                        (selected === "line5" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("line5", "seoul")}
                >
                    <span>5호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "capital_line6 " +
                        (selected === "line6" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("line6", "seoul")}
                >
                    <span>6호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "capital_line7 " +
                        (selected === "line7" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("line7", "seoul")}
                >
                    <span>7호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "capital_line8 " +
                        (selected === "line8" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("line8", "seoul")}
                >
                    <span>8호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "capital_line9 " +
                        (selected === "line9" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("line9", "seoul")}
                >
                    <span>9호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "airport " +
                        (selected === "gongHangCheolDo" ? "selected" : "")
                    }
                    onClick={() =>
                        handleSelectedCategory("gongHangCheolDo", "seoul")
                    }
                >
                    <span>공항철도</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "gyeonguijungang " +
                        (selected === "gyeongUiJungAngLine" ? "selected" : "")
                    }
                    onClick={() =>
                        handleSelectedCategory("gyeongUiJungAngLine", "seoul")
                    }
                >
                    <span>경의중앙선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "gyeongchun " +
                        (selected === "gyeongChunLine" ? "selected" : "")
                    }
                    onClick={() =>
                        handleSelectedCategory("gyeongChunLine", "seoul")
                    }
                >
                    <span>경춘선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "suinbundang " +
                        (selected === "suInBunDangLine" ? "selected" : "")
                    }
                    onClick={() =>
                        handleSelectedCategory("suInBunDangLine", "seoul")
                    }
                >
                    <span>수인분당선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "shinbundang " +
                        (selected === "shinBunDangLine" ? "selected" : "")
                    }
                    onClick={() =>
                        handleSelectedCategory("shinBunDangLine", "seoul")
                    }
                >
                    <span>신분당선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "gyeonggang " +
                        (selected === "gyeongGangLine" ? "selected" : "")
                    }
                    onClick={() =>
                        handleSelectedCategory("gyeongGangLine", "seoul")
                    }
                >
                    <span>경강선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "seohae " +
                        (selected === "seoHaeLine" ? "selected" : "")
                    }
                    onClick={() =>
                        handleSelectedCategory("seoHaeLine", "seoul")
                    }
                >
                    <span>서해선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "incheon1 " +
                        (selected === "inCheonLine1" ? "selected" : "")
                    }
                    onClick={() =>
                        handleSelectedCategory("inCheonLine1", "seoul")
                    }
                >
                    <span>인천1호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "incheon2 " +
                        (selected === "inCheonLine2" ? "selected" : "")
                    }
                    onClick={() =>
                        handleSelectedCategory("inCheonLine2", "seoul")
                    }
                >
                    <span>인천2호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "everline " +
                        (selected === "everLine" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("everLine", "seoul")}
                >
                    <span>에버라인</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "uijeongbu " +
                        (selected === "uiJeongBu" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("uiJeongBu", "seoul")}
                >
                    <span>의정부경전철</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "wooyishinseol " +
                        (selected === "uiSinSeolLine" ? "selected" : "")
                    }
                    onClick={() =>
                        handleSelectedCategory("uiSinSeolLine", "seoul")
                    }
                >
                    <span>우이신설선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "gimpogold " +
                        (selected === "gimPoGoldLine" ? "selected" : "")
                    }
                    onClick={() =>
                        handleSelectedCategory("gimPoGoldLine", "seoul")
                    }
                >
                    <span>김포골드라인</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "sillim " +
                        (selected === "silLimLine" ? "selected" : "")
                    }
                    onClick={() =>
                        handleSelectedCategory("silLimLine", "seoul")
                    }
                >
                    <span>신림선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "GTX_A " + (selected === "gtxA" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("gtxA", "seoul")}
                >
                    <span>GTX-A</span>
                </ChatCategoryBtn>
            </li>
        </>
    );
};

export default CapitalCategory;
