import "./error.css";
import noNet from "../../assets/wifi.svg";

export default function Error({handle}) {
    return (
        <div className={"error maxxed"}>
            <div className="content">
                <img src={noNet} alt="no network" />
                <p className="fs-large nanum mb-20">Error!</p>
                <button className="message fs-medium nanum" onClick={handle}>please connect to the internet and try again</button>
            </div>
        </div>
    );
}