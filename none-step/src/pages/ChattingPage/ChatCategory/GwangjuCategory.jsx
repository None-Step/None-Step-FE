import { useDispatch, useSelector } from "react-redux";
import { ChatCategoryBtn } from "./ChatCategory.styles";
import { useEffect, useState } from "react";
import { selectedCategory } from "@store/slices/categorySlice";

const GwangjuCategory = () => {
    const [selected, setSelected] = useState("");

    const dispatch = useDispatch();

    const category = useSelector((state) => state.category.value);

    useEffect(() => {
        switch (category.category) {
            case "gwangju":
                setSelected("gwangju");
                break;
            case "line1":
                setSelected("line1");
                break;
            default:
                setSelected("gwangju");
                dispatch(
                    selectedCategory({ category: "gwangju", region: "gwangju" })
                );
        }
    }, [category.category]);

    const handleSelectedCategory = (line, region) => {
        setSelected(line);
        dispatch(selectedCategory({ category: line, region: region }));
    };

    return (
        <>
            <li className="gwangju">
                <ChatCategoryBtn
                    className={
                        "gwangju " + (selected === "gwangju" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("gwangju", "gwangju")}
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
                    onClick={() => handleSelectedCategory("line1", "gwangju")}
                >
                    <span>1호선</span>
                </ChatCategoryBtn>
            </li>
        </>
    );
};

export default GwangjuCategory;
