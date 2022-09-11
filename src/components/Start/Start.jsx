import "./start.css";

export default function Start({ state, handle_screen }) {
  return (
    <div className={`start maxxed ${state.shown ? "shown" : "hidden"}`}>
      <div className="screen-content">
        {state.firstLoad && (
          <div className="content">
            <h1 className="logo fs-large mb-20">メモリー</h1>
            <p className="instructions nanum fs-medium mb-20">
              Click on each image only once to clear the level
            </p>
            <button
              className="public nanum fs-above-medium"
              onClick={handle_screen}
            >
              Start Game
            </button>
          </div>
        )}
        {!state.firstLoad && (
          <div className="content">
            <p className="fs-big nanum mb-50">Game Over</p>
            <button
              className="public nanum fs-above-medium"
              onClick={handle_screen}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
