import { useDispatch, useSelector } from "react-redux";
import { ChatCategoryBtn } from "./ChatCategory.styles";
import { useEffect, useState } from "react";
import { selectedCategory } from "@store/slices/categorySlice";

const DaejeonCategory = () => {
    const [selected, setSelected] = useState("");

    const dispatch = useDispatch();

    const category = useSelector((state) => state.category.value);

    useEffect(() => {
        switch (category.category) {
            case "daejeon":
                setSelected("daejeon");
                break;
            case "line1":
                setSelected("line1");
                break;
            default:
                setSelected("daejeon");
                dispatch(selectedCategory({ category: "daejeon" }));
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
                        "daejeon " + (selected === "daejeon" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("daejeon")}
                >
                    <span>전체</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "daejeon_line1 " +
                        (selected === "line1" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("line1")}
                >
                    <span>1호선</span>
                </ChatCategoryBtn>
            </li>
        </>
    );
};

export default DaejeonCategory;
