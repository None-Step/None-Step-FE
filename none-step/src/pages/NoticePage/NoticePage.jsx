import { PageHeader } from "@components/header/Headers";
import MenuBar from "@components/menuBar/MenuBar";
import { Outlet } from "react-router-dom";

const NoticePage = () => {
    return (
        <>
            <PageHeader />
            <Outlet />
            <MenuBar />
        </>
    );
};

export default NoticePage;
