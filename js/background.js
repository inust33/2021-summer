const bgColor=["YellowGreen", "LightBlue", "LightPink", "Plum"];
const chosenColor = bgColor[Math.floor(Math.random() * bgColor.length)];

const body = document.querySelector("body");

console.log(chosenColor);
body.bgColor = chosenColor;