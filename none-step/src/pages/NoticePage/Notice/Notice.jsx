import { useNavigate } from "react-router-dom";
import {
    ContentContainer,
    ContentTimeContainer,
    NoticeContainer,
    NoticeWrapper,
} from "./Notice.styles";
import DOMPurify from "dompurify";

const Notice = ({ notice }) => {
    const navigate = useNavigate();

    const handleClickNotice = () => {
        navigate(`/notice/${notice.boardNo}`);
    };

    const KSTDate = (time) => {
        const date = new Date(time);
        date.setHours(date.getHours() + 9);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}.${month}.${day}.`;
    };

    return (
        <NoticeWrapper onClick={handleClickNotice}>
            <NoticeContainer>
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
            </NoticeContainer>
        </NoticeWrapper>
    );
};

export default Notice;
