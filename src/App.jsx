import { useEffect, useState } from "react";

import Start from "./components/Start/Start";
import Error from "./components/Error/Error";
import Loading from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";
import Board from "./components/Board/Board";
import { nanoid } from "nanoid";

import "./style.css";
import noNet from "./assets/wifi.svg";

import shuffle from "./utilities/shuffle";
import make_request from "./utilities/request";

function App() {
  const [isLoading, setisLoading] = useState(false);
  const [score, setScore] = useState(() => {
    const best = localStorage.getItem("_best_score_");
    const score = { score: 0, best: 0 };

    if (best) score.best = Number(best);

    return score;
  });
  const [levelData, setLevelData] = useState({
    images: [],
    seen: [],
    currentLevel: 1,
  });
  const [startScreenState, setStartScreenState] = useState({
    firstLoad: true,
    mounted: true,
    shown: true,
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    const tempImg = document.createElement("img");

    tempImg.src = noNet;
  }, []);

  function load_images(level) {
    const requests = [];
    const total = level * 2;

    setisLoading(true);

    for (let i = 0; i < total; i++)
      requests.push(make_request("https://api.waifu.pics/sfw/waifu"));

    Promise.all(requests)
      .then(async (images) => {
        images = Array(...new Set(images.map((img) => img.url)));

        while (images.length < total) {
          let image;

          image = await make_request("https://api.waifu.pics/sfw/waifu");
          image = image.url;

          if (!images.includes(image)) images.push(image);
        }

        setLevelData({
          images: images.map((src) => ({ url: src, id: nanoid() })),
          seen: [],
          currentLevel: level,
        });
        setisLoading(false);
      })
      .catch((error) => {
        setError(true);
        setisLoading(false);

        console.log(error);
      });
  }

  function end_game() {
    setStartScreenState({ firstLoad: false, mounted: true, shown: false });
    setTimeout(
      () =>
        setStartScreenState({ firstLoad: false, mounted: true, shown: true }),
      0
    );
    setScore((prevScore) => ({ score: 0, best: prevScore.best }));
  }

  function click_image(id) {
    if (levelData.seen.includes(id)) end_game();
    else {
      if (levelData.images.length === levelData.seen.length + 1)
        load_images(levelData.currentLevel + 1);
      else {
        setLevelData((prevData) => ({
          images: shuffle(prevData.images),
          seen: [...prevData.seen, id],
          currentLevel: prevData.currentLevel,
        }));
      }
      setScore((prevScore) => {
        const score = {
          score: prevScore.score + 1,
          best: prevScore.best,
        };

        if (prevScore.best < score.score) {
          score.best = score.score;
          localStorage.setItem("_best_score_", score.score);
        }
        return score;
      });
    }
  }

  function handle_start_screen() {
    setStartScreenState({ firstLoad: false, mounted: true, shown: false });
    setTimeout(
      () =>
        setStartScreenState({ firstLoad: false, mounted: false, shown: false }),
      330
    );
    load_images(1);
  }

  function handle_error() {
    setError(false);
    load_images(levelData.currentLevel);
  }

  return (
    <div className="App">
      {startScreenState.mounted && (
        <Start state={startScreenState} handle_screen={handle_start_screen} />
      )}
      {isLoading && <Loading />}
      {error && <Error handle={handle_error} noNet={noNet} />}
      <Navbar level={levelData.currentLevel} score={score} />
      <Board images={levelData.images} click_image={click_image} />
    </div>
  );
}

export default App;
