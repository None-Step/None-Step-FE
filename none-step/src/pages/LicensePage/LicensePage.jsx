import {
    DataListContainer,
    IconsMenuContainer,
    LicenseContainer,
    LicenseInfo,
    LicenseWrapper,
    PartContainer,
    PartInfo,
} from "./LicensePage.styles";
import { PageHeader } from "@components/header/Headers";
import MenuBar from "@components/menuBar/MenuBar";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { PARTS, FELICENSES, BELICENSES, DATALISTS } from "@constants/license";

const LicensePage = () => {
    const [partIndex, setPartIndex] = useState(null);
    const [FEMenuIndex, setFEMenuIndex] = useState(null);
    const [BEMenuIndex, setBEMenuIndex] = useState(null);
    const [DataMenuIndex, setDataMenuIndex] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleClickPart = (e, index) => {
        setPartIndex(index);
        if (e.target.nextElementSibling.classList.contains("part_open")) {
            e.target.classList.remove("part_open");
            e.target.nextElementSibling.classList.remove("part_open");
        } else {
            e.target.classList.add("part_open");
            e.target.nextElementSibling.classList.add("part_open");
            setFEMenuIndex(null);
            setBEMenuIndex(null);
            setDataMenuIndex(null);
        }
    };

    const handleClickFEMenu = (e, index) => {
        setFEMenuIndex(index);
        if (e.target.nextElementSibling.classList.contains("open")) {
            e.target.classList.remove("open");
            e.target.nextElementSibling.classList.remove("open");
        } else {
            e.target.classList.add("open");
            e.target.nextElementSibling.classList.add("open");
        }
    };

    const handleClickBEMenu = (e, index) => {
        setBEMenuIndex(index);
        if (e.target.nextElementSibling.classList.contains("open")) {
            e.target.classList.remove("open");
            e.target.nextElementSibling.classList.remove("open");
        } else {
            e.target.classList.add("open");
            e.target.nextElementSibling.classList.add("open");
        }
    };

    const handleClickDataMenu = (e, index) => {
        setDataMenuIndex(index);
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
                <PartContainer>
                    {PARTS.map((part, index) => (
                        <li key={index}>
                            <div
                                className={
                                    "part_title " +
                                    (index === partIndex ? "part_open" : "")
                                }
                                onClick={(e) => handleClickPart(e, index)}
                            >
                                <span>{part.part}</span>
                                <IoIosArrowDown />
                            </div>
                            <PartInfo
                                className={
                                    index === partIndex ? "part_open" : ""
                                }
                            >
                                {part.licenseType && (
                                    <div className="part_license_info">
                                        <p>
                                            이 프로젝트는 Apache 2.0 라이선스
                                            하에 배포됩니다. 라이선스에 대한
                                            자세한 내용은 아래의 전문을
                                            참조하세요.
                                        </p>
                                        <p>
                                            This project is Open Source software
                                            released under the Apache 2.0
                                            license.
                                        </p>
                                        <h3>{part.licenseType}</h3>
                                        <p>
                                            Copyright &#40;c&#41; 2024 NONESTEP
                                        </p>
                                        <details>
                                            <summary>
                                                {part.licenseType}
                                            </summary>
                                            <pre>
                                                <pre className="license_header">
                                                    {part.licenseHeader}
                                                </pre>
                                                <pre>{part.licenseContent}</pre>
                                            </pre>
                                        </details>
                                    </div>
                                )}
                                {part.part === "DATA" && (
                                    <div className="part_license_info">
                                        <p>
                                            이 프로젝트는 아래 공공데이터 및
                                            오픈 API를 사용하였습니다. 링크를
                                            클릭하면 해당 공공데이터 및 오픈 API
                                            사이트로 이동할 수 있습니다.
                                        </p>
                                    </div>
                                )}
                                {part.part === "FE" && (
                                    <LicenseContainer>
                                        {FELICENSES.map((license, index) => (
                                            <li key={index}>
                                                <div
                                                    className={
                                                        "license_title " +
                                                        (index === FEMenuIndex
                                                            ? "open"
                                                            : "")
                                                    }
                                                    onClick={(e) =>
                                                        handleClickFEMenu(
                                                            e,
                                                            index
                                                        )
                                                    }
                                                >
                                                    <span>{license.name}</span>
                                                    <IoIosArrowDown />
                                                </div>
                                                {license.name === "icons" ? (
                                                    <LicenseInfo
                                                        className={
                                                            index ===
                                                            FEMenuIndex
                                                                ? "open"
                                                                : ""
                                                        }
                                                    >
                                                        {license.icons.map(
                                                            (icon, index) => (
                                                                <IconsMenuContainer
                                                                    key={index}
                                                                >
                                                                    <span>
                                                                        {
                                                                            icon.title
                                                                        }
                                                                    </span>
                                                                    <div className="license_info">
                                                                        <Link
                                                                            to={
                                                                                icon.link
                                                                            }
                                                                            target="_blank"
                                                                        >
                                                                            {
                                                                                icon.link
                                                                            }
                                                                        </Link>
                                                                        {icon.version && (
                                                                            <p>
                                                                                version
                                                                                :{" "}
                                                                                {
                                                                                    icon.version
                                                                                }
                                                                            </p>
                                                                        )}
                                                                        {icon.copyright && (
                                                                            <p className="copyright">
                                                                                {
                                                                                    icon.copyright
                                                                                }
                                                                            </p>
                                                                        )}
                                                                        <details>
                                                                            <summary>
                                                                                {
                                                                                    icon.licenseType
                                                                                }
                                                                            </summary>
                                                                            <pre>
                                                                                {
                                                                                    icon.licenseContent
                                                                                }
                                                                            </pre>
                                                                        </details>
                                                                    </div>
                                                                </IconsMenuContainer>
                                                            )
                                                        )}
                                                    </LicenseInfo>
                                                ) : (
                                                    <LicenseInfo
                                                        className={
                                                            index ===
                                                            FEMenuIndex
                                                                ? "open"
                                                                : ""
                                                        }
                                                    >
                                                        <Link
                                                            to={license.link}
                                                            target="_blank"
                                                        >
                                                            {license.link}
                                                        </Link>
                                                        {license.version && (
                                                            <p>
                                                                version :{" "}
                                                                {
                                                                    license.version
                                                                }
                                                            </p>
                                                        )}
                                                        {license.copyright && (
                                                            <p className="copyright">
                                                                {
                                                                    license.copyright
                                                                }
                                                            </p>
                                                        )}
                                                        <details>
                                                            <summary>
                                                                {
                                                                    license.licenseType
                                                                }
                                                            </summary>
                                                            <pre>
                                                                {
                                                                    license.licenseContent
                                                                }
                                                            </pre>
                                                        </details>
                                                    </LicenseInfo>
                                                )}
                                            </li>
                                        ))}
                                    </LicenseContainer>
                                )}
                                {part.part === "BE" && (
                                    <LicenseContainer>
                                        {BELICENSES.map((license, index) => (
                                            <li key={index}>
                                                <div
                                                    className={
                                                        "license_title " +
                                                        (index === BEMenuIndex
                                                            ? "open"
                                                            : "")
                                                    }
                                                    onClick={(e) =>
                                                        handleClickBEMenu(
                                                            e,
                                                            index
                                                        )
                                                    }
                                                >
                                                    <span>{license.name}</span>
                                                    <IoIosArrowDown />
                                                </div>
                                                <LicenseInfo
                                                    className={
                                                        index === BEMenuIndex
                                                            ? "open"
                                                            : ""
                                                    }
                                                >
                                                    <Link
                                                        to={license.link}
                                                        target="_blank"
                                                    >
                                                        {license.link}
                                                    </Link>
                                                    {license.version && (
                                                        <p>
                                                            version :{" "}
                                                            {license.version}
                                                        </p>
                                                    )}
                                                    {license.copyright && (
                                                        <p className="copyright">
                                                            {license.copyright}
                                                        </p>
                                                    )}
                                                    <details>
                                                        <summary>
                                                            {
                                                                license.licenseType
                                                            }
                                                        </summary>
                                                        <pre>
                                                            {
                                                                license.licenseContent
                                                            }
                                                        </pre>
                                                    </details>
                                                </LicenseInfo>
                                            </li>
                                        ))}
                                    </LicenseContainer>
                                )}
                                {part.part === "DATA" && (
                                    <LicenseContainer>
                                        {DATALISTS.map((list, index) => (
                                            <li key={index}>
                                                <div
                                                    className={
                                                        "license_title " +
                                                        (index === DataMenuIndex
                                                            ? "open"
                                                            : "")
                                                    }
                                                    onClick={(e) =>
                                                        handleClickDataMenu(
                                                            e,
                                                            index
                                                        )
                                                    }
                                                >
                                                    <span>{list.name}</span>
                                                    <IoIosArrowDown />
                                                </div>
                                                <DataListContainer
                                                    className={
                                                        index === DataMenuIndex
                                                            ? "open"
                                                            : ""
                                                    }
                                                >
                                                    {list.lists.map(
                                                        (datalist, index) => (
                                                            <li key={index}>
                                                                <Link
                                                                    to={
                                                                        datalist.link
                                                                    }
                                                                    target="_blank"
                                                                >
                                                                    {
                                                                        datalist.name
                                                                    }
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </DataListContainer>
                                            </li>
                                        ))}
                                    </LicenseContainer>
                                )}
                            </PartInfo>
                        </li>
                    ))}
                </PartContainer>
            </LicenseWrapper>
            <MenuBar />
        </>
    );
};

export default LicensePage;
