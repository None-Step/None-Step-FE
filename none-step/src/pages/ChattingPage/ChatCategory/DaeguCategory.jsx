import { useEffect, useState } from "react";
import { ChatCategoryBtn } from "./ChatCategory.styles";
import { useDispatch, useSelector } from "react-redux";
import { selectedCategory } from "@store/slices/categorySlice";

const DaeguCategory = () => {
    const [selected, setSelected] = useState("");

    const dispatch = useDispatch();

    const category = useSelector((state) => state.category.value);

    useEffect(() => {
        if (category.category === "") {
            dispatch(selectedCategory({ category: "daegu" }));
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
                        "daegu " + (selected === "daegu" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("daegu")}
                >
                    <span>전체</span>
                </ChatCategoryBtn>
            </li>
            <li>
                <ChatCategoryBtn
                    className={
                        "daegu_line1 " +
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
                        "daegu_line2 " +
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
                        "daegu_line3 " +
                        (selected === "line3" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("line3")}
                >
                    <span>3호선</span>
                </ChatCategoryBtn>
            </li>
        </>
    );
};

export default DaeguCategory;
