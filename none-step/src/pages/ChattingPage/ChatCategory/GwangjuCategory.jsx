import { useDispatch, useSelector } from "react-redux";
import { ChatCategoryBtn } from "./ChatCategory.styles";
import { useEffect, useState } from "react";
import { selectedCategory } from "@store/slices/categorySlice";

const GwangjuCategory = () => {
    const [selected, setSelected] = useState("");

    const dispatch = useDispatch();

    const category = useSelector((state) => state.category.value);

    useEffect(() => {
        if (category.category === "") {
            dispatch(selectedCategory({ category: "gwangju" }));
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
            <li className="gwangju">
                <ChatCategoryBtn
                    className={
                        "gwangju " + (selected === "gwangju" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("gwangju")}
                >
                    <span>전체</span>
                </ChatCategoryBtn>
            </li>
            <li className="gwangju_line1">
                <ChatCategoryBtn
                    className={
                        "gwangju_line1 " +
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

export default GwangjuCategory;
