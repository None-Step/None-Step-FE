/* eslint-disable react/prop-types */
import { CongestionTimeWrapper } from "./CongestionTime.styles";

const CongestionTime = ({ currentTime, after30, after60 }) => {
    const nowTime = () => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, "0");
        let minutes = date.getMinutes();

        if (minutes >= 30) {
            minutes = "30";
        } else {
            minutes = "00";
        }

        if (hours == 0) {
            const amHours = date.getHours() + 12;
            return `오전 ${amHours}:${minutes}`;
        } else if (0 < hours && hours < 12) {
            return `오전 ${hours}:${minutes}`;
        } else if (hours == 12) {
            return `오후 ${hours}:${minutes}`;
        } else if (12 < hours && hours < 24) {
            const pmHours = date.getHours() - 12;
            return `오후 ${pmHours}:${minutes}`;
        }
    };

    const afterThirtyMinutes = () => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        if (minutes >= 30) {
            minutes = "00";
            hours += 1;
        } else {
            minutes = "30";
        }

        if (hours >= 24) {
            hours = 0;
        }

        if (hours == 0) {
            return `오전 12:${minutes}`;
        } else if (0 < hours && hours < 12) {
            return `오전 ${String(hours).padStart(2, "0")}:${minutes}`;
        } else if (hours == 12) {
            return `오후 12:${minutes}`;
        } else if (12 < hours && hours < 24) {
            return `오후 ${String(hours - 12).padStart(2, "0")}:${minutes}`;
        }
    };

    const afterOneHour = () => {
        const date = new Date();
        date.setHours(date.getHours() + 1);
        const hours = String(date.getHours()).padStart(2, "0");
        let minutes = date.getMinutes();

        if (minutes >= 30) {
            minutes = "30";
        } else {
            minutes = "00";
        }

        if (hours == 0) {
            const amHours = date.getHours() + 12;
            return `오전 ${amHours}:${minutes}`;
        } else if (0 < hours && hours < 12) {
            return `오전 ${hours}:${minutes}`;
        } else if (hours == 12) {
            return `오후 ${hours}:${minutes}`;
        } else if (12 < hours && hours < 24) {
            const pmHours = date.getHours() - 12;
            return `오후 ${pmHours}:${minutes}`;
        }
    };

    const congestion = (congest) => {
        switch (congest) {
            case "여유":
                return "uncrowded";

            case "보통":
                return "normal";

            case "주의":
                return "caution";

            case "혼잡":
                return "congested";
            default:
                return "nothing";
        }
    };

    return (
        <CongestionTimeWrapper>
            <table className="congestion_schedule">
                <thead>
                    <tr>
                        <th className="current">
                            <span>{nowTime()}(현재)</span>
                        </th>
                        <th>
                            <span>{afterThirtyMinutes()}</span>
                        </th>
                        <th>
                            <span>{afterOneHour()}</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span className={congestion(currentTime)}>
                                {currentTime ? currentTime : "정보없음"}
                            </span>
                        </td>
                        <td>
                            <span className={congestion(after30)}>
                                {after30 ? after30 : "정보없음"}
                            </span>
                        </td>
                        <td>
                            <span className={congestion(after60)}>
                                {after60 ? after60 : "정보없음"}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </CongestionTimeWrapper>
    );
};

export default CongestionTime;
