import "./error.css";

export default function Error({handle, noNet}) {
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