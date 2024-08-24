import { useEffect, useState } from "react";
import { ChatCategoryBtn } from "./ChatCategory.styles";
import { useDispatch, useSelector } from "react-redux";
import { selectedCategory } from "@store/slices/categorySlice";

const BusanCategory = () => {
    const [selected, setSelected] = useState("");

    const dispatch = useDispatch();

    const category = useSelector((state) => state.category.value);

    useEffect(() => {
        switch (category.category) {
            case "busan":
                setSelected("busan");
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
            case "dongHaeLine":
                setSelected("dongHaeLine");
                break;
            case "buSanGimHae":
                setSelected("buSanGimHae");
                break;
            default:
                setSelected("busan");
                dispatch(
                    selectedCategory({ category: "busan", region: "busan" })
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
                        "busan " + (selected === "busan" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("busan", "busan")}
                >
                    <span>전체</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "busan_line1 " +
                        (selected === "line1" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("line1", "busan")}
                >
                    <span>1호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "busan_line2 " +
                        (selected === "line2" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("line2", "busan")}
                >
                    <span>2호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "busan_line3 " +
                        (selected === "line3" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("line3", "busan")}
                >
                    <span>3호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "busan_line4 " +
                        (selected === "line4" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("line4", "busan")}
                >
                    <span>4호선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "donghae " +
                        (selected === "dongHaeLine" ? "selected" : "")
                    }
                    onClick={() =>
                        handleSelectedCategory("dongHaeLine", "busan")
                    }
                >
                    <span>동해선</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "busan_gimhae " +
                        (selected === "buSanGimHae" ? "selected" : "")
                    }
                    onClick={() =>
                        handleSelectedCategory("buSanGimHae", "busan")
                    }
                >
                    <span>부산김해</span>
                </ChatCategoryBtn>
            </li>
        </>
    );
};

export default BusanCategory;
