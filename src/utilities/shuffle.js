export default function shuffle(array) {
  const shuffled = [];
  const seen = [];

  do {
    const index = ~~(Math.random() * array.length);

    if (!seen.includes(index)) {
      shuffled.push(array[index]);
      seen.push(index);
    }
  } while (shuffled.length < array.length);
  return shuffled;
}
