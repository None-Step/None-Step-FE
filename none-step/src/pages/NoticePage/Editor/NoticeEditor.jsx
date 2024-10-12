import { useState } from "react";
import {
    ButtonContainer,
    EditButton,
    EditContainer,
    EditorContainer,
    EditWrapper,
    SearchInputContainer,
    TitleInput,
} from "./NoticeEditor.styles";
import QuillEditor from "./QuillEditor";
import axiosInstance from "@apis/axiosInstance";
import { useNavigate } from "react-router-dom";

const NoticeEditor = () => {
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");

    const navigate = useNavigate();

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
                boardTitle: title,
                boardContent: contents,
            };

            axiosInstance
                .post("/nonestep/board/write", noticeInfo)
                .then((response) => {
                    alert("공지사항 작성이 완료되었습니다.");
                    navigate("/notice?page=1");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <EditWrapper>
            <EditContainer>
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
            </EditContainer>
            <ButtonContainer>
                <EditButton onClick={createNotice}>작성하기</EditButton>
            </ButtonContainer>
        </EditWrapper>
    );
};

export default NoticeEditor;
