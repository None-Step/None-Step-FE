import { useEffect, useState } from "react";
import QuillEditor from "../Editor/QuillEditor";
import {
    ButtonContainer,
    EditorContainer,
    ModifyButton,
    ModifyContainer,
    ModifyWrapper,
    SearchInputContainer,
    TitleInput,
} from "./NoticeModify.styles";
import axiosInstance from "@apis/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

const NoticeModify = () => {
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const boardNo = location.pathname.split("/")[3];

    useEffect(() => {
        axiosInstance
            .get(`/nonestep/board/detail?boardNo=${boardNo}`)
            .then((response) => {
                setTitle(response.data.boardTitle);
                setContents(response.data.boardContent);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const createNotice = () => {
        if (title.trim() === "") {
            alert("제목을 입력해 주세요.");
        } else if (contents.trim() === "") {
            alert("내용을 작성해 주세요.");
        } else {
            const noticeInfo = {
                boardNo: boardNo,
                boardTitle: title,
                boardContent: contents,
            };

            axiosInstance
                .put("/nonestep/board/modify", noticeInfo)
                .then((response) => {
                    alert("공지사항 수정이 완료되었습니다.");
                    navigate("/notice?page=1");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <ModifyWrapper>
            <ModifyContainer>
                <SearchInputContainer>
                    <TitleInput
                        type="search"
                        id="search"
                        name="q"
                        label="공지사항 제목"
                        value={title}
                        placeholder="제목을 입력하세요."
                        onChange={handleTitle}
                    />
                </SearchInputContainer>
                <EditorContainer>
                    <QuillEditor
                        contents={contents}
                        setContents={(content) => setContents(content)}
                    />
                </EditorContainer>
            </ModifyContainer>
            <ButtonContainer>
                <ModifyButton onClick={createNotice}>수정하기</ModifyButton>
            </ButtonContainer>
        </ModifyWrapper>
    );
};

export default NoticeModify;
