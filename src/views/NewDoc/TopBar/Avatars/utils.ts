export function getRandomGradient() {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#33FFA1",
    "#A133FF",
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#33FFA1",
    "#A133FF",
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#33FFA1",
    "#A133FF",
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#33FFA1",
    "#A133FF",
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#33FFA1",
    "#A133FF",
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#33FFA1",
    "#A133FF",
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
  ];

  const color1 = colors[Math.floor(Math.random() * colors.length)];
  const color2 = colors[Math.floor(Math.random() * colors.length)];

  return `linear-gradient(135deg, ${color1}, ${color2})`;
}
