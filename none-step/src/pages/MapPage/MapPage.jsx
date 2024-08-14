import { PageHeader } from "@components/header/Headers";
import KakaoMap from "./Map/KakaoMap";
import MenuBar from "@components/menuBar/MenuBar";

const MapPage = () => {
    return (
        <>
            <PageHeader />
            <KakaoMap />
            <MenuBar />
        </>
    );
};

export default MapPage;
