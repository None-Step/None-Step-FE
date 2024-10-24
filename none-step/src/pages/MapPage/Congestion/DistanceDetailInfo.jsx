/* eslint-disable react/prop-types */
import {
    InfoBackground,
    InfoCloseBtn,
    InfoContainer,
    InfoWrapper,
} from "./DistanceDetailInfo.styles";
import stairIcon from "../icons/stair-icon-gray.svg";
import { IoClose } from "react-icons/io5";
import { TbEscalator } from "react-icons/tb";
import { PiElevatorFill } from "react-icons/pi";
import { FaWheelchair } from "react-icons/fa";

const DistanceDetailInfo = ({ handleCloseInfo }) => {
    return (
        <InfoBackground>
            <InfoWrapper>
                <InfoCloseBtn onClick={handleCloseInfo}>
                    <IoClose />
                </InfoCloseBtn>
                <InfoContainer>
                    <div className="distance_info">
                        <h2 className="info_title">이격거리 및 편의정보</h2>
                        <ul className="info">
                            <li>
                                <span>열차 칸의 숫자는 승강장 번호입니다.</span>
                            </li>
                            <li>
                                <span>
                                    이격거리는 총 4단계로 안내됩니다. (단위 :
                                    cm)
                                </span>
                                <ul className="distance_info_step">
                                    <li>
                                        <span className="safe">안전</span>
                                        <span> : 0이상~10이하</span>
                                    </li>
                                    <li>
                                        <span className="caution">주의</span>
                                        <span> : 10초과~15이하</span>
                                    </li>
                                    <li>
                                        <span className="danger">위험</span>
                                        <span> : 15초과</span>
                                    </li>
                                    <li>
                                        <span className="nothing">
                                            정보없음
                                        </span>
                                        <span> : 이격거리 정보 없음</span>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <span>
                                    편의정보는 해당 승강장 번호와 가장 가까운
                                    이동시설을 안내합니다.
                                </span>
                            </li>
                            <li>
                                <span>
                                    편의정보는 총 4가지 이동시설을 안내합니다.
                                </span>
                                <ul className="convenience_info_step">
                                    <li>
                                        <img src={stairIcon} alt="stair-icon" />
                                        <span>계단</span>
                                    </li>
                                    <li>
                                        <PiElevatorFill />
                                        <span>엘리베이터</span>
                                    </li>
                                    <li>
                                        <TbEscalator />
                                        <span>에스컬레이터</span>
                                    </li>
                                    <li>
                                        <FaWheelchair />
                                        <span>
                                            이동약자 탑승 안전칸(이격거리 최소
                                            칸)
                                        </span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </InfoContainer>
            </InfoWrapper>
        </InfoBackground>
    );
};

export default DistanceDetailInfo;
