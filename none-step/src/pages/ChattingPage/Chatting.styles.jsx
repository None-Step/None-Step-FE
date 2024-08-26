import styled from "styled-components";

export const ChattingWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 100%;
    margin-top: 64px;
`;

export const ChatCategoryWrapper = styled.div`
    position: fixed;
    top: 64px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 600px;
    padding: 10px 0;
    background: ${(props) => props.theme.colors.white};
    z-index: 10;
`;

export const ChatCategoryContainer = styled.ul`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    height: 40px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: mandatory;
    white-space: nowrap;

    &::-webkit-scrollbar {
        display: none;
    }

    li:first-child {
        margin-left: 20px;
    }

    li:last-child {
        margin-right: 20px;
    }
`;

export const ChattingContainer = styled.div`
    width: 100%;
    padding: 64px 16px 80px;

    &.loading {
        opacity: 0;
    }

    &.full {
        padding-bottom: 40px;
    }

    .new_date {
        display: flex;
        justify-content: center;
        padding: 24px 0 8px;
    }

    .first_message.new_date {
        padding-top: 10px;
    }

    .new_date p {
        color: ${(props) => props.theme.colors.gray01};
        font-size: 1.4rem;
        font-weight: 400;
    }

    .chattings.new_message {
        animation: newMessage 0.3s ease;
        opacity: 0;
    }

    @keyframes newMessage {
        from {
            opacity: 0;
            transform: translateY(20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

export const MyChattingMessageContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: end;
    margin-top: 16px;

    &.continue {
        margin-top: 4px;
    }

    .line_container {
        display: flex;
        justify-content: end;
        margin-bottom: 8px;
    }

    .line_container .line {
        display: inline-flex;
        justify-content: center;
        min-width: 16px;
        height: 16px;
        line-height: 14px;
        margin-left: 6px;
        padding: 0 4px;
        border-radius: 8px;
        color: #fff;
        font-size: 1rem;
        font-weight: 400;
    }

    /* capital */
    .line_container .line.seoul_line1 {
        background: ${(props) => props.theme.capitalLines.one};
    }

    .line_container .line.seoul_line2 {
        background: ${(props) => props.theme.capitalLines.two};
    }

    .line_container .line.seoul_line3 {
        background: ${(props) => props.theme.capitalLines.three};
    }

    .line_container .line.seoul_line4 {
        background: ${(props) => props.theme.capitalLines.four};
    }

    .line_container .line.seoul_line5 {
        background: ${(props) => props.theme.capitalLines.five};
    }

    .line_container .line.seoul_line6 {
        background: ${(props) => props.theme.capitalLines.six};
    }

    .line_container .line.seoul_line7 {
        background: ${(props) => props.theme.capitalLines.seven};
    }

    .line_container .line.seoul_line8 {
        background: ${(props) => props.theme.capitalLines.eight};
    }

    .line_container .line.seoul_line9 {
        background: ${(props) => props.theme.capitalLines.nine};
    }

    .line_container .line.seoul_suInBunDangLine {
        background: ${(props) => props.theme.capitalLines.suinBundang};
    }

    .line_container .line.seoul_shinBunDangLine {
        background: ${(props) => props.theme.capitalLines.shinbundang};
    }

    .line_container .line.seoul_gyeongUiJungAngLine {
        background: ${(props) => props.theme.capitalLines.gyeonguiJungang};
    }

    .line_container .line.seoul_gyeongChunLine {
        background: ${(props) => props.theme.capitalLines.gyeongchun};
    }

    .line_container .line.seoul_gyeongGangLine {
        background: ${(props) => props.theme.capitalLines.gyeonggang};
    }

    .line_container .line.seoul_uiSinSeolLine {
        background: ${(props) => props.theme.capitalLines.wooyiShinseol};
    }

    .line_container .line.seoul_silLimLine {
        background: ${(props) => props.theme.capitalLines.sillim};
    }

    .line_container .line.seoul_gimPoGoldLine {
        background: ${(props) => props.theme.capitalLines.gimpoGold};
    }

    .line_container .line.seoul_everLine {
        background: ${(props) => props.theme.capitalLines.everline};
    }

    .line_container .line.seoul_seoHaeLine {
        background: ${(props) => props.theme.capitalLines.seohae};
    }

    .line_container .line.seoul_gongHangCheolDo {
        background: ${(props) => props.theme.capitalLines.airport};
    }

    .line_container .line.seoul_gtxA {
        background: ${(props) => props.theme.capitalLines.GTXA};
    }

    .line_container .line.seoul_uiJeongBu {
        background: ${(props) => props.theme.capitalLines.uijeongbu};
    }

    .line_container .line.seoul_inCheonLine1 {
        background: ${(props) => props.theme.capitalLines.incheon1};
    }

    .line_container .line.seoul_inCheonLine2 {
        background: ${(props) => props.theme.capitalLines.incheon2};
    }

    /* busan */
    .line_container .line.busan_line1 {
        background: ${(props) => props.theme.busanLines.one};
    }

    .line_container .line.busan_line2 {
        background: ${(props) => props.theme.busanLines.two};
    }

    .line_container .line.busan_line3 {
        background: ${(props) => props.theme.busanLines.three};
    }

    .line_container .line.busan_line4 {
        background: ${(props) => props.theme.busanLines.four};
    }

    .line_container .line.busan_dongHaeLine {
        background: ${(props) => props.theme.busanLines.donghae};
    }

    .line_container .line.busan_buSanGimHae {
        background: ${(props) => props.theme.busanLines.gimhae};
    }

    /* daegu */
    .line_container .line.daegu_line1 {
        background: ${(props) => props.theme.daeguLines.one};
    }

    .line_container .line.daegu_line2 {
        background: ${(props) => props.theme.daeguLines.two};
    }

    .line_container .line.daegu_line3 {
        background: ${(props) => props.theme.daeguLines.three};
    }

    /* daejeon */
    .line_container .line.daejeon_line1 {
        background: ${(props) => props.theme.daejeonLines.one};
    }

    /* gwangju */
    .line_container .line.gwangju_line1 {
        background: ${(props) => props.theme.gwangjuLines.one};
    }

    .my_message_wrapper {
        display: flex;
        align-items: flex-end;
    }

    .my_message_container {
        line-height: 20px;
        padding: 8px 12px;
        border-radius: 20px;
        background: ${(props) => props.theme.colors.primary};
        color: #fff;
        font-size: 1.4rem;
    }

    .delete_message_container {
        display: flex;
        align-items: center;
        color: ${(props) => props.theme.colors.gray04};
    }

    .delete_message_container svg {
        width: 16px;
        height: 16px;
        margin-right: 4px;
    }

    .my_message_container .message {
        white-space: pre-wrap;
    }

    .time_container {
        display: flex;
        justify-content: end;
        min-width: 75px;
        margin-right: 5px;
        margin-bottom: 3px;
        font-size: 1.2rem;
        color: ${(props) => props.theme.colors.gray01};
    }

    .time_container .delete_icon {
        border: none;
        background: transparent;
        outline: none;
        cursor: pointer;
    }

    .time_container .delete_icon svg {
        width: 10px;
        height: 10px;
        color: ${(props) => props.theme.colors.gray01};
    }

    .time_container .time {
        display: inline-block;
        margin-left: 3px;
    }
`;

export const ChattingMessageContainer = styled.div`
    position: relative;
    margin-top: 16px;

    &.continue {
        margin-top: 4px;
    }

    .profile_img {
        position: absolute;
        width: 30px;
        height: 30px;
        border: 1px solid ${(props) => props.theme.colors.gray05};
        border-radius: 50%;
    }

    .profile_img img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }

    .chat_info {
        padding-left: 40px;
    }

    .nickname_container {
        display: flex;
        align-items: center;
        font-size: 1.4rem;
        font-weight: 500;
        margin-bottom: 8px;
    }

    .nickname_container .line {
        display: inline-flex;
        justify-content: center;
        min-width: 16px;
        height: 16px;
        line-height: 14px;
        margin-left: 6px;
        padding: 0 4px;
        border-radius: 8px;
        color: #fff;
        font-size: 1rem;
        font-weight: 400;
    }

    /* capital */
    .nickname_container .line.seoul_line1 {
        background: ${(props) => props.theme.capitalLines.one};
    }

    .nickname_container .line.seoul_line2 {
        background: ${(props) => props.theme.capitalLines.two};
    }

    .nickname_container .line.seoul_line3 {
        background: ${(props) => props.theme.capitalLines.three};
    }

    .nickname_container .line.seoul_line4 {
        background: ${(props) => props.theme.capitalLines.four};
    }

    .nickname_container .line.seoul_line5 {
        background: ${(props) => props.theme.capitalLines.five};
    }

    .nickname_container .line.seoul_line6 {
        background: ${(props) => props.theme.capitalLines.six};
    }

    .nickname_container .line.seoul_line7 {
        background: ${(props) => props.theme.capitalLines.seven};
    }

    .nickname_container .line.seoul_line8 {
        background: ${(props) => props.theme.capitalLines.eight};
    }

    .nickname_container .line.seoul_line9 {
        background: ${(props) => props.theme.capitalLines.nine};
    }

    .nickname_container .line.seoul_suInBunDangLine {
        background: ${(props) => props.theme.capitalLines.suinBundang};
    }

    .nickname_container .line.seoul_shinBunDangLine {
        background: ${(props) => props.theme.capitalLines.shinbundang};
    }

    .nickname_container .line.seoul_gyeongUiJungAngLine {
        background: ${(props) => props.theme.capitalLines.gyeonguiJungang};
    }

    .nickname_container .line.seoul_gyeongChunLine {
        background: ${(props) => props.theme.capitalLines.gyeongchun};
    }

    .nickname_container .line.seoul_gyeongGangLine {
        background: ${(props) => props.theme.capitalLines.gyeonggang};
    }

    .nickname_container .line.seoul_uiSinSeolLine {
        background: ${(props) => props.theme.capitalLines.wooyiShinseol};
    }

    .nickname_container .line.seoul_silLimLine {
        background: ${(props) => props.theme.capitalLines.sillim};
    }

    .nickname_container .line.seoul_gimPoGoldLine {
        background: ${(props) => props.theme.capitalLines.gimpoGold};
    }

    .nickname_container .line.seoul_everLine {
        background: ${(props) => props.theme.capitalLines.everline};
    }

    .nickname_container .line.seoul_seoHaeLine {
        background: ${(props) => props.theme.capitalLines.seohae};
    }

    .nickname_container .line.seoul_gongHangCheolDo {
        background: ${(props) => props.theme.capitalLines.airport};
    }

    .nickname_container .line.seoul_gtxA {
        background: ${(props) => props.theme.capitalLines.GTXA};
    }

    .nickname_container .line.seoul_uiJeongBu {
        background: ${(props) => props.theme.capitalLines.uijeongbu};
    }

    .nickname_container .line.seoul_inCheonLine1 {
        background: ${(props) => props.theme.capitalLines.incheon1};
    }

    .nickname_container .line.seoul_inCheonLine2 {
        background: ${(props) => props.theme.capitalLines.incheon2};
    }

    /* busan */
    .nickname_container .line.busan_line1 {
        background: ${(props) => props.theme.busanLines.one};
    }

    .nickname_container .line.busan_line2 {
        background: ${(props) => props.theme.busanLines.two};
    }

    .nickname_container .line.busan_line3 {
        background: ${(props) => props.theme.busanLines.three};
    }

    .nickname_container .line.busan_line4 {
        background: ${(props) => props.theme.busanLines.four};
    }

    .nickname_container .line.busan_dongHaeLine {
        background: ${(props) => props.theme.busanLines.donghae};
    }

    .nickname_container .line.busan_buSanGimHae {
        background: ${(props) => props.theme.busanLines.gimhae};
    }

    /* daegu */
    .nickname_container .line.daegu_line1 {
        background: ${(props) => props.theme.daeguLines.one};
    }

    .nickname_container .line.daegu_line2 {
        background: ${(props) => props.theme.daeguLines.two};
    }

    .nickname_container .line.daegu_line3 {
        background: ${(props) => props.theme.daeguLines.three};
    }

    /* daejeon */
    .nickname_container .line.daejeon_line1 {
        background: ${(props) => props.theme.daejeonLines.one};
    }

    /* gwangju */
    .nickname_container .line.gwangju_line1 {
        background: ${(props) => props.theme.gwangjuLines.one};
    }

    .message_wrapper {
        display: flex;
        align-items: flex-end;
    }

    .message_container {
        line-height: 20px;
        padding: 8px 12px;
        border-radius: 20px;
        background: ${(props) => props.theme.colors.gray06};
        font-size: 1.4rem;
    }

    .delete_message_container {
        display: flex;
        align-items: center;
        color: ${(props) => props.theme.colors.gray02};
    }

    .delete_message_container svg {
        width: 16px;
        height: 16px;
        margin-right: 4px;
    }

    .message_container .message {
        white-space: pre-wrap;
    }

    .time_container {
        display: flex;
        min-width: 75px;
        margin-left: 5px;
        margin-bottom: 3px;
        font-size: 1.2rem;
        color: ${(props) => props.theme.colors.gray01};
    }

    .time_container .time {
        display: inline-block;
        margin-right: 3px;
    }

    .time_container .delete_icon {
        border: none;
        background: transparent;
        outline: none;
        cursor: pointer;
    }

    .time_container .delete_icon svg {
        width: 10px;
        height: 10px;
        color: ${(props) => props.theme.colors.gray01};
    }
`;

export const ScrollBottomBtnWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 600px;
`;

export const ScrollBottomBtnContainer = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    margin: 0 12px;
`;

export const ScrollBottomBtn = styled.button`
    position: fixed;
    bottom: 80px;
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 100%;
    background: ${(props) => props.theme.colors.white};
    box-shadow: ${(props) => props.theme.colors.shadow200};
    outline: none;
    cursor: pointer;
    z-index: 99;

    &.full {
        bottom: 40px;
    }

    svg {
        width: 18px;
        height: 18px;
    }
`;

export const ChattingInputContainer = styled.div`
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 600px;
    height: 60px;
    padding: 10px;
    background: ${(props) => props.theme.colors.white};
    box-shadow: ${(props) => props.theme.colors.shadow200};
    z-index: 99;
`;

const StyledInput = styled.textarea`
    width: calc(100% - 45px);
    height: 40px;
    line-height: 18px;
    padding: 10px;
    border: 1px solid ${(props) => props.theme.colors.gray04};
    border-radius: 5px;
    background: ${(props) => props.theme.colors.white};
    font-size: 1.4rem;
    font-family: "Pretendard Variable", Pretendard, -apple-system,
        BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
        "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
        "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    outline: none;
    resize: none;
`;

export const ChattingInput = (props) => {
    return <StyledInput {...props} />;
};

export const MessageSendBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-left: 5px;
    border: none;
    border-radius: 5px;
    background: ${(props) => props.theme.colors.primary};
    outline: none;
    cursor: pointer;

    svg {
        width: 22px;
        height: 22px;
        color: #fff;
    }
`;

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: grid;
    place-items: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
`;

export const Modal = styled.ul`
    display: flex;
    flex-direction: column;
    width: 300px;
    border-radius: 15px;
    background: ${(props) => props.theme.colors.white};

    li:not(:last-child) {
        border-bottom: 1px solid ${(props) => props.theme.colors.gray05};
    }

    button {
        width: 100%;
        height: 50px;
        border: none;
        background: transparent;
        outline: none;
        cursor: pointer;
    }

    button span {
        font-size: 1.4rem;
        font-weight: 500;
    }

    .chatting_delete span {
        color: #f44336;
    }
`;

export const ToastContainer = styled.div`
    position: fixed;
    top: 130px;
    left: 50px;
    right: 50px;
    display: flex;
    justify-content: center;
    transition: opacity 0.2s ease;
    z-index: 999;

    &.opacity {
        opacity: 0;
    }

    p {
        position: absolute;
        top: 0;
        padding: 12px 18px;
        border-radius: 25px;
        background: rgba(34, 34, 34, 0.9);
        color: #fff;
        font-size: 1.4rem;
        font-weight: 500;
        word-break: keep-all;
    }
`;
