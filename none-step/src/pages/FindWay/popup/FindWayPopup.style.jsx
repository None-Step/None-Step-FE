import styled from "styled-components";

export const PopupContainer = styled.div`
    position: absolute;
    top: 74px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    padding: 20px;
    z-index: 3;

    overflow-y: auto;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 1.2rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
`;

export const TabContainer = styled.div`
    display: flex;
    margin-top: 20px;
`;

export const Tab = styled.button`
    font-size: 1.6rem;
    flex: 1;
    padding: 10px;
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

export const RouteOption = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray06};
    flex-grow: 1;
`;

export const RouteInfo = styled.div`
    flex-grow: 1;
`;

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const RouteType = styled.h3`
    font-size: 1.8rem;
    font-weight: 500;
    margin: 0;
`;

export const RouteDetail = styled.p`
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.gray01};
    margin: 5px 0 0 0;
`;

export const Button = styled.button`
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    border: none;
    padding: 10px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
`;

export const BookmarkBtn = styled(Button)`
    background-color: white;
    border: 1px solid ${(props) => props.theme.colors.primary};
`;

export const OverviewItem = styled.div`
    text-align: center;
`;

export const OverviewLabel = styled.p`
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.gray01};
    margin: 0;
`;

export const OverviewValue = styled.p`
    font-size: 1.8rem;
    font-weight: bold;
    margin: 5px 0 0;
`;

export const StationList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    position: relative;
    padding-top: 20px;
    padding-left: 20px;
`;

export const StationItem = styled.li`
    display: flex;
    align-items: flex-start;
    position: relative;
    margin-bottom: 15px;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 4px; /* 점의 중앙에 맞추기 위해 조정 */
        bottom: -15px;
        width: 2px;
        background-color: ${(props) =>
            props.color || props.theme.colors.gray03};
        z-index: 0;
    }

    &:last-child:before {
        display: none; /* 마지막 역에서는 선을 표시하지 않음 */
    }
`;

export const StationDot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => props.color || props.theme.colors.gray03};
    margin-right: 10px;
    z-index: 1; /* 선 위에 점을 표시하기 위해 z-index 조정 */
`;

export const StationInfo = styled.div`
    flex: 1;
`;

export const StationName = styled.p`
    font-size: 1.6rem;
    margin: 0;
`;

export const TransferInfo = styled.p`
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.gray01};
    margin: 5px 0 0;
    display: flex;
    justify-content: left;
    align-items: center;
`;

export const LinePath = styled.div`
    width: 2px;
    height: 30px;
    background-color: ${(props) => props.color || props.theme.colors.gray03};
    margin-left: 4px;
`;

export const SubwayRouteInfo = styled.div`
    margin-top: 20px;
`;

export const TabContent = styled.div`
    display: ${(props) => (props.$active ? "block" : "none")};
`;

export const RouteOverview = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 35px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray06};
`;

export const LaneName = styled.span`
    margin-left: 5px;
    font-size: 1.2rem;
    padding: 0.25rem 0.6rem;
    color: white;
    border-radius: 50px;
`;
