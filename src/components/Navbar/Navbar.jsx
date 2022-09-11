import "./navbar.css";

export default function Navbar({ score, level }) {
  return (
    <nav className="navbar">
      <p className="logo fs-above-medium">メモリー</p>
      <div className="info">
        <p className="nanum fs-medium level">Level : {level}</p>
        <p className="nanum fs-medium score">Score : {score.score}</p>
        <p className="nanum fs-medium best-score">Best : {score.best}</p>
      </div>
    </nav>
  );
}
