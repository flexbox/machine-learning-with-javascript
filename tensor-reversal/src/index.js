import * as tf from '@tensorflow/tfjs';
import './styles.css';

const img = new Image();
img.crossOrigin = 'anonymous';
img.src =
  'https://images.unsplash.com/photo-1557800636-894a64c1696f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1601&q=80';

img.onload = (event) => {
  const imgTensor = tf.browser.fromPixels(event.target);

  document.getElementById('app').innerHTML = `
    <code>TensorFlow version: ${tf.version.tfjs}</code>
    <h1>Triple your tensors training data</h1>
    <div class="layout">
      <div>
        <code>Original Tensor</code>
        <canvas id="baseCanvas"></canvas>
      </div>
      <div>
        <code>tf.reverse(1)</code>
        <canvas id="revertXCanvas"></canvas>
      </div>
      <div>
        <code>tf.reverse(0)</code>
        <canvas id="revertYCanvas"></canvas>
      </div>
    </div>
  `;

  const baseCanvas = document.getElementById('baseCanvas');
  tf.browser.toPixels(imgTensor, baseCanvas);

  const revertXCanvas = document.getElementById('revertXCanvas');
  const revertXTensor = imgTensor.reverse(1);
  tf.browser.toPixels(revertXTensor, revertXCanvas);

  const revertYCanvas = document.getElementById('revertYCanvas');
  const revertYTensor = imgTensor.reverse(0);
  tf.browser.toPixels(revertYTensor, revertYCanvas);
};
