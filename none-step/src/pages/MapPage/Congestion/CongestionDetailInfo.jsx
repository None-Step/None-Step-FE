/* eslint-disable react/prop-types */
import {
    InfoBackground,
    InfoCloseBtn,
    InfoContainer,
    InfoWrapper,
} from "./CongestionDetailInfo.styles";
import stairIcon from "../icons/stair-icon-gray.svg";
import { IoClose } from "react-icons/io5";
import { TbEscalator } from "react-icons/tb";
import { PiElevatorFill } from "react-icons/pi";
import { FaWheelchair } from "react-icons/fa";

const CongestionDetailInfo = ({ handleCloseInfo }) => {
    return (
        <InfoBackground>
            <InfoWrapper>
                <InfoCloseBtn onClick={handleCloseInfo}>
                    <IoClose />
                </InfoCloseBtn>
                <InfoContainer>
                    <div className="congestion_info">
                        <h2 className="info_title">지하철혼잡도 안내</h2>
                        <ul className="info">
                            <li>
                                <span>
                                    혼잡도는 요일/시간대별 예측정보로 상황에
                                    따라 차이가 있을 수 있습니다.
                                </span>
                            </li>
                            <li>
                                <span>
                                    혼잡도는 열차 전체의 평균 혼잡도로 열차 칸
                                    혼잡도는 상황에 따라 차이가 있을 수
                                    있습니다.
                                </span>
                            </li>
                            <li>
                                <span>혼잡도는 총 5단계로 안내됩니다.</span>
                                <ul className="congestion_info_step">
                                    <li>
                                        <span className="uncrowded">여유</span>
                                        <span> : 좌석에 앉을 수 있는 정도</span>
                                    </li>
                                    <li>
                                        <span className="normal">보통</span>
                                        <span>
                                            {" "}
                                            : 지하철 손잡이를 잡고 서서 갈 수
                                            있는 정도
                                        </span>
                                    </li>
                                    <li>
                                        <span className="caution">주의</span>
                                        <span>
                                            {" "}
                                            : 통로에 승객들이 여러 줄로 서 있는
                                            정도
                                        </span>
                                    </li>
                                    <li>
                                        <span className="congested">혼잡</span>
                                        <span>
                                            {" "}
                                            : 열차 내 이동이 불가한 정도
                                        </span>
                                    </li>
                                    <li>
                                        <span className="nothing">
                                            정보없음
                                        </span>
                                        <span> : 혼잡도 정보 없음</span>
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

export default CongestionDetailInfo;
