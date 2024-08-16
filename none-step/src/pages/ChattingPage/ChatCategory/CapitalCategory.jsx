import { useDispatch, useSelector } from "react-redux";
import { ChatCategoryBtn } from "./ChatCategory.styles";
import { useEffect, useState } from "react";
import { selectedCategory } from "@store/slices/categorySlice";

const CapitalCategory = () => {
    const [selected, setSelected] = useState("");

    const dispatch = useDispatch();

    const category = useSelector((state) => state.category.value);

    useEffect(() => {
        if (category.category === "") {
            dispatch(selectedCategory({ category: "capital" }));
        } else {
            setSelected(category.category);
        }
    }, [category.category]);

    const handleSelectedCategory = (line) => {
        setSelected(line);
        dispatch(selectedCategory({ category: line }));
    };

    return (
        <>
            <li>
                <ChatCategoryBtn
                    className={
                        "capital " + (selected === "capital" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("capital")}
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
                    onClick={() => handleSelectedCategory("line1")}
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
                    onClick={() => handleSelectedCategory("line2")}
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
                    onClick={() => handleSelectedCategory("line3")}
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
                    onClick={() => handleSelectedCategory("line4")}
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
                    onClick={() => handleSelectedCategory("line5")}
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
                    onClick={() => handleSelectedCategory("line6")}
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
                    onClick={() => handleSelectedCategory("line7")}
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
                    onClick={() => handleSelectedCategory("line8")}
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
                    onClick={() => handleSelectedCategory("line9")}
                >
                    <span>9호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "airport " + (selected === "airport" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("airport")}
                >
                    <span>공항철도</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "gyeonguijungang " +
                        (selected === "gyeonguijungang" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("gyeonguijungang")}
                >
                    <span>경의중앙선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "gyeongchun " +
                        (selected === "gyeongchun" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("gyeongchun")}
                >
                    <span>경춘선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "suinbundang " +
                        (selected === "suinbundang" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("suinbundang")}
                >
                    <span>수인분당선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "shinbundang " +
                        (selected === "shinbundang" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("shinbundang")}
                >
                    <span>신분당선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "gyeonggang " +
                        (selected === "gyeonggang" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("gyeonggang")}
                >
                    <span>경강선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "seohae " + (selected === "seohae" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("seohae")}
                >
                    <span>서해선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "incheon1 " +
                        (selected === "incheon1" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("incheon1")}
                >
                    <span>인천1호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "incheon2 " +
                        (selected === "incheon2" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("incheon2")}
                >
                    <span>인천2호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "everline " +
                        (selected === "everline" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("everline")}
                >
                    <span>에버라인</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "uijeongbu " +
                        (selected === "uijeongbu" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("uijeongbu")}
                >
                    <span>의정부경전철</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "wooyishinseol " +
                        (selected === "wooyishinseol" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("wooyishinseol")}
                >
                    <span>우이신설선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "gimpogold " +
                        (selected === "gimpogold" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("gimpogold")}
                >
                    <span>김포골드라인</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "sillim " + (selected === "sillim" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("sillim")}
                >
                    <span>신림선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "GTX_A " + (selected === "GTX_A" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("GTX_A")}
                >
                    <span>GTX-A</span>
                </ChatCategoryBtn>
            </li>
        </>
    );
};

export default CapitalCategory;
