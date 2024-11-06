import { PageHeader } from "@components/header/Headers";
import {
    ButtonContainer,
    ContentContainer,
    ContentTimeContainer,
    DetailContainer,
    DetailWrapper,
    NoticeAdminContainer,
    NoticeButton,
    NoticeInvertedButton,
} from "./NoticeDetail.styles";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "@apis/axiosInstance";
import DOMPurify from "dompurify";

const NoticeDetail = () => {
    const [notice, setNotice] = useState({});

    const member = useSelector((state) => state.member);

    const location = useLocation();

    const navigate = useNavigate();

    const boardNo = location.pathname.split("/")[2];

    useEffect(() => {
        axiosInstance
            .get(`/nonestep/board/detail?boardNo=${boardNo}`)
            .then((response) => {
                setNotice(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const KSTDate = (time) => {
        const date = new Date(time);
        date.setHours(date.getHours() + 9);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}.${month}.${day}.`;
    };

    const handleClickList = () => {
        navigate("/notice");
    };

    const handleClickDelete = () => {
        if (window.confirm("공지사항을 삭제하시겠습니까?")) {
            axiosInstance
                .delete(`/nonestep/board/delete?boardNo=${boardNo}`)
                .then((response) => {
                    alert("게시글이 삭제되었습니다.");
                    navigate("/notice");
                })
                .catch((error) => {
                    console.log(error);
                    alert("게시글 삭제에 실패했습니다.");
                });
        }
    };

    const handleClickModify = () => {
        navigate(`/notice/modify/${boardNo}`);
    };

    return (
        <>
            <PageHeader />
            <DetailWrapper>
                <DetailContainer>
                    <h4 className="notice_title">{notice.boardTitle}</h4>
                    <ContentTimeContainer>
                        <span>작성일자</span>
                        <span className="write_time">
                            {KSTDate(notice.boardWriteDate)}
                        </span>
                        {notice.boardModifyDate && (
                            <div className="modify_container">
                                <span>수정일자</span>
                                <span className="modify_time">
                                    {KSTDate(notice.boardModifyDate)}
                                </span>
                            </div>
                        )}
                    </ContentTimeContainer>
                    <ContentContainer>
                        <p
                            className="notice_content"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(notice.boardContent),
                            }}
                        ></p>
                    </ContentContainer>
                </DetailContainer>
                <span className="contents_line"></span>
                <ButtonContainer>
                    <NoticeAdminContainer>
                        {member.memberID === "admin" && (
                            <>
                                <NoticeInvertedButton
                                    onClick={handleClickDelete}
                                >
                                    삭제
                                </NoticeInvertedButton>
                                <NoticeButton onClick={handleClickModify}>
                                    수정
                                </NoticeButton>
                            </>
                        )}
                    </NoticeAdminContainer>
                    <NoticeButton onClick={handleClickList}>목록</NoticeButton>
                </ButtonContainer>
            </DetailWrapper>
        </>
    );
};

export default NoticeDetail;
