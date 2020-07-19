import React, { useEffect } from "react"
import { jokerface } from "../utils/jokerface"
import "./styles.css"

export default function Home() {
  useEffect(() => {
    jokerface()
  }, [])

  return (
    <div className="layout">
      <header>
        <h1>Joker your face with Machine Learning</h1>
        <p>
          This demo uses{" "}
          <a href="https://github.com/justadudewhohacks/face-api.js">
            face-api.js
          </a>{" "}
          to find faces, then we do some math to determine face size and nose
          detection so we can put a joker face!
        </p>
      </header>
      <main>
        <p>
          <code className="status">Detecting…</code>
        </p>
        <div className="container-image">
          <img
            className="mask-image"
            src="images/mark-hamill-joker-face-mask.png"
            alt=""
          />
          <img
            className="target-image"
            crossOrigin="anonymous"
            src="images/IMG_0640.jpg"
            alt=""
          />
        </div>
      </main>
      <footer></footer>
    </div>
  )
}
