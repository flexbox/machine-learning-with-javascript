import * as tf from '@tensorflow/tfjs';
import './styles.css';

document.getElementById('app').innerHTML = `
<code>TensorFlow version: ${tf.version.tfjs}</code>
`;
