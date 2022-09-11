import { useState } from "react";

import "./board.css";

export default function Board({ images, click_image }) {
  const [displayImage, setDisplayImage] = useState("");
  const [displayShown, setDisplayShown] = useState(false);

  function display_image(src) {
    setDisplayImage(src);
    setDisplayShown(true);
  }

  function close_display() {
    setDisplayShown(false);
  }

  return (
    <div className="board">
      <div className={`display maxxed ${displayShown ? "shown" : "hidden"}`}>
        <img src={displayImage} alt="" />
        <button className="close" onClick={close_display}></button>
      </div>
      {images.map((image) => (
        <div className="image" key={image.id}>
          <span
            className="background"
            style={{ backgroundImage: `url(${image.url}` }}
          ></span>
          <img
            src={image.url}
            alt="image"
            onClick={() => click_image(image.id)}
          />
          <button
            className="expand"
            onClick={() => display_image(image.url)}
          ></button>
        </div>
      ))}
    </div>
  );
}
