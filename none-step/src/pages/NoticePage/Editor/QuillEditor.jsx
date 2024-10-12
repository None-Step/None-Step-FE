import { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "@apis/axiosInstance";
import { QuillEditorContainer } from "./QuillEditor.styles";

const QuillEditor = ({ contents, setContents }) => {
    const quillRef = useRef();

    const access = sessionStorage.getItem("accessToken");

    const ImageHandler = () => {
        const input = document.createElement("input");

        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];

            if (!file) return;

            try {
                const uploadImage = async () => {
                    const formData = new FormData();
                    formData.append("img", file);

                    const response = await axiosInstance.post(
                        "/nonestep/board/img",
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                Authorization: `${access}`,
                            },
                        }
                    );

                    return response.data.img;
                };
                const IMG_URL = await uploadImage();
                const editor = quillRef.current.getEditor();
                const range = editor.getSelection();

                editor.insertEmbed(range.index, "image", IMG_URL);
                editor.setSelection(range.index + 1);
            } catch (error) {
                console.log(error);
            }
        };
    };

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ color: [] }, { background: [] }],
                    ["link", "image"],
                ],
                handlers: {
                    image: ImageHandler,
                },
            },
        }),
        []
    );

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
        "background",
        "font",
        "align",
        "script",
        "code",
        "code-block",
    ];

    const handleContent = (e) => {
        setContents(e);
    };

    return (
        <QuillEditorContainer>
            <ReactQuill
                ref={quillRef}
                style={{ width: "100%", height: "calc(100vh - 267px)" }}
                theme="snow"
                modules={modules}
                formats={formats}
                value={contents}
                placeholder="내용을 입력해 주세요."
                onChange={handleContent}
            />
        </QuillEditorContainer>
    );
};

export default QuillEditor;
