import Notice from "../Notice/Notice";
import {
    NoResultContainer,
    NoticeSearchContainer,
    NoticeSearchWrapper,
    SearchInput,
    SearchInputContainer,
} from "./NoticeSearch.styles";
import { IoSearchOutline } from "react-icons/io5";
import axiosInstance from "@apis/axiosInstance";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NoticeSearch = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [notices, setNotices] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const currentKeyword = decodeURIComponent(location.search.split("?q=")[1]);

    useEffect(() => {
        setSearchKeyword(currentKeyword);

        axiosInstance
            .post("/nonestep/board/search", {
                keyword: currentKeyword,
            })
            .then((response) => {
                setNotices(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [currentKeyword]);

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

    return (
        <NoticeSearchWrapper>
            <NoticeSearchContainer>
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
                {0 < notices.length ? (
                    notices.map((notice) => {
                        return (
                            <Notice key={`${notice.boardNo}`} notice={notice} />
                        );
                    })
                ) : (
                    <NoResultContainer>
                        <p>
                            <em>&#39;{currentKeyword}&#39;</em> 에 대한
                            공지사항이 없습니다.
                        </p>
                        <ul>
                            <li>검색어의 철자가 정확한지 확인해 주세요.</li>
                            <li>다른 검색어로 검색해 보세요.</li>
                            <li>검색어의 단어 수를 줄여서 검색해 보세요.</li>
                        </ul>
                    </NoResultContainer>
                )}
            </NoticeSearchContainer>
        </NoticeSearchWrapper>
    );
};

export default NoticeSearch;
