import Notice from "../Notice/Notice";
import {
    CreateNotice,
    CreateNoticeContainer,
    NoticeListContainer,
    NoticeListWrapper,
    PaginateContainer,
    SearchInput,
    SearchInputContainer,
} from "./NoticeList.styles";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "@apis/axiosInstance";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const NoticeList = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [notices, setNotices] = useState([]);
    const [pages, setPages] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    const member = useSelector((state) => state.member);

    const navigate = useNavigate();

    const paginate = Array.from({ length: maxPages }, (_, p) => p + 1);

    useEffect(() => {
        axiosInstance
            .get("/nonestep/board/page")
            .then((response) => {
                setMaxPages(response.data.page);
            })
            .catch((error) => {
                console.log(error);
            });

        axiosInstance
            .get(`/nonestep/board/list?page=${pages}`)
            .then((response) => {
                setNotices(response.data);
                navigate(`/notice?page=${pages}`);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [pages]);

    const handleSearchInfo = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearch = () => {
        navigate(`/notice/search?q=${searchKeyword}`);
    };

    const handleSearchEnter = (e) => {
        if (e.key === "Enter") {
            handleSearch();
            handleSearchBlur();
        }
    };

    const handleSearchBlur = () => {
        document.activeElement.blur();
    };

    const handleClickEdit = () => {
        navigate("/notice/edit");
    };

    const handleClickPrev = async () => {
        if (pages > 1) {
            setPages(pages - 1);
        } else {
            setPages(pages);
        }
    };

    const handleClickPage = (e, index) => {
        setPages(index + 1);
    };

    const handleClickNext = async () => {
        if (pages < maxPages) {
            setPages(pages + 1);
        } else {
            setPages(pages);
        }
    };

    return (
        <NoticeListWrapper>
            <NoticeListContainer>
                <SearchInputContainer>
                    <label htmlFor="search">
                        <IoSearchOutline />
                    </label>
                    <SearchInput
                        type="search"
                        id="search"
                        name="q"
                        label="검색"
                        value={searchKeyword}
                        placeholder="검색어를 입력하세요."
                        onChange={handleSearchInfo}
                        onKeyPress={handleSearchEnter}
                    />
                </SearchInputContainer>
                {notices.map((notice) => {
                    return <Notice key={`${notice.boardNo}`} notice={notice} />;
                })}
                <CreateNoticeContainer>
                    {member.memberID === "admin" && (
                        <CreateNotice onClick={handleClickEdit}>
                            <MdOutlineEdit />
                        </CreateNotice>
                    )}
                </CreateNoticeContainer>
            </NoticeListContainer>
            <PaginateContainer>
                <li className="prev" onClick={handleClickPrev}>
                    <GoChevronLeft />
                </li>
                {paginate.map((page, index) => (
                    <li
                        key={index}
                        className={
                            "page " + (pages === index + 1 ? "selected" : "")
                        }
                        onClick={(e) => handleClickPage(e, index)}
                    >
                        {page}
                    </li>
                ))}
                <li className="next" onClick={handleClickNext}>
                    <GoChevronRight />
                </li>
            </PaginateContainer>
        </NoticeListWrapper>
    );
};

export default NoticeList;
