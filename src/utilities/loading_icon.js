import { map } from "./map";

export default function show_loading(killer, canvas) {
  const color = Date.now() / 33;
  const dt = Date.now() / 100;
  const circles = 20;
  const distance = 45;
  const angleInc = (Math.PI * 2) / circles;
  const minRad = 1;
  const maxRad = 6;
  const context = canvas.getContext("2d");
  let angle;

  angle = 0;

  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < circles; i++, angle += angleInc) {
    const radius =
      minRad +
      Math.abs(
        maxRad *
          Math.sin(
            map(dt % circles, 0, circles, 0, Math.PI * 2) +
              (i * Math.PI * 3) / circles
          )
      );
    context.beginPath();
    context.fillStyle = `hsl(${(i * 10 + color) % 360}, 100%, 65%)`;
    context.arc(
      distance * Math.cos(angle) + canvas.width / 2,
      distance * Math.sin(angle) + canvas.height / 2,
      radius,
      0,
      Math.PI * 2
    );
    context.fill();
  }

  killer.id = requestAnimationFrame(() => show_loading(killer, canvas));
}
