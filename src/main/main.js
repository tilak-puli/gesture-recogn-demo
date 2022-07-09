import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import robot from "../images/robot.gif";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import * as handpose from "@tensorflow-models/handpose";
import { GestureEstimator } from "fingerpose";
import images from "../images"

import { drawHand } from "./util";
import { PaperGesture, RockGesture, ScissorsGesture } from "./Gestures";

function Main() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [computerMove, setComputerMove] = useState(null);

  const runHandpose = async () => {
    setInterval(() => {
      detect();
    }, 10);
  };

  const detect = async (net) => {
    if (isWebCamReady(webcamRef)) {
      const frame = webcamRef.current.video;

      setCanvasResolution(webcamRef, canvasRef);
    }
  };

  useEffect(() => {
    runHandpose();
  }, []);

  return (
    <div className="App-header">
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "100px",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "100px",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />

      <img
        src={images[computerMove] || robot}
        style={{
          position: "absolute",
          marginLeft: "100px",
          left: 750,
          background: "red",
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 400,
          height: 480,
        }}
      />
    </div>
  );
}


function setCanvasResolution(webcamRef, canvasRef) {
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set canvas height and width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
}

function isWebCamReady(webcamRef) {
    return (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
    );
}


export default Main;
