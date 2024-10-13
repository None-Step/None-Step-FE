import { BG, PageContainer } from "../MyPage.style";
import MenuBar from "@components/menuBar/MenuBar";
import { PageHeader } from "@components/header/Headers";
import {
    BookmarkList,
    BookmarkMapContainer,
    DeleteButton,
    LineContainer,
    Span,
} from "./BookmarkMap.styles";
import { useEffect, useState } from "react";
import axiosInstance from "@apis/axiosInstance";
import { IoIosStar } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const BookmarkMap = () => {
    const [bookmarkList, setBookmarkList] = useState([]);
    const [lineList, setLineList] = useState([]);
    const [lineColorList, setLineColorList] = useState([]);

    const navigate = useNavigate();

    const access = sessionStorage.getItem("accessToken");

    useEffect(() => {
        if (access) {
            axiosInstance
                .get("/nonestep/book-mark/subway-list", {
                    headers: {
                        Authorization: `${access}`,
                    },
                })
                .then((response) => {
                    setBookmarkList(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    useEffect(() => {
        setLineList(
            bookmarkList.map((bookmark) => {
                switch (bookmark.line) {
                    case "1호선":
                        return "1";
                    case "2호선":
                        return "2";
                    case "3호선":
                        return "3";
                    case "4호선":
                        return "4";
                    case "5호선":
                        return "5";
                    case "6호선":
                        return "6";
                    case "7호선":
                        return "7";
                    case "8호선":
                        return "8";
                    case "9호선":
                        return "9";
                    case "수인분당선":
                        return "수인분당";
                    case "신분당선":
                        return "신분당";
                    case "경의중앙선":
                        return "경의중앙";
                    case "경춘선":
                        return "경춘";
                    case "경강선":
                        return "경강";
                    case "우의신설선":
                        return "우의신설";
                    case "신림선":
                        return "신림";
                    case "김포골드라인":
                        return "김포골드";
                    case "에버라인":
                        return "에버라인";
                    case "서해선":
                        return "서해";
                    case "공항철도":
                        return "공항";
                    case "GTX-A":
                        return "GTX-A";
                    case "의정부경전철":
                        return "의정부";
                    case "인천1호선":
                        return "인천1";
                    case "인천2호선":
                        return "인천2";
                    case "동해선":
                        return "동해";
                    case "부산김해경전철":
                        return "부산김해";
                }
            })
        );

        setLineColorList(
            bookmarkList.map((bookmark) => {
                if (bookmark.region === "수도권") {
                    switch (bookmark.line) {
                        case "1호선":
                            return "capital_line1";
                        case "2호선":
                            return "capital_line2";
                        case "3호선":
                            return "capital_line3";
                        case "4호선":
                            return "capital_line4";
                        case "5호선":
                            return "capital_line5";
                        case "6호선":
                            return "capital_line6";
                        case "7호선":
                            return "capital_line7";
                        case "8호선":
                            return "capital_line8";
                        case "9호선":
                            return "capital_line9";
                        case "수인분당선":
                            return "capital_suin";
                        case "신분당선":
                            return "capital_shinbundang";
                        case "경의중앙선":
                            return "capital_gyeongui";
                        case "경춘선":
                            return "capital_gyeongchun";
                        case "경강선":
                            return "capital_gyeonggang";
                        case "우의신설선":
                            return "capital_wooyi";
                        case "신림선":
                            return "capital_sillim";
                        case "김포골드라인":
                            return "capital_gimpo";
                        case "에버라인":
                            return "capital_ever";
                        case "서해선":
                            return "capital_seohae";
                        case "공항철도":
                            return "capital_airport";
                        case "GTX-A":
                            return "capital_GTX_A";
                        case "의정부경전철":
                            return "capital_uijeongbu";
                        case "인천1호선":
                            return "capital_incheon1";
                        case "인천2호선":
                            return "capital_incheon2";
                    }
                } else if (bookmark.region === "부산") {
                    switch (bookmark.line) {
                        case "1호선":
                            return "busan_line1";

                        case "2호선":
                            return "busan_line2";

                        case "3호선":
                            return "busan_line3";

                        case "4호선":
                            return "busan_line4";

                        case "동해선":
                            return "busan_donghae";

                        case "부산김해경전철":
                            return "busan_gimhae";
                    }
                } else if (bookmark.region === "대구") {
                    switch (bookmark.line) {
                        case "1호선":
                            return "daegu_line1";

                        case "2호선":
                            return "daegu_line2";

                        case "3호선":
                            return "daegu_line3";
                    }
                } else if (bookmark.region === "대전") {
                    return "daejeon_line1";
                } else if (bookmark.region === "광주") {
                    return "gwangju_line1";
                }
            })
        );
    }, [bookmarkList]);

    const handleClickList = (region, line, station) => {
        axiosInstance
            .get(
                `/nonestep/subway/station-info?region=${region}&line=${line}&station=${station}`
            )
            .then((response) => {
                navigate(
                    `/map?lat=${response.data.infoLatitude}&lng=${response.data.infoLongitude}`
                );
            })
            .catch((error) => {
                console.log(error);
                alert(
                    "상세정보를 불러오는 데에 실패했습니다.\n 다시 시도해 주세요."
                );
            });
    };

    const handleClickDelete = (region, line, station) => {
        if (window.confirm("즐겨찾기를 삭제하시겠습니까?")) {
            axiosInstance
                .delete(
                    `/nonestep/book-mark/subway-delete?region=${region}&line=${line}&station=${station}`
                )
                .then((response) => {
                    axiosInstance
                        .get("/nonestep/book-mark/subway-list", {
                            headers: {
                                Authorization: `${access}`,
                            },
                        })
                        .then((response) => {
                            setBookmarkList(response.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <BG>
            <PageContainer>
                <PageHeader />
                <BookmarkMapContainer>
                    {bookmarkList.length !== 0 ? (
                        <BookmarkList>
                            {bookmarkList.map((bookmark, index) => (
                                <li key={index}>
                                    <div
                                        className="bookmark_container"
                                        onClick={() =>
                                            handleClickList(
                                                bookmark.region,
                                                bookmark.line,
                                                bookmark.station
                                            )
                                        }
                                    >
                                        <IoIosStar />
                                        <div className="bookmark_info">
                                            <LineContainer
                                                className={`${lineColorList[index]}`}
                                            >
                                                {lineList[index]}
                                            </LineContainer>
                                            <span className="station">
                                                {bookmark.station}
                                            </span>
                                            <span className="region">
                                                {bookmark.region}
                                            </span>
                                        </div>
                                    </div>
                                    <DeleteButton
                                        onClick={() =>
                                            handleClickDelete(
                                                bookmark.region,
                                                bookmark.line,
                                                bookmark.station
                                            )
                                        }
                                    >
                                        <CgClose />
                                    </DeleteButton>
                                </li>
                            ))}
                        </BookmarkList>
                    ) : (
                        <Span>등록된 즐겨찾기가 없습니다.</Span>
                    )}
                    <Span>즐겨찾기 장소는 최대 5곳 등록 가능합니다.</Span>
                </BookmarkMapContainer>
                <MenuBar />
            </PageContainer>
        </BG>
    );
};

export default BookmarkMap;
