const images=["0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];

const chosenImage = images[Math.floor(Math.random() * images.length)];
//console.log(chosenImage);

const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;
//console.log(bgImage);

document.body.appendChild(bgImage);