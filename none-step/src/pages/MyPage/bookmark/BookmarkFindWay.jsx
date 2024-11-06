import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PageContainer } from "../MyPage.style";
import MenuBar from "@/components/menuBar/MenuBar";
import { PageHeader } from "@/components/header/Headers";
import { BookmarkPlace, BookmarkPath } from "./BookmarkList";
import axiosInstance from "@/apis/axiosInstance";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
    width: 100%;
`;

const TabContainer = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.colors.white};
`;

const Tab = styled.button`
    font-size: 1.4rem;
    flex: 1;
    padding: 1.5rem;
    background: none;
    border: none;
    border-bottom: 2px solid
        ${(props) =>
            props.$active
                ? props.theme.colors.primary
                : props.theme.colors.gray06};
    color: ${(props) =>
        props.$active ? props.theme.colors.primary : props.theme.colors.gray02};
    font-weight: ${(props) => (props.$active ? "bold" : "normal")};
    cursor: pointer;
`;

const LinkGray = styled(Link)`
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.gray02};
    display: inline-block;
    padding: 1rem;
`;

const Span = styled.span`
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.gray02};
    display: inline-block;
    padding: 1rem;
`;

const TabContent = styled.div`
    display: ${(props) => (props.$active ? "block" : "none")};
`;

const BookmarkFindWay = ({ color }) => {
    const [activeTab, setActiveTab] = useState("장소");
    const [bookmarkList, setBookmarkList] = useState([]);

    const fetchBookmarks = async () => {
        try {
            const response = await axiosInstance.get(
                "/nonestep/book-mark/place-list"
            );
            setBookmarkList(response.data);
        } catch (error) {
            console.error(
                "즐겨찾기 장소 목록을 불러오는 데 실패했습니다.",
                error
            );
        }
    };

    useEffect(() => {
        fetchBookmarks();
    }, []);

    // 삭제 핸들러 함수
    const handleDelete = async (placeNo) => {
        try {
            const response = await axiosInstance.delete(
                `/nonestep/book-mark/place-delete?placeNo=${placeNo}`
            );

            // console.log('삭제 요청 응답:', response);
            fetchBookmarks();
        } catch (error) {
            console.error("즐겨찾기 삭제에 실패했습니다.", error);
        }
    };

    // 길찾기 경로 북마크 -----------------------------------------------------------
    const [bookmarkPathList, setbookmarkPathList] = useState([]);

    const fetchBookmarkPaths = async () => {
        try {
            const response = await axiosInstance.get(
                "nonestep/book-mark/path-list"
            );
            setbookmarkPathList(response.data);
        } catch (error) {
            console.error(
                "즐겨찾기 경로 목록을 불러오는 데 실패했습니다.",
                error
            );
        }
    };

    useEffect(() => {
        fetchBookmarkPaths();
    }, []);

    // 경로 삭제 핸들러 함수
    const handleDeletePath = async (pathNo) => {
        // console.log (`경로 삭제 요청, /nonestep/book-mark/path-delete?pathNo=${pathNo}`);

        try {
            const response = await axiosInstance.delete(
                `/nonestep/book-mark/path-delete?pathNo=${pathNo}`
            );

            // console.log('경로 삭제 요청 응답:',response);
            fetchBookmarkPaths();
        } catch (error) {
            console.error("경로 즐겨찾기 삭제에 실패했습니다.", error);
        }
    };

    return (
        <>
            <PageHeader />
            <PageContainer>
                <Wrapper>
                    <TabContainer>
                        <Tab
                            $active={activeTab === "장소"}
                            onClick={() => setActiveTab("장소")}
                        >
                            장소
                        </Tab>
                        <Tab
                            $active={activeTab === "경로"}
                            onClick={() => setActiveTab("경로")}
                        >
                            경로
                        </Tab>
                    </TabContainer>

                    <TabContent $active={activeTab === "장소"}>
                        {bookmarkList && bookmarkList.length > 0 ? (
                            bookmarkList.map((bookmark) => (
                                <BookmarkPlace
                                    key={bookmark.placeNo}
                                    color={bookmark.placeColor}
                                    placeName={bookmark.placeNickName}
                                    placeAddress={bookmark.placeAddress}
                                    placeNo={bookmark.placeNo}
                                    onDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <LinkGray to="/FindWay">즐겨찾기 등록하기</LinkGray>
                        )}
                    </TabContent>

                    <TabContent $active={activeTab === "경로"}>
                        {bookmarkPathList && bookmarkPathList.length > 0 ? (
                            bookmarkPathList.map((bookmark) => (
                                <BookmarkPath
                                    key={bookmark.pathNo}
                                    color={bookmark.pathColor}
                                    pathStartName={bookmark.pathStartNickName}
                                    pathEndName={bookmark.pathEndNickName}
                                    pathNo={bookmark.pathNo}
                                    onDelete={handleDeletePath}
                                />
                            ))
                        ) : (
                            <LinkGray to="/FindWay">즐겨찾기 등록하기</LinkGray>
                        )}
                    </TabContent>

                    <Span>즐겨찾기 장소는 최대 5곳 등록 가능합니다.</Span>
                </Wrapper>
            </PageContainer>
            <MenuBar />
        </>
    );
};

export default BookmarkFindWay;
