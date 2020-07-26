import * as tf from '@tensorflow/tfjs';
import './styles.css';

const img = new Image();
img.crossOrigin = 'anonymous';
img.src =
  'https://images.unsplash.com/flagged/photo-1572349854775-e5768e1afb74?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80';

img.onload = (event) => {
  const imgTensor = tf.browser.fromPixels(event.target);
  imgTensor.print();

  document.getElementById('app').innerHTML = `
    <code>TensorFlow version: ${tf.version.tfjs}</code>
    <h1>${imgTensor.shape[1]}x${imgTensor.shape[0]}</h1>
    <canvas id="printCanvas"></canvas>
  `;

  const printCanvas = document.getElementById('printCanvas');
  tf.browser.toPixels(imgTensor, printCanvas);
};
