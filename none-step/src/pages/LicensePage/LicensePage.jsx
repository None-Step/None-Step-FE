import {
    IconsMenuContainer,
    LicenseContainer,
    LicenseInfo,
    LicenseWrapper,
} from "./LicensePage.styles";
import { PageHeader } from "@components/header/Headers";
import MenuBar from "@components/menuBar/MenuBar";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { LICENSES } from "@constants/license";

const LicensePage = () => {
    const [menuIndex, setMenuIndex] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleClickMenu = (e, index) => {
        setMenuIndex(index);
        if (e.target.nextElementSibling.classList.contains("open")) {
            e.target.classList.remove("open");
            e.target.nextElementSibling.classList.remove("open");
        } else {
            e.target.classList.add("open");
            e.target.nextElementSibling.classList.add("open");
        }
    };

    return (
        <>
            <PageHeader />
            <LicenseWrapper>
                <LicenseContainer>
                    {LICENSES.map((license, index) => (
                        <li key={index}>
                            <div
                                className={
                                    "license_title " +
                                    (index === menuIndex ? "open" : "")
                                }
                                onClick={(e) => handleClickMenu(e, index)}
                            >
                                <span>{license.name}</span>
                                <IoIosArrowDown />
                            </div>
                            {license.name === "icons" ? (
                                <LicenseInfo
                                    className={
                                        index === menuIndex ? "open" : ""
                                    }
                                >
                                    {license.icons.map((icon, index) => (
                                        <IconsMenuContainer key={index}>
                                            <span>{icon.title}</span>
                                            <div className="license_info">
                                                <Link
                                                    to={icon.link}
                                                    target="_blank"
                                                >
                                                    {icon.link}
                                                </Link>
                                                <p>version : {icon.version}</p>
                                                <details>
                                                    <summary>
                                                        {icon.licenseType}
                                                    </summary>
                                                    <pre>
                                                        {icon.licenseContent}
                                                    </pre>
                                                </details>
                                            </div>
                                        </IconsMenuContainer>
                                    ))}
                                </LicenseInfo>
                            ) : (
                                <LicenseInfo
                                    className={
                                        index === menuIndex ? "open" : ""
                                    }
                                >
                                    <Link to={license.link} target="_blank">
                                        {license.link}
                                    </Link>
                                    <p>version : {license.version}</p>
                                    <details>
                                        <summary>{license.licenseType}</summary>
                                        <pre>{license.licenseContent}</pre>
                                    </details>
                                </LicenseInfo>
                            )}
                        </li>
                    ))}
                </LicenseContainer>
            </LicenseWrapper>
            <MenuBar />
        </>
    );
};

export default LicensePage;
