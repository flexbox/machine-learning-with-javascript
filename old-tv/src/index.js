import * as tf from '@tensorflow/tfjs';
import './styles.css';

document.getElementById(
  'tfversion'
).innerHTML = `TensorFlow version: ${tf.version.tfjs}`;

const blankScreenCanvas = document.getElementById('bsod');
const blankScreen = tf.fill([400, 500, 1], 0.2);
tf.browser.toPixels(blankScreen, blankScreenCanvas);

// CHALLENGE
// make a function getImage that takes the number of channels as an argument
// and returns a tensor image with that many channels of random pixel values
// that is 250 pixels tall and 350 pixels wide
// EXAMPLES:
// getImage(1) should return a black and white static image
// getImage(3) should return a random color static image

let backImage = blankScreen;
const img = new Image();
img.crossOrigin = 'anonymous';
img.src =
  'https://images.unsplash.com/photo-1472591339360-3d2c23f5a619?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2165&q=80';
console.log('img', img.src);
img.onload = (result) => {
  backImage = tf.image.resizeBilinear(
    tf.browser.fromPixels(img),
    [400, 500],
    true
  );
  // prevent memory leaks!
  tensorArr.forEach((t) => t.dispose());
  loadImages(3);
};

function getImage(channels) {
  return tf.randomUniform([400, 500, channels], 0, 1);
}
function getTwoImage(channels) {
  return tf
    .randomUniform([400, 500, channels], 0, 255, 'int32')
    .add(backImage)
    .div(512);
}

let imgIndex = 0;
let canvasArr;
let tensorArr;
let tvPower = true;
const screen = document.getElementById('screen');
const rgbButton = document.getElementById('rgb');
const bwButton = document.getElementById('bw');
const powerButton = document.getElementById('power');

// This function creates 20 canvas elements based on your tensor function and
// loads them to the page with display = 'none'
function loadImages(channels) {
  screen.innerHTML = '';
  canvasArr = [];
  tensorArr = [];
  for (let i = 0; i < 20; i++) {
    const canvas = document.createElement('canvas');
    screen.appendChild(canvas);
    canvasArr.push(canvas);
    canvas.style.display = 'none';
    // Your getImage function at work!
    // const staticImg = getImage(channels);
    const staticImg = getTwoImage(channels);
    tensorArr.push(staticImg);
    tf.browser.toPixels(staticImg, canvas);
  }
}

// this function animates the static by looping over the array of canvas elements
// and toggling their display to be visible one at a time if the TV is "on"
function animatetvStatic() {
  requestAnimationFrame(() => {
    canvasArr[imgIndex].style.display = 'none';
    imgIndex++;
    if (imgIndex >= canvasArr.length) imgIndex = 0;
    if (tvPower) {
      canvasArr[imgIndex].style.display = 'block';
    }
    animatetvStatic();
  });
}

// this changes the array of canvas elements to be all black and white static
bwButton.onclick = function () {
  // prevent memory leaks!
  tensorArr.forEach((t) => t.dispose());
  // load images with 1 channel, aka black and white
  loadImages(1);
};

// this changes the array of canvas elements to be all color static
rgbButton.onclick = function () {
  // prevent memory leaks!
  tensorArr.forEach((t) => t.dispose());
  // load images with 3 channel, aka full color static!
  loadImages(3);
};

// toggles a boolean that our animation function uses to decide
// whether or not to display canvas elements
powerButton.onclick = function () {
  tvPower = !tvPower;
  powerButton.textContent = tvPower ? 'Off' : 'On';
};

// kicks things off with color static!
loadImages(3);
animatetvStatic();
