import styled from "styled-components";

export const ModifyWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    margin-top: 70px;
    margin-bottom: 72px;
    background: ${(props) => props.theme.colors.white};
`;

export const ModifyContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SearchInputContainer = styled.div`
    width: 100%;
`;

const StyledInput = styled.input`
    width: 100%;
    height: 50px;
    padding: 0 15px;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray05};
    background: ${(props) => props.theme.colors.white};
    font-size: 1.8rem;
    outline: none;

    &::placeholder {
        color: ${(props) => props.theme.colors.gray02};
    }
`;

export const TitleInput = (props) => {
    return <StyledInput {...props} />;
};

export const EditorContainer = styled.div`
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray05};

    .ql-toolbar {
        border-radius: 4px 4px 0px 0px;
    }

    .ql-toolbar.ql-snow {
        border: none;
        border-bottom: 1px solid ${(props) => props.theme.colors.gray05};
    }

    .ql-container {
        border-radius: 0px 0px 4px 4px;
        font-size: 1.6rem;
    }

    .ql-container.ql-snow {
        height: calc(100% - 41px);
        border: none;
    }

    .quill > .ql-container > .ql-editor.ql-blank::before {
        color: ${(props) => props.theme.colors.gray02};
        font-style: normal;
    }
`;

export const ButtonContainer = styled.div`
    width: 100%;
    padding: 10px;
`;

export const ModifyButton = styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background: ${(props) => props.theme.colors.primary};
    color: #fff;
    font-size: 1.6rem;
    outline: none;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        background: #0069da;
    }
`;
