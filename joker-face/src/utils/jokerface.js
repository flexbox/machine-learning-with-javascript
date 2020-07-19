import * as faceapi from "face-api.js"

export async function jokerface() {
  const targetImage = document.querySelector(".target-image")
  const maskImage = document.querySelector(".mask-image")
  const status = document.querySelector(".status")

  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models"),
  ]).catch(error => {
    console.error(error)
  })
  status.innerHTML = "Models loaded…"

  const detection = await faceapi
    .detectSingleFace(targetImage, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks(true)

  if (!detection) {
    status.innerHTML = "No face on the picture, use another one"
    return
  }

  const headWidth = detection.detection.box._width
  const nose = detection.landmarks.getNose()

  maskImage.style.cssText = `
    display: block;
    position: absolute;
    top: ${nose[1]._y}px;
    left: ${nose[1]._x}px;
    width: ${headWidth}px;
  `

  status.innerHTML = "Face detected!"
}
