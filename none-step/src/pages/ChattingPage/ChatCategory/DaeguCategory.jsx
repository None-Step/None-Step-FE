import { useEffect, useState } from "react";
import { ChatCategoryBtn } from "./ChatCategory.styles";
import { useDispatch, useSelector } from "react-redux";
import { selectedCategory } from "@store/slices/categorySlice";

const DaeguCategory = () => {
    const [selected, setSelected] = useState("");

    const dispatch = useDispatch();

    const category = useSelector((state) => state.category.value);

    useEffect(() => {
        switch (category.category) {
            case "daegu":
                setSelected("daegu");
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
            default:
                setSelected("daegu");
                dispatch(
                    selectedCategory({ category: "daegu", region: "daegu" })
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
                        "daegu " + (selected === "daegu" ? "selected" : "")
                    }
                    onClick={() => handleSelectedCategory("daegu", "daegu")}
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
                    onClick={() => handleSelectedCategory("line1", "daegu")}
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
                    onClick={() => handleSelectedCategory("line2", "daegu")}
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
                    onClick={() => handleSelectedCategory("line3", "daegu")}
                >
                    <span>3호선</span>
                </ChatCategoryBtn>
            </li>
        </>
    );
};

export default DaeguCategory;
