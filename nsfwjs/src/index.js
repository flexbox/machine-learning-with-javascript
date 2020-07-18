import * as tf from '@tensorflow/tfjs';
import * as nsfwjs from 'nsfwjs';
import './styles.css';

document.getElementById('app').innerHTML = `
<code>TensorFlow version: ${tf.version.tfjs}</code>
`;

const targetImage = document.getElementById('image');
const targetText = document.getElementById('message');

// Load model from my S3.
// See the section hosting the model files on your site.
nsfwjs.load().then(function (model) {
  model.classify(targetImage).then(function (predictions) {
    // Classify the image
    targetText.innerHTML = `
      <ul>
        <li>${predictions[0].className}: ${predictions[0].probability}</li>
        <li>${predictions[1].className}: ${predictions[1].probability}</li>
        <li>${predictions[2].className}: ${predictions[2].probability}</li>
        <li>${predictions[3].className}: ${predictions[3].probability}</li>
        <li>${predictions[4].className}: ${predictions[4].probability}</li>
      </ul>
  `;
  });
});
